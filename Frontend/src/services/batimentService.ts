import api from './api';

export interface RessourceAmelioration {
  ressourceId: {
    _id: string;
    nom: string;
    description?: string;
  };
  quantite: number;
}

export interface NiveauBatiment {
  _id: string;
  nom: string;
  niveau: number;
  image: string;
  description?: string;
  coutBase: number;
  coutAmelioration: number;
  ressourcesAmelioration: RessourceAmelioration[];
  createdAt: string;
  updatedAt: string;
}

export interface BatimentGrouped {
  nom: string;
  niveaux: NiveauBatiment[];
  image: string;
  description?: string;
}

export interface PossessionBatiment {
  _id: string;
  joueurId: string;
  niveauBatimentId: string;
  niveauBatiment: NiveauBatiment;
  niveauActuel: number;
  createdAt: string;
  updatedAt: string;
}

export const batimentService = {
  // Récupérer tous les niveaux de bâtiments
  async getAllNiveauxBatiments(): Promise<NiveauBatiment[]> {
    const response = await api.get('/niveaux-batiments');
    return response.data;
  },

  // Récupérer les niveaux d'un bâtiment par nom
  async getNiveauxByNom(nom: string): Promise<NiveauBatiment[]> {
    const response = await api.get(`/niveaux-batiments/nom/${nom}`);
    return response.data;
  },

  // Récupérer tous les bâtiments groupés par nom
  async getAllBatimentsGrouped(): Promise<BatimentGrouped[]> {
    const niveaux = await this.getAllNiveauxBatiments();
    
    // Grouper par nom de bâtiment
    const grouped = niveaux.reduce((acc, niveau) => {
      const existing = acc.find(b => b.nom === niveau.nom);
      if (existing) {
        existing.niveaux.push(niveau);
      } else {
        acc.push({
          nom: niveau.nom,
          niveaux: [niveau],
          image: `http://localhost:3000${niveau.image}`,
          description: niveau.description
        });
      }
      return acc;
    }, [] as BatimentGrouped[]);

    // Trier les niveaux dans chaque bâtiment
    grouped.forEach(batiment => {
      batiment.niveaux.sort((a, b) => a.niveau - b.niveau);
    });

    return grouped;
  },

  // Récupérer les bâtiments possédés par le joueur authentifié
  async getBatimentsPossedes(): Promise<BatimentGrouped[]> {
    const response = await api.get('/possession-batiments/mes-batiments');
    const possessions: PossessionBatiment[] = response.data;
    
    // Grouper par nom de bâtiment
    const grouped = possessions.reduce((acc, possession) => {
      const niveau = possession.niveauBatiment;
      const existing = acc.find(b => b.nom === niveau.nom);
      
      if (existing) {
        existing.niveaux.push(niveau);
      } else {
        acc.push({
          nom: niveau.nom,
          niveaux: [niveau],
          image: `http://localhost:3000${niveau.image}`,
          description: niveau.description
        });
      }
      return acc;
    }, [] as BatimentGrouped[]);

    // Trier les niveaux dans chaque bâtiment
    grouped.forEach(batiment => {
      batiment.niveaux.sort((a, b) => a.niveau - b.niveau);
    });

    return grouped;
  }
}; 