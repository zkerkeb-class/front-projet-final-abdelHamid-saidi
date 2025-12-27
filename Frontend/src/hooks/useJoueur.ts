import { useState, useEffect } from 'react';
import { joueurService, JoueurData, JoueurStats } from '../services/joueurService';

export const useJoueur = () => {
  const [joueurData, setJoueurData] = useState<JoueurData | null>(null);
  const [joueurStats, setJoueurStats] = useState<JoueurStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJoueurData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await joueurService.getJoueurData();
      const stats = await joueurService.getJoueurStats();
      
      setJoueurData(data);
      setJoueurStats(stats);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des données du joueur:', err);
      setError(err.message || 'Erreur lors de la récupération des données');
    } finally {
      setLoading(false);
    }
  };

  const refreshJoueurData = () => {
    fetchJoueurData();
  };

  useEffect(() => {
    fetchJoueurData();
  }, []);

  return {
    joueurData,
    joueurStats,
    loading,
    error,
    refreshJoueurData
  };
}; 