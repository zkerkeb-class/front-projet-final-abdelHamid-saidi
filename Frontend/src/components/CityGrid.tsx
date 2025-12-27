import React, { useState, useEffect } from 'react';
import { batimentService, BatimentGrouped } from '../services/batimentService';
import BatimentsCarousel from './BatimentsCarousel';
import '../styles/CityGrid.css';

interface Tile {
  id: string;
  row: number;
  col: number;
  isHovered: boolean;
  isSelected: boolean;
  hasBuilding: boolean;
  buildingType?: string;
  buildingImage?: string;
  buildingName?: string;
}

interface CityGridProps {
  onTileClick?: (tile: Tile) => void;
  onTileHover?: (tile: Tile) => void;
  className?: string;
}

const CityGrid: React.FC<CityGridProps> = ({ 
  onTileClick, 
  onTileHover,
  className = ''
}) => {
  const [tiles, setTiles] = useState<Tile[]>(() => {
    const initialTiles: Tile[] = [];
    let tileId = 0;
    
    // Créer les 11 lignes en forme de losange
    for (let row = 0; row < 11; row++) {
      // Calculer le nombre de cases pour cette ligne
      let casesInRow: number;
      if (row < 6) {
        // Montée : 1, 2, 3, 4, 5, 6
        casesInRow = row + 1;
      } else {
        // Descente : 5, 4, 3, 2, 1
        casesInRow = 11 - row;
      }
      
      for (let col = 0; col < casesInRow; col++) {
        initialTiles.push({
          id: `tile-${tileId}`,
          row,
          col,
          isHovered: false,
          isSelected: false,
          hasBuilding: false
        });
        tileId++;
      }
    }
    return initialTiles;
  });

  // États pour le modal de sélection de bâtiments
  const [showBuildingModal, setShowBuildingModal] = useState(false);
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [batiments, setBatiments] = useState<BatimentGrouped[]>([]);
  const [loadingBatiments, setLoadingBatiments] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour ajouter deux bâtiments aléatoires (sans API)
  const ajouterBatimentsAleatoires = () => {
    // Bâtiments statiques disponibles
    const batimentsDisponibles: BatimentGrouped[] = [
      {
        nom: 'Bureau',
        niveaux: [],
        image: 'http://localhost:3000/images/batiments/bureau/1.png',
        description: 'Bureau de base pour la gestion'
      },
      {
        nom: 'Usine',
        niveaux: [],
        image: 'http://localhost:3000/images/batiments/usine/1.png',
        description: 'Usine de production basique'
      },
      {
        nom: 'Épicerie',
        niveaux: [],
        image: 'http://localhost:3000/images/batiments/Epicerie/1.png',
        description: 'Épicerie de base pour le commerce'
      },
      {
        nom: 'Centrale',
        niveaux: [],
        image: 'http://localhost:3000/images/batiments/centrale/1.png',
        description: 'Centrale électrique'
      }
    ];

    // Sélectionner deux bâtiments aléatoires
    const batimentsAleatoires: BatimentGrouped[] = [];
    const indicesUtilises = new Set<number>();
    
    while (batimentsAleatoires.length < 2) {
      const indexAleatoire = Math.floor(Math.random() * batimentsDisponibles.length);
      if (!indicesUtilises.has(indexAleatoire)) {
        indicesUtilises.add(indexAleatoire);
        batimentsAleatoires.push(batimentsDisponibles[indexAleatoire]);
      }
    }

    // Positions précises pour les deux bâtiments
    const positions = [
      { row: 3, col: 1 }, // Position centrale gauche
      { row: 3, col: 2 }  // Position centrale droite
    ];

    // Mettre à jour les tiles avec les bâtiments aléatoires
    setTiles(prevTiles => 
      prevTiles.map(tile => {
        const positionIndex = positions.findIndex(pos => pos.row === tile.row && pos.col === tile.col);
        if (positionIndex !== -1 && batimentsAleatoires[positionIndex]) {
          const batiment = batimentsAleatoires[positionIndex];
          return {
            ...tile,
            hasBuilding: true,
            buildingType: batiment.nom,
            buildingImage: batiment.image,
            buildingName: batiment.nom
          };
        }
        return tile;
      })
    );

    console.log('Deux bâtiments aléatoires ajoutés:', batimentsAleatoires.map(b => b.nom));
  };

  // Appeler la fonction au chargement du composant
  useEffect(() => {
    ajouterBatimentsAleatoires();
  }, []);

  const loadBatiments = async () => {
    setLoadingBatiments(true);
    setError(null);
    try {
      const data = await batimentService.getAllBatimentsGrouped();
      setBatiments(data);
    } catch (err) {
      console.error('Erreur lors du chargement des bâtiments:', err);
      setError('Erreur lors du chargement des bâtiments');
    } finally {
      setLoadingBatiments(false);
    }
  };

  const handleTileClick = (tile: Tile) => {
    setSelectedTile(tile);
    setShowBuildingModal(true);
    loadBatiments();
    
    // Callback personnalisé
    onTileClick?.(tile);
  };

  const handleBuildingSelect = (batiment: BatimentGrouped) => {
    if (selectedTile) {
      // Mettre à jour la case avec le bâtiment sélectionné
      setTiles(prevTiles => 
        prevTiles.map(t => 
          t.id === selectedTile.id 
            ? { 
                ...t, 
                hasBuilding: true, 
                buildingType: batiment.nom,
                buildingImage: batiment.image,
                buildingName: batiment.nom,
                isSelected: false 
              }
            : t
        )
      );
    }
    setShowBuildingModal(false);
    setSelectedTile(null);
  };

  const handleCloseModal = () => {
    setShowBuildingModal(false);
    setSelectedTile(null);
  };

  const handleTileHover = (tile: Tile, isHovered: boolean) => {
    setTiles(prevTiles => 
      prevTiles.map(t => 
        t.id === tile.id 
          ? { ...t, isHovered }
          : t
      )
    );
    onTileHover?.({ ...tile, isHovered });
  };

  // Grouper les tiles par ligne
  const tilesByRow = tiles.reduce((acc, tile) => {
    if (!acc[tile.row]) {
      acc[tile.row] = [];
    }
    acc[tile.row].push(tile);
    return acc;
  }, {} as Record<number, Tile[]>);

  return (
    <>
      <div className={`city-grid-container ${className}`}>
        <div className="city-grid">
          {Object.entries(tilesByRow).map(([rowStr, rowTiles]) => (
            <div key={rowStr} className="city-grid-row">
              {rowTiles.map((tile) => (
                <div
                  key={tile.id}
                  id={tile.id}
                  data-position={`${tile.row},${tile.col}`}
                  className={`city-tile ${
                    tile.isHovered ? 'hovered' : ''
                  } ${
                    tile.isSelected ? 'selected' : ''
                  } ${
                    tile.hasBuilding ? 'has-building' : ''
                  }`}
                  onClick={() => handleTileClick(tile)}
                  onMouseEnter={() => handleTileHover(tile, true)}
                  onMouseLeave={() => handleTileHover(tile, false)}
                >
                  <div className="tile-content">
                    {tile.hasBuilding && tile.buildingImage && (
                      <div className="building-display">
                        <div className="building-title">{tile.buildingName}</div>
                        <div className="building-image-container">
                          <img 
                            src={tile.buildingImage}
                            alt={tile.buildingName}
                            className="building-image"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-building.png';
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <span className="tile-coordinates">
                      {tile.row},{tile.col}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de sélection de bâtiments - EXACTEMENT comme Catalogue */}
      {showBuildingModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">SÉLECTIONNER UN BÂTIMENT</h2>
              <button className="modal-close-button" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="modal-content">
              {loadingBatiments && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span className="loading-text">Chargement des bâtiments...</span>
                </div>
              )}
              
              {error && (
                <div className="error-container">
                  <p className="error-message">{error}</p>
                  <button className="retry-button" onClick={loadBatiments}>
                    Réessayer
                  </button>
                </div>
              )}
              
              {!loadingBatiments && !error && (
                <BatimentsCarousel 
                  batiments={batiments}
                  onBatimentClick={handleBuildingSelect}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CityGrid; 