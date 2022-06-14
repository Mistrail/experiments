import connection from '../connection.js';
import {Model, DataTypes, Op} from 'sequelize'
import crypto from 'crypto';

class Users extends Model {

    static async authenticate({login, password}){
        const user = await Users.findOne({where: {login}});
        if(!user) return false;
        const {salt, passHash} = user;
        const challenge = crypto.createHash('sha512', password).update(salt).digest('hex');
        return challenge === passHash;
    }

}

Users.init({
        guid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4()
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        passHash: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: DataTypes.VIRTUAL,
            validate: {
                is: /.{8,}/
            },
            get: function () {
                return "********"
            },
            set: function (password) {
                const salt = crypto.randomBytes(64).toString('hex');
                const passHash = crypto.createHash('sha512', password).update(salt).digest('hex');
                this.setDataValue('passHash', passHash);
                this.setDataValue('salt', salt);
            }
        }
    },
    {
        sequelize: connection,
        timestamps: true,
        paranoid: true,
        defaultScope: {
            where: {id: {[Op.ne]: null}, deletedAt: {[Op.is]: null}}
        }
    })

export default Users;
