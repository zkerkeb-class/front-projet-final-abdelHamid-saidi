# BizTown Backend

API backend pour le jeu de gestion d'entreprise BizTown, construite avec Express.js et MongoDB.

## 🚀 Fonctionnalités

- **Authentification JWT** : Inscription, connexion et gestion des sessions
- **Gestion des joueurs** : Profils, classements et statistiques
- **Système de ressources** : 5 types de ressources différentes
- **Système de bâtiments** : 7 types de bâtiments avec niveaux
- **API RESTful** : Endpoints bien structurés et documentés
- **Validation des données** : Middleware de validation robuste

## 🛠️ Technologies utilisées

- **Node.js** avec Express.js
- **MongoDB** avec Mongoose ODM
- **JWT** pour l'authentification
- **bcryptjs** pour le hachage des mots de passe
- **CORS** pour les requêtes cross-origin

## 📦 Installation

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   ```bash
   cp .env.example .env
   ```
   
   Modifiez le fichier `.env` selon votre configuration :
   ```env
   MONGODB_URI=mongodb://localhost:27017/biztown
   JWT_SECRET=votre_secret_jwt_tres_securise
   JWT_EXPIRES_IN=24h
   PORT=3000
   NODE_ENV=development
   ```

4. **Démarrer MongoDB**
   ```bash
   # Assurez-vous que MongoDB est installé et en cours d'exécution
   mongod
   ```

5. **Peupler la base de données (optionnel)**
   ```bash
   npm run seed
   ```

6. **Démarrer le serveur**
   ```bash
   npm run dev
   ```

## 🔧 Scripts disponibles

- `npm start` - Démarre le serveur en production
- `npm run dev` - Démarre le serveur en développement avec nodemon
- `npm run seed` - Peuple la base de données avec des données de test

## 📁 Structure du projet

```
Backend/
├── config/              # Configuration
│   └── database.js      # Connexion MongoDB
├── controllers/         # Contrôleurs
│   └── joueurController.js
├── middleware/          # Middleware
│   ├── auth.js         # Authentification JWT
│   └── validation.js   # Validation des données
├── models/             # Modèles Mongoose
│   ├── Joueur.js
│   ├── Ressource.js
│   ├── Batiment.js
│   ├── Niveau.js
│   └── ...
├── routes/             # Routes API
│   └── joueurRoutes.js
├── seeders/            # Scripts de seeding
│   └── seed.js
├── app.js              # Point d'entrée
└── package.json
```

## 🔐 API Endpoints

### Authentification
- `POST /api/joueurs/inscription` - Création de compte
- `POST /api/joueurs/connexion` - Connexion

### Joueurs (protégé)
- `GET /api/joueurs/profil` - Récupérer le profil
- `PUT /api/joueurs/profil` - Mettre à jour le profil
- `GET /api/joueurs/classement` - Classement des joueurs

## 🗄️ Modèles de données

### Joueur
```javascript
{
  pseudo: String,        // Unique, min 3 caractères
  email: String,         // Unique, format email
  motDePasseHash: String, // Hash bcrypt
  patrimoine: Number,    // Valeur par défaut: 0
  classement: Number     // Valeur par défaut: 0
}
```

### Ressource
```javascript
{
  type: String,          // Enum: BizCoins, Énergie, Matériaux, Produits, Influence
  nom: String,           // Nom de la ressource
  prix: Number           // Prix unitaire
}
```

### Batiment
```javascript
{
  nom: String,           // Nom du bâtiment
  type: String,          // Enum: Bureau, Usine, Dépôt, Centrale, Marché, Atelier, Banque
  description: String,   // Description du bâtiment
  coutBase: Number       // Coût de base
}
```

## 🔒 Sécurité

- **Hachage des mots de passe** : bcrypt avec salt rounds
- **JWT** : Tokens d'authentification sécurisés
- **Validation** : Middleware de validation des données
- **CORS** : Configuration pour les requêtes cross-origin
- **Variables d'environnement** : Configuration sécurisée

## 🚀 Déploiement

1. **Variables d'environnement de production**
   ```env
   MONGODB_URI=mongodb://votre-serveur-mongodb/biztown
   JWT_SECRET=secret_tres_securise_production
   JWT_EXPIRES_IN=24h
   PORT=3000
   NODE_ENV=production
   ```

2. **Démarrage en production**
   ```bash
   npm start
   ```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails. 