const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const joueurRoutes = require('./routes/joueurRoutes');
const Joueur = require('./models/Joueur');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API' });
});

// Routes des joueurs (incluant l'authentification)
app.use('/api/joueurs', joueurRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('=== ERREUR SERVEUR ===');
  console.error('Type d\'erreur:', err.name);
  console.error('Message d\'erreur:', err.message);
  console.error('Stack trace:', err.stack);
  console.error('=== FIN ERREUR ===');
  
  res.status(500).json({ 
    message: 'Une erreur est survenue sur le serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Port
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
const startServer = async () => {
  try {
    console.log('=== DÉMARRAGE DU SERVEUR ===');
    
    // Test de la connexion à la base de données
    console.log('Test de la connexion à la base de données...');
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
    
    // Synchronisation de la base de données
    console.log('Synchronisation de la base de données...');
    await sequelize.sync({ alter: true });
    console.log('Base de données synchronisée avec succès.');
    
    // Vérification des tables
    console.log('Vérification des tables...');
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('Tables disponibles:', tables);
    
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
      console.log('=== FIN DÉMARRAGE ===');
    });
  } catch (error) {
    console.error('=== ERREUR DE DÉMARRAGE ===');
    console.error('Type d\'erreur:', error.name);
    console.error('Message d\'erreur:', error.message);
    console.error('Stack trace:', error.stack);
    console.error('=== FIN ERREUR ===');
  }
};

startServer(); 