const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BesoinRessource = sequelize.define('BesoinRessource', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quantite: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  niveauId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  productionRessourcesId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  recepteurId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

module.exports = BesoinRessource; 