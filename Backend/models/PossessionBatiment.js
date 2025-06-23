const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PossessionBatiment = sequelize.define('PossessionBatiment', {
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
  },
  niveauId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  joueurId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

module.exports = PossessionBatiment; 