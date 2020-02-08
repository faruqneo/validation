const Sequelize = require('sequelize');
const dotenv = require('dotenv').config()

const sequelize = new Sequelize({
  database: process.env.MYSQL_DB,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  dialect: 'mysql',
  host: process.env.MYSQL_HOST_NAME
});



module.exports = sequelize;