const mongoose = require('mongoose');

const casesTerrainSchema = new mongoose.Schema({
  joueurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joueur',
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
    enum: ['Vide', 'Bâtiment', 'Ressource', 'Obstacle']
  },
  contenu: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'contenuModel'
  },
  contenuModel: {
    type: String,
    enum: ['Batiment', 'Ressource']
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
casesTerrainSchema.index({ joueurId: 1, positionX: 1, positionY: 1 }, { unique: true });
casesTerrainSchema.index({ joueurId: 1, type: 1 });

module.exports = mongoose.model('CasesTerrain', casesTerrainSchema); 