
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Support = sequelize.define('support', {
   id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     allowNull: false,
     primaryKey: true
   },
   user_id: {
     type: Sequelize.INTEGER,
     allowNull: false
   },
   fromEmail: {
    type: Sequelize.STRING,
    allowNull: false
   },
   toEmail: {
    type: Sequelize.STRING,
    allowNull: false
   },
   subject:{
    type: Sequelize.STRING,
    allowNull: false
   },
   message: {
     type: Sequelize.STRING,
     allowNull: false
   },
   status: Sequelize.INTEGER,
  //  reply1: Sequelize.STRING,
  //  reply2: Sequelize.STRING,
  //  reply3: Sequelize.STRING,
  //  reply4: Sequelize.STRING,
  //  reply5: Sequelize.STRING,
   
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE,
 });
 
 module.exports = Support;