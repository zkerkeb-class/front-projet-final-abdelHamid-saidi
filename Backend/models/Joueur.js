const mongoose = require('mongoose');

const joueurSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  motDePasseHash: {
    type: String,
    required: true
  },
  patrimoine: {
    type: Number,
    default: 0,
    min: 0
  },
  classement: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
joueurSchema.index({ email: 1 });
joueurSchema.index({ pseudo: 1 });
joueurSchema.index({ patrimoine: -1 }); // Pour le classement

module.exports = mongoose.model('Joueur', joueurSchema); 