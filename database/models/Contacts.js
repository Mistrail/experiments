import connection from '../connection.js'
import {Model, DataTypes, Op} from 'sequelize'

class Contacts extends Model {}

Contacts.init({
        guid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4()
        },
        users_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize: connection,
        timestamps: true,
        paranoid: true,
        defaultScope: {
            where: {deletedAt: {[Op.is]: null}}
        }
    })

export default Contacts;
