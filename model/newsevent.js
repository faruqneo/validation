
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Newsevent = sequelize.define('newsevent', {
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
   desc: {
    type: Sequelize.TEXT,
    allowNull: true
   },
   extradetails: {
    type: Sequelize.TEXT,
    allowNull: true
   },
   
  createdat: Sequelize.DATE,
  updatedat: Sequelize.DATE,

  eventdate: {
     type: Sequelize.DATE,
     allowNull: true
  },
  eventtype:{
   type: Sequelize.STRING,
   allowNull: false
  }
 },{tableName: 'newsevent', timestamps: false,});
 
 module.exports = Newsevent;