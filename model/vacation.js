const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Vacation = sequelize.define('vacation', {
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
   email: {
      type: Sequelize.STRING,
      allowNull: false
   },
   userName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    startedAt: {
      type: Sequelize.DATEONLY,
      allowNull: false
   },
   endedAt: {
      type: Sequelize.DATEONLY,
      allowNull: false
   },
   noOfDays: {
      type: Sequelize.INTEGER,
      allowNull: false
   },
   reason: {
      type: Sequelize.STRING,
      allowNull: false
   },
   status: {
      type: Sequelize.INTEGER,
      allowNull: false
   }, 
 },{tableName: 'vacation', timestamps: true,});
 
 module.exports = Vacation;