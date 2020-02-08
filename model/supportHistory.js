
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const SupportHistory = sequelize.define('supportHistory',{
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    messageId: {
      type: Sequelize.INTEGER,
      allowNull: false       
    },
    conversation: {
      type: Sequelize.STRING,
      allowNull: true   
   },
    from: Sequelize.STRING,
    to: Sequelize.STRING,

    createdAt: Sequelize.DATEONLY
});

module.exports = SupportHistory;