const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import des modèles
const Joueur = require('../models/Joueur');
const Ressource = require('../models/Ressource');
const Niveau = require('../models/Niveau');
const Batiment = require('../models/Batiment');

const seedData = async () => {
  try {
    console.log('=== DÉBUT DU SEEDING ===');
    
    // Connexion à MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/biztown';
    await mongoose.connect(mongoURI);
    console.log('Connexion à MongoDB établie');

    // Nettoyage des collections
    await Joueur.deleteMany({});
    await Ressource.deleteMany({});
    await Niveau.deleteMany({});
    await Batiment.deleteMany({});
    console.log('Collections nettoyées');

    // Création des ressources
    const ressources = [
      { type: 'BizCoins', nom: 'BizCoin', prix: 1.0 },
      { type: 'Énergie', nom: 'Électricité', prix: 0.5 },
      { type: 'Matériaux', nom: 'Acier', prix: 2.0 },
      { type: 'Matériaux', nom: 'Bois', prix: 1.5 },
      { type: 'Produits', nom: 'Ordinateur', prix: 100.0 },
      { type: 'Produits', nom: 'Téléphone', prix: 50.0 },
      { type: 'Influence', nom: 'Réputation', prix: 10.0 }
    ];

    const ressourcesCreees = await Ressource.insertMany(ressources);
    console.log(`${ressourcesCreees.length} ressources créées`);

    // Création des niveaux
    const niveaux = [
      { numero: 1, nom: 'Débutant', description: 'Niveau de base', coutAmelioration: 100 },
      { numero: 2, nom: 'Intermédiaire', description: 'Niveau intermédiaire', coutAmelioration: 500 },
      { numero: 3, nom: 'Avancé', description: 'Niveau avancé', coutAmelioration: 1000 },
      { numero: 4, nom: 'Expert', description: 'Niveau expert', coutAmelioration: 2500 },
      { numero: 5, nom: 'Maître', description: 'Niveau maître', coutAmelioration: 5000 }
    ];

    const niveauxCrees = await Niveau.insertMany(niveaux);
    console.log(`${niveauxCrees.length} niveaux créés`);

    // Création des bâtiments
    const batiments = [
      { nom: 'Bureau Principal', type: 'Bureau', description: 'Centre de gestion', coutBase: 1000 },
      { nom: 'Usine de Production', type: 'Usine', description: 'Production de biens', coutBase: 2000 },
      { nom: 'Entrepôt Central', type: 'Dépôt', description: 'Stockage des ressources', coutBase: 1500 },
      { nom: 'Centrale Électrique', type: 'Centrale', description: 'Production d\'énergie', coutBase: 3000 },
      { nom: 'Marché Local', type: 'Marché', description: 'Commerce et échanges', coutBase: 1200 },
      { nom: 'Atelier de Réparation', type: 'Atelier', description: 'Maintenance et réparation', coutBase: 800 },
      { nom: 'Banque Commerciale', type: 'Banque', description: 'Gestion financière', coutBase: 5000 }
    ];

    const batimentsCrees = await Batiment.insertMany(batiments);
    console.log(`${batimentsCrees.length} bâtiments créés`);

    // Création d'un joueur de test
    const hashMotDePasse = await bcrypt.hash('hamid@biztown.com', 10);
    const joueurTest = new Joueur({
      pseudo: 'Hamid',
      email: 'hamid@biztown.com',
      motDePasseHash: hashMotDePasse,
      patrimoine: 10000,
      classement: 1
    });

    await joueurTest.save();
    console.log('Joueur de test créé');

    console.log('=== SEEDING TERMINÉ AVEC SUCCÈS ===');
    console.log('Données créées :');
    console.log(`- ${ressourcesCreees.length} ressources`);
    console.log(`- ${niveauxCrees.length} niveaux`);
    console.log(`- ${batimentsCrees.length} bâtiments`);
    console.log('- 1 joueur de test');
    console.log('');
    console.log('Compte de test :');
    console.log('Email: test@biztown.com');
    console.log('Mot de passe: password123');

  } catch (error) {
    console.error('Erreur lors du seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Connexion à MongoDB fermée');
  }
};

// Exécution du seeding
seedData(); 