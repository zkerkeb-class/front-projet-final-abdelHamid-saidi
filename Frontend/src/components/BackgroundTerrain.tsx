import React, { useState, useEffect } from 'react';

// Positions fixes prédéfinies pour les arbres - partie centrale dégagée
const FIXED_TREE_POSITIONS = [
  // Coin supérieur gauche - arbres plus petits pour la profondeur
  { top: 10, left: 30, size: 48, opacity: 0.8 },
  { top: 13, left: 18, size: 56, opacity: 0.8 },
  { top: 8, left: 42, size: 40, opacity: 0.8 },
  { top: 5, left: 25, size: 44, opacity: 0.8 },
  
  // Coin supérieur droit - arbres de taille moyenne
  { top: 20, left: 82, size: 64, opacity: 0.8 },
  { top: 15, left: 78, size: 52, opacity: 0.8 },
  { top: 10, left: 65, size: 44, opacity: 0.8 },
  { top: 5, left: 75, size: 48, opacity: 0.8 },
  
  // Côté gauche - arbres variés
  { top: 30, left: 12, size: 72, opacity: 0.8 },
  { top: 45, left: 8, size: 60, opacity: 0.8 },
  { top: 60, left: 15, size: 68, opacity: 0.8 },
  { top: 75, left: 10, size: 56, opacity: 0.8 },
  { top: 25, left: 5, size: 64, opacity: 0.8 },
  { top: 55, left: 8, size: 52, opacity: 0.8 },
  
  // Côté droit - arbres plus grands
  { top: 35, left: 85, size: 80, opacity: 0.8 },
  { top: 50, left: 88, size: 64, opacity: 0.8 },
  { top: 65, left: 82, size: 76, opacity: 0.8 },
  { top: 80, left: 85, size: 60, opacity: 0.8 },
  { top: 20, left: 92, size: 72, opacity: 0.8 },
  { top: 50, left: 92, size: 76, opacity: 0.8 },
  
  // Coin inférieur gauche - arbres moyens
  { top: 80, left: 19, size: 52, opacity: 0.8 },
  { top: 88, left: 28, size: 48, opacity: 0.8 },
  { top: 85, left: 15, size: 56, opacity: 0.8 },
  
  // Coin inférieur droit - arbres plus petits
  { top: 82, left: 82, size: 44, opacity: 0.8 },
  { top: 88, left: 68, size: 40, opacity: 0.8 },
  { top: 85, left: 75, size: 48, opacity: 0.8 },
  
  // Arbres supplémentaires sur les bords
  { top: 3, left: 40, size: 36, opacity: 0.8 },
  { top: 7, left: 70, size: 44, opacity: 0.8 },
  { top: 95, left: 50, size: 44, opacity: 0.8 },
  { top: 93, left: 80, size: 52, opacity: 0.8 }
];

// Positions fixes prédéfinies pour les pierres
const FIXED_STONE_POSITIONS = [
  // Pierres dans les coins - petites pierres
  { top: 12, left: 22, size: 24, opacity: 0.8 },
  { top: 18, left: 35, size: 20, opacity: 0.8 },
  { top: 22, left: 70, size: 28, opacity: 0.8 },
  { top: 16, left: 85, size: 32, opacity: 0.8 },
  
  // Pierres sur les côtés - tailles variées
  { top: 35, left: 18, size: 36, opacity: 0.8 },
  { top: 65, left: 20, size: 40, opacity: 0.8 },
  { top: 40, left: 82, size: 32, opacity: 0.8 },
  { top: 70, left: 85, size: 36, opacity: 0.8 },
  
  // Pierres dans les coins inférieurs
  { top: 82, left: 25, size: 20, opacity: 0.8 },
  { top: 85, left: 75, size: 32, opacity: 0.8 },
  
  // Pierres éparses sur le terrain
  { top: 45, left: 60, size: 20, opacity: 0.8 },
  { top: 60, left: 40, size: 24, opacity: 0.8 }
];

const BackgroundTerrain: React.FC = () => {
  const [treePositions, setTreePositions] = useState(FIXED_TREE_POSITIONS);
  const [stonePositions, setStonePositions] = useState(FIXED_STONE_POSITIONS);

  // Utilise les positions fixes dès le premier rendu
  useEffect(() => {
    setTreePositions(FIXED_TREE_POSITIONS);
    setStonePositions(FIXED_STONE_POSITIONS);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <img src="/fond-terrain-Sorra.png" alt="Fond de terrain" className="w-full h-full object-cover" />
      
      {/* Arbres */}
      {treePositions.map((pos, i) => (
        <img
          key={`tree-${i}`}
          src="/arbre2.png"
          alt="Arbre décoratif"
          style={{
            position: 'absolute',
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            width: `${pos.size}px`,
            height: 'auto',
            pointerEvents: 'none',
            zIndex: 1,
            userSelect: 'none',
            opacity: '0.75',
            filter: `drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3))`,
            transform: `translate(-50%, -50%)`,
            transition: 'opacity 0.3s ease'
          }}
          draggable={false}
        />
      ))}
      
      {/* Pierres */}
      {stonePositions.map((pos, i) => (
        <img
          key={`stone-${i}`}
          src="/pierre.png"
          alt="Pierre décorative"
          style={{
            position: 'absolute',
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            width: `${pos.size}px`,
            height: 'auto',
            pointerEvents: 'none',
            zIndex: 0,
            userSelect: 'none',
            opacity: pos.opacity,
            filter: `drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4))`,
            transform: `translate(-50%, -50%)`,
            transition: 'opacity 0.3s ease'
          }}
          draggable={false}
        />
      ))}
    </div>
  );
};

export default BackgroundTerrain; 