const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Batiment = sequelize.define('Batiment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Bureau', 'Usine', 'Dépôt', 'Centrale', 'Marché', 'Atelier', 'Banque'),
    allowNull: false
  },
  plan: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Batiment; 