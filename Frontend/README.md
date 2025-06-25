# BizTown Frontend

Application frontend pour le jeu de gestion d'entreprise BizTown, construite avec React, TypeScript et Tailwind CSS.

## 🚀 Fonctionnalités

- **Authentification complète** : Inscription, connexion et gestion des sessions
- **Gestion de profil** : Modification des informations personnelles
- **Classement des joueurs** : Affichage du classement en temps réel
- **Interface moderne** : Design responsive avec Tailwind CSS
- **Gestion d'état** : Context API pour l'authentification
- **Navigation sécurisée** : Routes protégées avec redirection automatique

## 🛠️ Technologies utilisées

- **React 19** avec TypeScript
- **Vite** pour le build et le développement
- **Tailwind CSS** pour le styling
- **React Router** pour la navigation
- **Axios** pour les appels API
- **JWT** pour l'authentification

## 📦 Installation

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   ```bash
   cp env.example .env
   ```
   
   Modifiez le fichier `.env` selon votre configuration :
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_NAME=BizTown
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

## 🔧 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la build de production
- `npm run lint` - Lance le linter ESLint

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Button.tsx
│   ├── Navbar.tsx
│   ├── PrivateRoute.tsx
│   └── TextInput.jsx
├── config/             # Configuration
│   └── api.ts
├── contexts/           # Contextes React
│   └── AuthContext.tsx
├── pages/              # Pages de l'application
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Profile.tsx
│   ├── Classement.tsx
│   └── NotFound.tsx
├── services/           # Services API
│   ├── api.ts
│   └── authService.ts
└── App.tsx            # Composant principal
```

## 🔐 Authentification

L'application utilise un système d'authentification JWT complet :

- **Inscription** : Création de compte avec validation
- **Connexion** : Authentification avec email/mot de passe
- **Sessions persistantes** : Stockage local des tokens
- **Protection des routes** : Redirection automatique si non authentifié
- **Gestion des erreurs** : Messages d'erreur utilisateur-friendly

## 🌐 API Integration

L'application communique avec le backend via une API REST :

- **Configuration centralisée** : Variables d'environnement pour l'URL de l'API
- **Intercepteurs Axios** : Gestion automatique des tokens et erreurs
- **Gestion d'erreurs** : Interception des erreurs 401 pour déconnexion automatique
- **Types TypeScript** : Interfaces pour les données API

## 🎨 Interface utilisateur

- **Design responsive** : Adaptation mobile et desktop
- **Thème cohérent** : Palette de couleurs BizTown
- **Animations** : Transitions et effets visuels
- **Accessibilité** : Support des lecteurs d'écran

## 🔄 État de l'application

L'état global est géré via React Context :

- **AuthContext** : État d'authentification et données utilisateur
- **Persistance** : Stockage local des données de session
- **Synchronisation** : Rafraîchissement automatique des données

## 🚀 Déploiement

1. **Build de production**
   ```bash
   npm run build
   ```

2. **Variables d'environnement de production**
   ```env
   VITE_API_URL=https://votre-api.com/api
   VITE_APP_NAME=BizTown
   VITE_DEV_MODE=false
   ```

3. **Déploiement** : Les fichiers dans `dist/` peuvent être déployés sur n'importe quel serveur web statique.

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
