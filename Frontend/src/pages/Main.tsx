import React from 'react';
import Header from '../components/Header';
import BackgroundTerrain from '../components/BackgroundTerrain';

export default function Main() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'none' }}>
      {/* Header fixe */}
      <Header />

      {/* Contenu principal avec padding pour le header */}
      <div className="pt-16">
        <BackgroundTerrain />
      </div>
    </div>
  );
}
