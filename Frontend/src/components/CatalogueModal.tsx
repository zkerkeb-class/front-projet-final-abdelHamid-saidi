import React, { useState, useEffect } from 'react';
import { batimentService, BatimentGrouped, NiveauBatiment } from '../services/batimentService';
import { productionService, ProductionData } from '../services/productionService';
import { ressourceService, RessourceGrouped, Ressource } from '../services/ressourceService';
import BatimentsCarousel from './BatimentsCarousel';
import RessourcesCarousel from './RessourcesCarousel';
import '../styles/Modals.css';

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CatalogueModal: React.FC<CatalogueModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'batiments' | 'ressources'>('batiments');
  const [batiments, setBatiments] = useState<BatimentGrouped[]>([]);
  const [ressourcesGrouped, setRessourcesGrouped] = useState<RessourceGrouped[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBatiment, setSelectedBatiment] = useState<BatimentGrouped | null>(null);
  const [selectedRessource, setSelectedRessource] = useState<Ressource | null>(null);
  const [productionData, setProductionData] = useState<ProductionData | null>(null);
  const [loadingProduction, setLoadingProduction] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        loadBatiments(),
        loadRessources()
      ]);
    } catch (err) {
      setError('Erreur lors du chargement du catalogue');
      console.error('Erreur lors du chargement du catalogue:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadBatiments = async () => {
    try {
      const data = await batimentService.getAllBatimentsGrouped();
      setBatiments(data);
    } catch (err) {
      console.error('Erreur lors du chargement des bâtiments:', err);
      throw err;
    }
  };

  const loadRessources = async () => {
    try {
      const data = await ressourceService.getAllRessourcesGrouped();
      setRessourcesGrouped(data);
    } catch (err) {
      console.error('Erreur lors du chargement des ressources:', err);
      throw err;
    }
  };

  const handleBatimentClick = async (batiment: BatimentGrouped) => {
    setSelectedBatiment(batiment);
    setSelectedRessource(null);
    setLoadingProduction(true);
    try {
      const data = await productionService.getProductionDataForBatiment(batiment.nom);
      setProductionData(data);
    } catch (error) {
      console.error('Erreur lors du chargement des données de production:', error);
      setProductionData(null);
    } finally {
      setLoadingProduction(false);
    }
  };

  const handleRessourceClick = (ressource: Ressource) => {
    setSelectedRessource(ressource);
    setSelectedBatiment(null);
    setProductionData(null);
  };

  const renderNiveauDetails = (niveau: NiveauBatiment, isFirst: boolean) => {
    return (
      <div key={niveau._id} className="resource-card">
        {/* En-tête du niveau avec image et titre */}
        <div className="card-header">
          <img
            src={`http://localhost:3000${niveau.image}`}
            alt={`${selectedBatiment?.nom} niveau ${niveau.niveau}`}
            className="card-image"
          />
          <div>
            <h4 className="card-title">Niveau {niveau.niveau}</h4>
            {niveau.description && (
              <p className="card-description">{niveau.description}</p>
            )}
          </div>
        </div>

        {/* Coûts */}
        <div className="mb-4">
          <h5 className="font-semibold text-gray-700 mb-2">Coûts</h5>
          <div className="flex gap-3">
            {isFirst && niveau.coutBase > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex-1">
                <span className="text-sm font-medium text-blue-800">Coût de base</span>
                <div className="text-lg font-bold text-blue-900">{niveau.coutBase} pièces</div>
              </div>
            )}
            {niveau.coutAmelioration > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex-1">
                <span className="text-sm font-medium text-green-800">Coût d'amélioration</span>
                <div className="text-lg font-bold text-green-900">{niveau.coutAmelioration} pièces</div>
              </div>
            )}
          </div>
        </div>

        {/* Ressources nécessaires */}
        {niveau.ressourcesAmelioration.length > 0 && (
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">
              {isFirst ? 'Ressources nécessaires pour la construction' : 'Ressources nécessaires pour l\'amélioration'}
            </h5>
            <div className="grid grid-cols-2 gap-3">
              {niveau.ressourcesAmelioration.map((ressource, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{ressource.ressourceId.nom}</span>
                    <span className="text-lg font-bold text-gray-900">{ressource.quantite}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderProductionInfo = () => {
    if (loadingProduction) {
      return (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span className="loading-text">Chargement des données de production...</span>
        </div>
      );
    }

    if (!productionData || (productionData.besoins.length === 0 && productionData.production.length === 0)) {
      return null;
    }

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Production</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productionData.besoins.length > 0 && (
              <div>
                <h4 className="font-medium text-red-700 mb-2">Ressources consommées</h4>
                <div className="space-y-2">
                  {productionData.besoins.map((besoin, index) => (
                    <div key={index} className="flex justify-between bg-red-50 p-2 rounded border border-red-200">
                      <span className="text-red-700">{besoin.ressource}</span>
                      <span className="font-semibold text-red-700">-{besoin.quantite}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {productionData.production.length > 0 && (
              <div>
                <h4 className="font-medium text-green-700 mb-2">Ressources produites</h4>
                <div className="space-y-2">
                  {productionData.production.map((prod, index) => (
                    <div key={index} className="flex justify-between bg-green-50 p-2 rounded border border-green-200">
                      <span className="text-green-700">{prod.ressource}</span>
                      <span className="font-semibold text-green-700">+{prod.quantite}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderRessourceDetails = () => {
    if (!selectedRessource) return null;

    return (
      <div className="space-y-6">
        <div className="resource-detail-header">
          <img
            src={`http://localhost:3000${selectedRessource.image}`}
            alt={selectedRessource.nom}
            className="resource-detail-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-resource.png';
            }}
          />
          <div className="resource-detail-info">
            <h3 className="resource-detail-name">{selectedRessource.nom}</h3>
            <div className="resource-detail-type">
              <span className="type-badge">{selectedRessource.type}</span>
            </div>
            {selectedRessource.description && (
              <p className="resource-detail-description">{selectedRessource.description}</p>
            )}
          </div>
        </div>

        <div className="resource-detail-prices">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Prix</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="price-card buy">
              <div className="price-card-header">
                <span className="price-card-icon">💰</span>
                <span className="price-card-title">Prix d'achat</span>
              </div>
              <div className="price-card-value">{selectedRessource.prixAchat} pièces</div>
            </div>
            <div className="price-card sell">
              <div className="price-card-header">
                <span className="price-card-icon">💸</span>
                <span className="price-card-title">Prix de vente</span>
              </div>
              <div className="price-card-value">{selectedRessource.prixVente} pièces</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">CATALOGUE</h2>
          <button className="modal-close-button" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="modal-content">
          {/* Onglets */}
          <div className="tabs-container">
            <button
              className={`tab-button ${activeTab === 'batiments' ? 'active' : ''}`}
              onClick={() => setActiveTab('batiments')}
            >
              🏢 Bâtiments
            </button>
            <button
              className={`tab-button ${activeTab === 'ressources' ? 'active' : ''}`}
              onClick={() => setActiveTab('ressources')}
            >
              📦 Ressources
            </button>
          </div>

          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <span className="loading-text">Chargement du catalogue...</span>
            </div>
          )}
          
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button className="retry-button" onClick={loadData}>
                Réessayer
              </button>
            </div>
          )}
          
          {!loading && !error && (
            <>
              {activeTab === 'batiments' && (
                <BatimentsCarousel 
                  batiments={batiments}
                  onBatimentClick={handleBatimentClick}
                />
              )}
              {activeTab === 'ressources' && (
                <RessourcesCarousel 
                  ressourcesGrouped={ressourcesGrouped}
                  onRessourceClick={handleRessourceClick}
                />
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Modal de détail du bâtiment */}
      {selectedBatiment && (
        <div className="modal-overlay" onClick={() => setSelectedBatiment(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedBatiment.nom}</h2>
              <button className="modal-close-button" onClick={() => setSelectedBatiment(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="modal-content">
              <div className="space-y-6">
                {/* Informations de production */}
                {renderProductionInfo()}
                
                {/* Liste des niveaux */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Niveaux disponibles</h3>
                  <div className="space-y-4">
                    {selectedBatiment.niveaux.map((niveau, index) => 
                      renderNiveauDetails(niveau, index === 0)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de détail de la ressource */}
      {selectedRessource && (
        <div className="modal-overlay" onClick={() => setSelectedRessource(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedRessource.nom}</h2>
              <button className="modal-close-button" onClick={() => setSelectedRessource(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="modal-content">
              {renderRessourceDetails()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogueModal; 