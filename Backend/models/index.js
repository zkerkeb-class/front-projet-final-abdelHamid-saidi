const Joueur = require('./Joueur');
const CasesTerrain = require('./CasesTerrain');
const Batiment = require('./Batiment');
const Niveau = require('./Niveau');
const PossetionBatiment = require('./PossetionBatiment');
const Ressource = require('./Ressource');
const ProductionRessource = require('./ProductionRessource');
const BesoinRessource = require('./BesoinRessource');
const CasesBatiment = require('./CasesBatiment');

// Relations Joueur <-> CasesTerrain
Joueur.hasMany(CasesTerrain, { foreignKey: 'joueurId' });
CasesTerrain.belongsTo(Joueur, { foreignKey: 'joueurId' });

// Relations Joueur <-> PossetionBatiment
Joueur.hasMany(PossetionBatiment, { foreignKey: 'joueurId' });
PossetionBatiment.belongsTo(Joueur, { foreignKey: 'joueurId' });

// Relations Niveau <-> PossetionBatiment
Niveau.hasMany(PossetionBatiment, { foreignKey: 'niveauId' });
PossetionBatiment.belongsTo(Niveau, { foreignKey: 'niveauId' });

// Relations Niveau <-> ProductionRessource
Niveau.hasMany(ProductionRessource, { foreignKey: 'niveauId' });
ProductionRessource.belongsTo(Niveau, { foreignKey: 'niveauId' });

// Relations Niveau <-> BesoinRessource
Niveau.hasMany(BesoinRessource, { foreignKey: 'niveauId' });
BesoinRessource.belongsTo(Niveau, { foreignKey: 'niveauId' });

// Relations Ressource <-> ProductionRessource
Ressource.hasMany(ProductionRessource, { foreignKey: 'recepteurId' });
ProductionRessource.belongsTo(Ressource, { foreignKey: 'recepteurId' });

// Relations Ressource <-> BesoinRessource
Ressource.hasMany(BesoinRessource, { foreignKey: 'recepteurId' });
BesoinRessource.belongsTo(Ressource, { foreignKey: 'recepteurId' });

// Relations ProductionRessource <-> BesoinRessource
ProductionRessource.hasMany(BesoinRessource, { foreignKey: 'productionRessourcesId' });
BesoinRessource.belongsTo(ProductionRessource, { foreignKey: 'productionRessourcesId' });

// Exporter tous les modèles
module.exports = {
  Joueur,
  CasesTerrain,
  Batiment,
  Niveau,
  PossetionBatiment,
  Ressource,
  ProductionRessource,
  BesoinRessource,
  CasesBatiment
}; 