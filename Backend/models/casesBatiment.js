const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CasesBatiment = sequelize.define('CasesBatiment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  pos_x: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pos_y: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = CasesBatiment; 