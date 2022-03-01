import sequelize from "sequelize";
import connection from "../connection.js"
import crypto from "crypto";
import Contacts from "./Contacts.js";
import Settings from "./Settings.js";

const {Sequelize, Model, DataTypes} = sequelize;


class User extends Model{

    isAuth({password}) {
        return User.generatePasshash({password, salt: this.salt}) === this.passhash;
    }

    static generatePasshash({password, salt}) {
        const hash = crypto.createHash("sha256");
        return  hash.update(`${password}/${salt}`).digest('hex')
    }
}

User.init({
    userID: {
        type: DataTypes.STRING(64),
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    passhash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.VIRTUAL,
        validate: {
            is: /[\S]{8,}/i
        },
        get(){
            return "********"
        },
        set(password){
            const salt = crypto.randomBytes(32).toString('hex');
            const digest = User.generatePasshash({password, salt})
            this.setDataValue('passhash', digest);
            this.setDataValue('salt', salt);
        }
    },
    sort: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection,
    paranoid: true,
    timestamps: true,
})

User.hasOne(Contacts, {foreignKey: 'userID', sourceKey: 'userID'});
User.hasMany(Settings, {foreignKey: 'userID', sourceKey: 'userID'});

User.afterCreate(async (instance, options) => {
    await Contacts.create({userID: instance.userID });
})

User.afterDestroy(async (instance) => {
    await Contacts.destroy({where: {userID: instance.userID}});
})

User.beforeDestroy(async (instance) => {
    await instance.update({isActive: false});
})

export default User;
