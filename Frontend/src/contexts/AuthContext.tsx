import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { Joueur } from '../services/authService';

interface AuthContextType {
  joueur: Joueur | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; motDePasse: string }) => Promise<void>;
  register: (credentials: { pseudo: string; email: string; motDePasse: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [joueur, setJoueur] = useState<Joueur | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const joueur = authService.getCurrentJoueur();
    if (joueur) {
      setJoueur(joueur);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials: { email: string; motDePasse: string }) => {
    const response = await authService.login(credentials);
    setJoueur(response.joueur);
    setIsAuthenticated(true);
  };

  const register = async (credentials: { pseudo: string; email: string; motDePasse: string }) => {
    const response = await authService.register(credentials);
    setJoueur(response.joueur);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.logout();
    setJoueur(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ joueur, isAuthenticated, login, register, logout }}>
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