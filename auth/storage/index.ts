import { Sequelize } from "sequelize";
// import AuthProvider from "./models/authModel";

// import module
const dbConfig = require("../config");
let sequelizeConnection: Sequelize;
sequelizeConnection = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

// const modelDefiners = [AuthProvider];
// for (const modelDefiner of modelDefiners) {
//   new modelDefiner();
// }

export { sequelizeConnection };
