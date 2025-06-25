// Import de tous les modèles Mongoose
const Joueur = require('./Joueur');
const CasesTerrain = require('./CasesTerrain');
const Batiment = require('./Batiment');
const Niveau = require('./Niveau');
const PossessionBatiment = require('./PossessionBatiment');
const Ressource = require('./Ressource');
const ProductionRessource = require('./ProductionRessource');
const BesoinRessource = require('./BesoinRessource');
const CasesBatiment = require('./CasesBatiment');

// Export de tous les modèles
module.exports = {
  Joueur,
  CasesTerrain,
  Batiment,
  Niveau,
  PossessionBatiment,
  Ressource,
  ProductionRessource,
  BesoinRessource,
  CasesBatiment
}; 