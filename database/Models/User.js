import sequelize from "sequelize";
import connection from "../connection.js"
import crypto from "crypto";
import Contacts from "./Contacts.js";
const {Sequelize, Model, DataTypes} = sequelize;

class User extends Model{
    static async authorize(login, password){
        const user = await User.findOne({where: {login, isActive: true}});
        const hash = crypto.createHash("sha256");
        const challenge = hash.update(`${password}/${user.salt}`).digest('hex')
        return challenge === user.passhash ? user.get() : null;
    }
}

User.init({
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    publicID: {
        type: DataTypes.INTEGER,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
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
        set(value){
            const hash = crypto.createHash("sha256");
            const salt = crypto.randomBytes(32).toString('hex');
            const digest = hash.update(`${value}/${salt}`).digest('hex')
            this.setDataValue('passhash', digest);
            this.setDataValue('salt', salt);
        }
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

User.afterCreate(async (instance) => {
    await Contacts.create({userID: instance.userID()});
})

export default User;
