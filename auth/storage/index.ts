import { Sequelize } from "sequelize";
import { authProvider } from "./models/authModel";
// import module
const dbConfig = require("../config");

export const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const modelDefiners = [authProvider];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
