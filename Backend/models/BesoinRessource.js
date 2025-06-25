const mongoose = require('mongoose');

const besoinRessourceSchema = new mongoose.Schema({
  niveauId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Niveau',
    required: true
  },
  recepteurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ressource',
    required: true
  },
  quantite: {
    type: Number,
    required: true,
    min: 0
  },
  productionRessourcesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductionRessource'
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
besoinRessourceSchema.index({ niveauId: 1, recepteurId: 1 });
besoinRessourceSchema.index({ productionRessourcesId: 1 });

module.exports = mongoose.model('BesoinRessource', besoinRessourceSchema); 