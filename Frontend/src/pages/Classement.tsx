import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

const Classement: React.FC = () => {
  const { joueur } = useAuth();
  const [classement, setClassement] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassement = async () => {
      try {
        setLoading(true);
        const data = await authService.getClassement();
        setClassement(data);
      } catch (error: any) {
        setError(error.message || 'Erreur lors du chargement du classement');
      } finally {
        setLoading(false);
      }
    };

    fetchClassement();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Classement des Joueurs</h3>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              {classement.map((joueurClassement, index) => (
                <div
                  key={joueurClassement.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    joueurClassement.id === joueur?.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                      #{joueurClassement.classement}
                    </div>
                    <div>
                      <div className="font-semibold">
                        {joueurClassement.pseudo}
                        {joueurClassement.id === joueur?.id && (
                          <span className="ml-2 text-blue-600">(Vous)</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Patrimoine: {joueurClassement.patrimoine} €
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {classement.length === 0 && !error && (
              <div className="text-center py-8 text-gray-500">
                Aucun joueur dans le classement pour le moment
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classement; 