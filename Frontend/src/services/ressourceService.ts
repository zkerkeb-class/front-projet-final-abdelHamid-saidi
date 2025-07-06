import api from './api';

export interface Ressource {
  _id: string;
  type: 'Énergie' | 'Matériaux' | 'Produits' | 'Influence';
  nom: string;
  image: string;
  prixAchat: number;
  prixVente: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RessourceGrouped {
  type: string;
  ressources: Ressource[];
}

export const ressourceService = {
  // Récupérer toutes les ressources
  getAllRessources: async (): Promise<Ressource[]> => {
    const response = await api.get('/ressources');
    return response.data;
  },

  // Récupérer les ressources groupées par type
  getAllRessourcesGrouped: async (): Promise<RessourceGrouped[]> => {
    const ressources = await ressourceService.getAllRessources();
    
    // Grouper les ressources par type
    const grouped = ressources.reduce((acc, ressource) => {
      const existingGroup = acc.find(group => group.type === ressource.type);
      if (existingGroup) {
        existingGroup.ressources.push(ressource);
      } else {
        acc.push({
          type: ressource.type,
          ressources: [ressource]
        });
      }
      return acc;
    }, [] as RessourceGrouped[]);

    return grouped;
  },

  // Récupérer les ressources par type
  getRessourcesByType: async (type: string): Promise<Ressource[]> => {
    const response = await api.get(`/ressources/type/${type}`);
    return response.data;
  },

  // Récupérer une ressource par ID
  getRessourceById: async (id: string): Promise<Ressource> => {
    const response = await api.get(`/ressources/${id}`);
    return response.data;
  }
}; 