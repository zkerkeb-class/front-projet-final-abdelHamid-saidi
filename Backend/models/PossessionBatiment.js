const mongoose = require('mongoose');

const possessionBatimentSchema = new mongoose.Schema({
  joueurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joueur',
    required: true
  },
  batimentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batiment',
    required: true
  },
  niveauId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Niveau',
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
  dateConstruction: {
    type: Date,
    default: Date.now
  },
  enConstruction: {
    type: Boolean,
    default: false
  },
  dateFinConstruction: {
    type: Date
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
possessionBatimentSchema.index({ joueurId: 1, batimentId: 1 });
possessionBatimentSchema.index({ joueurId: 1, positionX: 1, positionY: 1 }, { unique: true });
possessionBatimentSchema.index({ enConstruction: 1, dateFinConstruction: 1 });

module.exports = mongoose.model('PossessionBatiment', possessionBatimentSchema); 