import api from './api';
import { ENDPOINTS } from '../config/api';

export interface LoginCredentials {
  email: string;
  motDePasse: string;
}

export interface RegisterCredentials extends LoginCredentials {
  pseudo: string;
}

export interface Joueur {
  id: string;
  pseudo: string;
  email: string;
  patrimoine: number;
  classement: number;
}

export interface AuthResponse {
  token: string;
  joueur: Joueur;
  message: string;
}

export interface ProfileUpdateData {
  pseudo?: string;
  email?: string;
}

const authService = { 
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Tentative de connexion avec:', { email: credentials.email });
      
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, credentials);
      console.log('Réponse du serveur:', response.data);

      if (!response.data.token) {
        console.error('Token manquant dans la réponse');
        throw new Error('Réponse invalide du serveur');
      }

      if (!response.data.joueur) {
        console.error('Données joueur manquantes dans la réponse');
        throw new Error('Réponse invalide du serveur');
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('joueur', JSON.stringify(response.data.joueur));
      
      console.log('Connexion réussie, données stockées');
      return response.data;
    } catch (error: any) {
      console.error('Erreur de connexion:', error.message);
      throw error;
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      console.log('Tentative d\'inscription avec:', { pseudo: credentials.pseudo, email: credentials.email });
      
      const response = await api.post(ENDPOINTS.AUTH.REGISTER, credentials);
      console.log('Réponse du serveur:', response.data);

      if (!response.data.token) {
        console.error('Token manquant dans la réponse');
        throw new Error('Réponse invalide du serveur');
      }

      if (!response.data.joueur) {
        console.error('Données joueur manquantes dans la réponse');
        throw new Error('Réponse invalide du serveur');
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('joueur', JSON.stringify(response.data.joueur));
      
      console.log('Inscription réussie, données stockées');
      return response.data;
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error.message);
      throw error;
    }
  },

  async getProfile(): Promise<Joueur> {
    try {
      const response = await api.get(ENDPOINTS.AUTH.PROFILE);
      return response.data;
    } catch (error: any) {
      console.error('Erreur lors de la récupération du profil:', error.message);
      throw error;
    }
  },

  async updateProfile(data: ProfileUpdateData): Promise<{ message: string; joueur: Joueur }> {
    try {
      const response = await api.put(ENDPOINTS.AUTH.PROFILE, data);
      
      // Mettre à jour les données en localStorage
      if (response.data.joueur) {
        localStorage.setItem('joueur', JSON.stringify(response.data.joueur));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du profil:', error.message);
      throw error;
    }
  },

  async getClassement(): Promise<Joueur[]> {
    try {
      const response = await api.get(ENDPOINTS.AUTH.CLASSEMENT);
      return response.data;
    } catch (error: any) {
      console.error('Erreur lors de la récupération du classement:', error.message);
      throw error;
    }
  },

  logout(): void {
    console.log('Déconnexion');
    localStorage.removeItem('token');
    localStorage.removeItem('joueur');
  },

  getCurrentJoueur(): Joueur | null {
    const joueurStr = localStorage.getItem('joueur');
    if (joueurStr) {
      try {
        const joueur = JSON.parse(joueurStr);
        console.log('Joueur récupéré:', joueur);
        return joueur;
      } catch (error) {
        console.error('Erreur lors du parsing du joueur:', error);
        return null;
      }
    }
    return null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('Vérification de l\'authentification:', !!token);
    return !!token;
  }
};

export default authService; 