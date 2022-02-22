import sequelize from "sequelize";
import connection from "../connection.js"
import User from "./User.js";

const {Sequelize, Model, DataTypes} = sequelize;

class Contacts extends Model {
}


Contacts.init({
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, {
    sequelize: connection,
    paranoid: true,
    timestamps: true,
})

Contacts.belongsTo(User);;

export default Contacts;
