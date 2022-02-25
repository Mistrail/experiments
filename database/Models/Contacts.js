import sequelize from "sequelize";
import connection from "../connection.js"

const {Model, DataTypes} = sequelize;

class Contacts extends Model {}

Contacts.init({
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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
