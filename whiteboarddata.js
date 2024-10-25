// models/WhiteboardData.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const WhiteboardData = sequelize.define('WhiteboardData', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = WhiteboardData;
