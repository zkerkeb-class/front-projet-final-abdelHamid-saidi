const mongoose = require('mongoose');

const batimentSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Bureau', 'Usine', 'Dépôt', 'Centrale', 'Marché', 'Atelier', 'Banque']
  },
  plan: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  coutBase: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
batimentSchema.index({ type: 1 });
batimentSchema.index({ nom: 1 });

module.exports = mongoose.model('Batiment', batimentSchema); 