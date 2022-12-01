"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeConnection = void 0;
const sequelize_1 = require("sequelize");
// import AuthProvider from "./models/authModel";
// import module
const dbConfig = require("../config");
let sequelizeConnection;
exports.sequelizeConnection = sequelizeConnection;
exports.sequelizeConnection = sequelizeConnection = new sequelize_1.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});
