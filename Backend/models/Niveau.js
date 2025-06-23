const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Niveau = sequelize.define('Niveau', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  niveau: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rendement: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tempsConstruction: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cout: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Niveau; 