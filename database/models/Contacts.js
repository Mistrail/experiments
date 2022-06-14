import connection from '../connection.js'
import {Model, DataTypes, Op} from 'sequelize'

class Contacts extends Model {}

Contacts.init({
        // fields here...        
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
