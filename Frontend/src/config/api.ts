// Configuration de l'API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Configuration des endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/joueurs/connexion',
    REGISTER: '/joueurs/inscription',
    PROFILE: '/joueurs/profil',
    CLASSEMENT: '/joueurs/classement',
  },
  GAME: {
    TERRAIN: '/terrain',
    BATIMENTS: '/batiments',
    RESSOURCES: '/ressources',
  }
}; 