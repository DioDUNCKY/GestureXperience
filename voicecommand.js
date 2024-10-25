// models/VoiceCommand.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const VoiceCommand = sequelize.define('VoiceCommand', {
  command: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = VoiceCommand;
