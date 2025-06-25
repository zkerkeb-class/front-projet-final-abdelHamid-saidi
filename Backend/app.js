const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const joueurRoutes = require('./routes/joueurRoutes');

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
  res.json({ message: 'Bienvenue sur l\'API BizTown' });
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
    
    // Connexion à MongoDB
    console.log('Connexion à MongoDB...');
    await connectDB();
    console.log('Connexion à MongoDB établie avec succès.');
    
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