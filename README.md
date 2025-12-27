# 🏙️ BizTown - Jeu de Gestion de Ville

Un jeu de gestion de ville moderne développé avec React et Node.js, où vous construisez et gérez votre empire commercial.

## Présentation

BizTown est un jeu de simulation économique où vous devez :
- **Construire** des bâtiments (Bureau, Usine, Épicerie, Centrale)
- **Gérer** vos ressources (Électricité, Acier, Bois, etc.)
- **Développer** votre ville sur une grille hexagonale
- **Optimiser** votre production et commerce

## Fonctionnalités

### Système de Construction
- Grille de ville interactive en forme de losange
- 4 types de bâtiments disponibles
- Placement stratégique des constructions
- Système de niveaux d'amélioration

### Gestion Économique
- Système de ressources multiples
- Production et consommation automatiques
- Catalogue d'achat de bâtiments
- Patrimoine et classement des joueurs

### Système de Joueurs
- Inscription et connexion sécurisées
- Profils personnalisés avec avatars
- Classement et expérience
- Sauvegarde des progrès

## Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build
- **Tailwind CSS** pour le design
- **Swiper.js** pour les carousels

### Backend
- **Node.js** avec Express
- **MongoDB** pour la base de données
- **JWT** pour l'authentification
- **Swagger** pour la documentation API

## Installation et Lancement

### Prérequis
- Node.js (v16+)
- MongoDB
- npm ou yarn

### Installation

1. **Cloner le projet**
```bash
git clone https://github.com/votre-username/front-projet-final.git
cd front-projet-final
```

2. **Installer les dépendances**
```bash
# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

3. **Configuration**
```bash
# Copier le fichier d'environnement
cp Backend/.env.example Backend/.env
# Éditer les variables d'environnement
```

4. **Lancer les serveurs**
```bash
# Backend (port 3000)
cd Backend
npm start

# Frontend (port 5173)
cd ../Frontend
npm run dev
```

5. **Accéder au jeu**
```
Frontend: http://localhost:5173
API: http://localhost:3000
```

## Comptes de Test

```
Email: hamid@biztown.com | Mot de passe: password123
Email: alice@biztown.com  | Mot de passe: azerty
Email: bob@biztown.com    | Mot de passe: testpass
```

## Structure du Projet

```
front-projet-final/
├── Backend/                 # API Node.js
│   ├── controllers/         # Contrôleurs API
│   ├── models/             # Modèles MongoDB
│   ├── routes/             # Routes Express
│   └── seeders/            # Données de test
├── Frontend/               # Application React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── pages/          # Pages de l'application
│   │   ├── services/       # Services API
│   │   └── styles/         # Styles CSS
│   └── public/             # Assets statiques
└── Ressource/              # Assets et documentation
```

## Comment Jouer

1. **Créer un compte** ou vous connecter
2. **Explorer la carte** de votre ville
3. **Cliquer sur une case** pour construire
4. **Choisir un bâtiment** dans le catalogue
5. **Gérer vos ressources** dans l'onglet dédié
6. **Améliorer vos bâtiments** pour augmenter la production

## API Endpoints

- `GET /api/joueurs` - Liste des joueurs
- `GET /api/niveaux-batiments` - Types de bâtiments
- `POST /api/possession-batiments` - Construire un bâtiment
- `GET /api/ressources` - Ressources disponibles

## Fonctionnalités Avancées

- **Système de production** automatique des ressources
- **Besoins en ressources** pour les améliorations
- **Interface responsive** adaptée mobile/desktop
- **Animations fluides** et transitions
- **Gestion d'état** avec React Context

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouvelles fonctionnalités


*BizTown - Construisez votre empire commercial !* 
