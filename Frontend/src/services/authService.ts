import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Ajustez selon votre configuration backend

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

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Tentative de connexion avec:', { email: credentials.email });
      
      const response = await axios.post(`${API_URL}/joueurs/connexion`, credentials);
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
      console.error('Erreur de connexion:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      console.log('Tentative d\'inscription avec:', { pseudo: credentials.pseudo, email: credentials.email });
      
      const response = await axios.post(`${API_URL}/joueurs/inscription`, credentials);
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
      console.error('Erreur d\'inscription:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
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