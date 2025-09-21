// CommonJS: require
require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: DB_DIALECT,
  host: DB_HOST,
});

module.exports = sequelize;
