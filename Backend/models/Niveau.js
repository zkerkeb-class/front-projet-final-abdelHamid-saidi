const mongoose = require('mongoose');

const niveauSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true,
    unique: true,
    min: 1
  },
  nom: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  coutAmelioration: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
niveauSchema.index({ numero: 1 });

module.exports = mongoose.model('Niveau', niveauSchema); 