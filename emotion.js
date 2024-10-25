// models/Emotion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Emotion = sequelize.define('Emotion', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  intensity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Emotion;
