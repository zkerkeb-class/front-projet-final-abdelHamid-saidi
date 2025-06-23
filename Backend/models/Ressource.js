const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ressource = sequelize.define('Ressource', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('BizCoins', 'Énergie', 'Matériaux', 'Produits', 'Influence'),
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Ressource; 