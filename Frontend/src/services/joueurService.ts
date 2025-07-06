import api from './api';

export interface JoueurData {
  _id: string;
  pseudo: string;
  email: string;
  patrimoine: number;
  classement: number;
  niveauActuel: number;
  experience: number;
  dateDerniereConnexion: string;
  actif: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JoueurStats {
  niveau: number;
  experience: number;
  experiencePourNiveauSuivant: number;
  pourcentageExperience: number;
  patrimoine: number;
  classement: number;
}

export const joueurService = {
  // Récupérer les données complètes du joueur
  async getJoueurData(): Promise<JoueurData> {
    const response = await api.get('/joueurs/profil');
    return response.data;
  },

  // Récupérer les statistiques du joueur avec calculs
  async getJoueurStats(): Promise<JoueurStats> {
    const joueur = await this.getJoueurData();
    
    // Calcul de l'expérience pour le niveau suivant (exemple: 1000 exp par niveau)
    const experienceParNiveau = 1000;
    const experiencePourNiveauSuivant = joueur.niveauActuel * experienceParNiveau;
    const experienceActuelle = joueur.experience % experienceParNiveau;
    const pourcentageExperience = (experienceActuelle / experienceParNiveau) * 100;

    return {
      niveau: joueur.niveauActuel,
      experience: joueur.experience,
      experiencePourNiveauSuivant,
      pourcentageExperience,
      patrimoine: joueur.patrimoine,
      classement: joueur.classement
    };
  },

  // Mettre à jour le profil du joueur
  async updateProfil(data: { pseudo?: string; email?: string }): Promise<{ message: string; joueur: JoueurData }> {
    const response = await api.put('/joueurs/profil', data);
    return response.data;
  },

  // Récupérer le classement
  async getClassement(): Promise<JoueurData[]> {
    const response = await api.get('/joueurs/classement');
    return response.data;
  }
}; 