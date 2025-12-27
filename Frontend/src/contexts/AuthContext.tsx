import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { Joueur, ProfileUpdateData } from '../services/authService';

interface AuthContextType {
  joueur: Joueur | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { email: string; motDePasse: string }) => Promise<void>;
  register: (credentials: { pseudo: string; email: string; motDePasse: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [joueur, setJoueur] = useState<Joueur | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialisation au chargement de l'application
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const joueur = authService.getCurrentJoueur();
        if (joueur && authService.isAuthenticated()) {
          setJoueur(joueur);
          setIsAuthenticated(true);
          
          // Rafraîchir les données du profil depuis le serveur
          try {
            const freshProfile = await authService.getProfile();
            setJoueur(freshProfile);
            localStorage.setItem('joueur', JSON.stringify(freshProfile));
          } catch (error) {
            console.warn('Impossible de rafraîchir le profil, utilisation des données locales');
          }
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: { email: string; motDePasse: string }) => {
    try {
      const response = await authService.login(credentials);
      setJoueur(response.joueur);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const register = async (credentials: { pseudo: string; email: string; motDePasse: string }) => {
    try {
      const response = await authService.register(credentials);
      setJoueur(response.joueur);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setJoueur(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    try {
      const response = await authService.updateProfile(data);
      setJoueur(response.joueur);
    } catch (error) {
      throw error;
    }
  };

  const refreshProfile = async () => {
    try {
      const freshProfile = await authService.getProfile();
      setJoueur(freshProfile);
      localStorage.setItem('joueur', JSON.stringify(freshProfile));
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      joueur, 
      isAuthenticated, 
      loading,
      login, 
      register, 
      logout, 
      updateProfile,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}; 