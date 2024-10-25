// models/Gesture.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Gesture = sequelize.define('Gesture', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Gesture;
