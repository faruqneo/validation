const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Singup = sequelize.define('singup', {
   id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     allowNull: false,
     primaryKey: true
   },
   name:{
      type: Sequelize.STRING,
      allowNull: false     
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false
   },
   avatar: {
      type: Sequelize.STRING,
      allowNull: true
   },
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE,
 });
 
 module.exports = Singup;