const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Calendar = sequelize.define('calendar', {
   id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     allowNull: false,
     primaryKey: true
   },
   title: {
     type: Sequelize.STRING,
     allowNull: true
   },
  eventdate: {
     type: Sequelize.DATE,
     allowNull: true
  },
 },{tableName: 'calendar', timestamps: true,});
 
 module.exports = Calendar;