import connection from '../connection.js'
import {Model, DataTypes} from 'sequelize'

class Permissions extends Model {}

Permissions.init({
        users_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        entity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize: connection,
        timestamps: false
    })

export default Permissions;
