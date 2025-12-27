import React, { useState } from 'react';
import Header from '../components/Header';
import BackgroundTerrain from '../components/BackgroundTerrain';
import NavigationButtons from '../components/NavigationButtons';
import BatimentsModal from '../components/BatimentsModal';
import RessourcesModal from '../components/RessourcesModal';
import CatalogueModal from '../components/CatalogueModal';
import CityGrid from '../components/CityGrid';

export default function Main() {
  const [activeView, setActiveView] = useState<'carte' | 'batiment' | 'ressources' | 'catalogue'>('carte');
  const [isBatimentsModalOpen, setIsBatimentsModalOpen] = useState(false);
  const [isRessourcesModalOpen, setIsRessourcesModalOpen] = useState(false);
  const [isCatalogueModalOpen, setIsCatalogueModalOpen] = useState(false);

  const handleViewChange = (view: 'carte' | 'batiment' | 'ressources' | 'catalogue') => {
    setActiveView(view);
    
    if (view === 'batiment') {
      setIsBatimentsModalOpen(true);
      setIsRessourcesModalOpen(false);
      setIsCatalogueModalOpen(false);
    } else if (view === 'ressources') {
      setIsRessourcesModalOpen(true);
      setIsBatimentsModalOpen(false);
      setIsCatalogueModalOpen(false);
    } else if (view === 'catalogue') {
      setIsCatalogueModalOpen(true);
      setIsBatimentsModalOpen(false);
      setIsRessourcesModalOpen(false);
    } else {
      setIsBatimentsModalOpen(false);
      setIsRessourcesModalOpen(false);
      setIsCatalogueModalOpen(false);
    }
  };

  const handleCityTileClick = (tile: any) => {
    console.log('Case de ville cliquée:', tile);
    // Ici vous pouvez ajouter la logique pour construire des bâtiments
  };

  const handleCityTileHover = (tile: any) => {
    console.log('Case de ville survolée:', tile);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'none' }}>
      {/* Header fixe */}
      <Header />

      {/* Contenu principal avec padding pour le header */}
      <div className="pt-16">
        <BackgroundTerrain />
      </div>

      {/* Grille de ville isométrique - centrée sur la page */}
      <CityGrid 
        onTileClick={handleCityTileClick}
        onTileHover={handleCityTileHover}
      />

      {/* Boutons de navigation */}
      <NavigationButtons 
        activeView={activeView}
        onViewChange={handleViewChange}
      />

      {/* Modale des bâtiments possédés */}
      <BatimentsModal 
        isOpen={isBatimentsModalOpen}
        onClose={() => {
          setIsBatimentsModalOpen(false);
          setActiveView('carte');
        }}
      />

      {/* Modale des ressources */}
      <RessourcesModal 
        isOpen={isRessourcesModalOpen}
        onClose={() => {
          setIsRessourcesModalOpen(false);
          setActiveView('carte');
        }}
      />

      {/* Modale du catalogue */}
      <CatalogueModal 
        isOpen={isCatalogueModalOpen}
        onClose={() => {
          setIsCatalogueModalOpen(false);
          setActiveView('carte');
        }}
      />
    </div>
  );
}
