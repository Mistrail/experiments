import sequelize from "sequelize";
import connection from "../connection.js"

const {Model, DataTypes} = sequelize;

class Contacts extends Model {}

Contacts.init({
    userID: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true
    },
    sort: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get: () => {
            return [this.firstName, this.lastName].join(" ");
        }
    }
}, {
    sequelize: connection,
    paranoid: true,
    timestamps: true,
})

export default Contacts;
