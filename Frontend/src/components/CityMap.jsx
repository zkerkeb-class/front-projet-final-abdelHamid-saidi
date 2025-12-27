import React from 'react';

// Utilisation unique de Terrain-8.png
import centrale from '../assets/Terrain-8.png';

// Grille 3x3 pour exemple
const buildings = [
  { name: 'BUREAU', x: 1, y: 0 },
  { name: 'CENTRALE', x: 1, y: 1 },
  { name: 'DÉPÔT', x: 2, y: 1 },
];

export default function CityMap() {
  return (
    <div className="relative w-full max-w-2xl h-[420px] mx-auto bg-gradient-to-br from-green-200 to-green-400 rounded-3xl shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden">
      {/* Décor arbres */}
      <div className="absolute left-8 top-8 w-8 h-8 bg-green-700 rounded-full opacity-60 z-0"></div>
      <div className="absolute right-12 bottom-10 w-10 h-10 bg-green-800 rounded-full opacity-70 z-0"></div>
      <div className="absolute left-1/2 top-2 w-6 h-6 bg-green-600 rounded-full opacity-50 z-0"></div>
      {/* Routes */}
      <div className="absolute left-1/2 top-0 w-6 h-full bg-gray-300 rounded-full z-0" style={{transform: 'translateX(-50%)'}}></div>
      <div className="absolute top-1/2 left-0 h-6 w-full bg-gray-300 rounded-full z-0" style={{transform: 'translateY(-50%)'}}></div>
      {/* Grille de bâtiments */}
      {buildings.map((b, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center group"
          style={{
            left: `calc(28% * ${b.x} + 10%)`,
            top: `calc(32% * ${b.y} + 12%)`,
            width: 100,
            height: 100,
            zIndex: 2,
          }}
        >
          {/* Case de fond */}
          <div className="absolute w-24 h-24 bg-white/70 rounded-2xl shadow-2xl -z-10"></div>
          {/* Image bâtiment */}
          <img
            src={centrale}
            alt={b.name}
            className="w-24 h-24 object-contain drop-shadow-2xl border-2 border-white rounded-2xl transition-transform duration-200 group-hover:scale-110 group-hover:shadow-2xl"
          />
          {/* Nom du bâtiment */}
          <span className="mt-2 text-xs font-bold text-[#2C3E50] bg-white/90 px-3 py-1 rounded-xl shadow-lg border border-gray-100">{b.name}</span>
        </div>
      ))}
    </div>
  );
} 