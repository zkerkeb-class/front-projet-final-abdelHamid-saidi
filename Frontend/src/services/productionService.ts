import api from './api';

export interface ProductionRessource {
  _id: string;
  niveauId: string;
  ressourceId: {
    _id: string;
    nom: string;
    type: string;
    description?: string;
  };
  quantite: number;
  frequence: number;
  actif: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BesoinRessource {
  _id: string;
  niveauId: string;
  ressourceId: {
    _id: string;
    nom: string;
    type: string;
    description?: string;
  };
  quantite: number;
  productionRessourceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductionData {
  besoins: Array<{
    ressource: string;
    quantite: number;
  }>;
  production: Array<{
    ressource: string;
    quantite: number;
  }>;
}

export const productionService = {
  // Récupérer toutes les productions de ressources
  async getAllProductions(): Promise<ProductionRessource[]> {
    const response = await api.get('/production-ressources');
    return response.data;
  },

  // Récupérer les productions par niveau de bâtiment
  async getProductionsByNiveau(niveauId: string): Promise<ProductionRessource[]> {
    const response = await api.get(`/production-ressources/niveau/${niveauId}`);
    return response.data;
  },

  // Récupérer tous les besoins en ressources
  async getAllBesoins(): Promise<BesoinRessource[]> {
    const response = await api.get('/besoins-ressources');
    return response.data;
  },

  // Récupérer les besoins par niveau de bâtiment
  async getBesoinsByNiveau(niveauId: string): Promise<BesoinRessource[]> {
    const response = await api.get(`/besoins-ressources/niveau/${niveauId}`);
    return response.data;
  },

  // Récupérer les données de production complètes pour un bâtiment
  async getProductionDataForBatiment(batimentNom: string): Promise<ProductionData> {
    try {
      // Récupérer tous les niveaux du bâtiment
      const niveauxResponse = await api.get(`/niveaux-batiments/nom/${batimentNom}`);
      const niveaux = niveauxResponse.data;

      if (niveaux.length === 0) {
        return { besoins: [], production: [] };
      }

      // Prendre le premier niveau pour les données de production
      const premierNiveau = niveaux[0];
      
      // Récupérer les productions pour ce niveau
      const productions = await this.getProductionsByNiveau(premierNiveau._id);
      
      // Récupérer les besoins pour ce niveau
      const besoins = await this.getBesoinsByNiveau(premierNiveau._id);

      return {
        besoins: besoins.map(besoin => ({
          ressource: besoin.ressourceId.nom,
          quantite: besoin.quantite
        })),
        production: productions.map(prod => ({
          ressource: prod.ressourceId.nom,
          quantite: prod.quantite
        }))
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des données de production:', error);
      return { besoins: [], production: [] };
    }
  }
}; 