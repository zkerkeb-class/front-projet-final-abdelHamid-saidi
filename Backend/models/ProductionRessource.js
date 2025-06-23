const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductionRessource = sequelize.define('ProductionRessource', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quantite: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tempsProduction: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  niveauId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  recepteurId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

module.exports = ProductionRessource; 