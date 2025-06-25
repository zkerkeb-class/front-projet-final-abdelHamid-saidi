const mongoose = require('mongoose');

const casesBatimentSchema = new mongoose.Schema({
  batimentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batiment',
    required: true
  },
  positionX: {
    type: Number,
    required: true,
    min: 0
  },
  positionY: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    required: true,
    enum: ['Entrée', 'Sortie', 'Production', 'Stockage', 'Vide']
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
casesBatimentSchema.index({ batimentId: 1, positionX: 1, positionY: 1 }, { unique: true });
casesBatimentSchema.index({ batimentId: 1, type: 1 });

module.exports = mongoose.model('CasesBatiment', casesBatimentSchema); 