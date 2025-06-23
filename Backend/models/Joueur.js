const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Joueur = sequelize.define('Joueur', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  motDePasseHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patrimoine: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  classement: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Joueur; 