const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Pdf = sequelize.define('pdf', {
   id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     allowNull: false,
     primaryKey: true
   },
   userId: {
    type: Sequelize.INTEGER,
    allowNull: false     
   },
   name: {
     type: Sequelize.STRING,
     allowNull: false
   },
   email: {
    type: Sequelize.STRING,
    allowNull: false
  },
   slipLocation: {
     type: Sequelize.STRING,
     allowNull: false
   },
   monthDate: Sequelize.DATEONLY,
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE,
 });
 
 module.exports = Pdf;