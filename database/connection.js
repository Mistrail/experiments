import sequelize from "sequelize";
const {Sequelize} = sequelize;

export default new Sequelize({
    dialect: "mysql",
    host: process.env.DB_PRIMARY_HOST,
    port: process.env.DB_PRIMARY_PORT,
    username: process.env.DB_PRIMARY_USER,
    password: process.env.DB_PRIMARY_PASSWORD,
    database: process.env.DB_PRIMARY_SCHEMA,
    logging: false,
    pool: {
        max: 4,
        idle: 30000
    }
})
