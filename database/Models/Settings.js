import sequelize from "sequelize";
import connection from "../connection.js"

const {Model, DataTypes} = sequelize;

class Settings extends Model {}

Settings.init({
    userID: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    value: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize: connection,
    timestamps: false,
})

export default Settings;
