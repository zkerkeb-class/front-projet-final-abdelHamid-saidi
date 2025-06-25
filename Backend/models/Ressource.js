const mongoose = require('mongoose');

const ressourceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['BizCoins', 'Énergie', 'Matériaux', 'Produits', 'Influence']
  },
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prix: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
ressourceSchema.index({ type: 1 });
ressourceSchema.index({ nom: 1 });

module.exports = mongoose.model('Ressource', ressourceSchema); 