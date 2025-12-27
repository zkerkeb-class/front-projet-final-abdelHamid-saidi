import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from '../config/api';

// Interface pour les réponses d'erreur
interface ErrorResponse {
  message: string;
  error?: string;
}

// Création de l'instance Axios
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Intercepteur pour ajouter automatiquement le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    // Gestion des erreurs d'authentification
    if (error.response?.status === 401) {
      console.log('Token expiré ou invalide, redirection vers la connexion');
      localStorage.removeItem('token');
      localStorage.removeItem('joueur');
      window.location.href = '/login';
    }
    
    // Gestion des erreurs réseau
    if (!error.response) {
      console.error('Erreur réseau:', error.message);
      throw new Error('Erreur de connexion au serveur');
    }
    
    // Gestion des erreurs serveur
    const errorMessage = error.response.data?.message || 'Une erreur est survenue';
    throw new Error(errorMessage);
  }
);

export default api;

// Services pour les bâtiments
export const batimentService = {
  // Récupérer tous les niveaux de bâtiments
  getAllNiveauxBatiments: async () => {
    const response = await api.get('/niveaux-batiments');
    return response.data;
  },

  // Récupérer les niveaux par nom de bâtiment
  getNiveauxByNom: async (nom: string) => {
    const response = await api.get(`/niveaux-batiments/nom/${nom}`);
    return response.data;
  },

  // Récupérer les niveaux par niveau
  getNiveauxByNiveau: async (niveau: number) => {
    const response = await api.get(`/niveaux-batiments/niveau/${niveau}`);
    return response.data;
  },

  // Récupérer un niveau de bâtiment par ID
  getNiveauBatimentById: async (id: string) => {
    const response = await api.get(`/niveaux-batiments/${id}`);
    return response.data;
  }
};

// Services pour les ressources (déplacé vers ressourceService.ts)
// Les méthodes sont maintenant disponibles via ressourceService

// Service pour les images du menu (si nécessaire)
export const menuService = {
  // URLs des images du menu
  getMenuImages: () => ({
    carte: 'http://localhost:3000/images/menu/carte.png',
    ressources: 'http://localhost:3000/images/menu/resources.png',
    batiments: 'http://localhost:3000/images/menu/batiments.png'
  })
}; 