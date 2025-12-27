import React from 'react';
import '../styles/NavigationButtons.css';

interface NavigationButtonsProps {
  activeView: 'carte' | 'batiment' | 'ressources' | 'catalogue';
  onViewChange: (view: 'carte' | 'batiment' | 'ressources' | 'catalogue') => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="navigation-buttons">
      <button
        onClick={() => onViewChange('carte')}
        className={`nav-button carte ${activeView === 'carte' ? 'active' : ''}`}
      >
        <img src="/images/menu/carte.png" alt="Carte" className="nav-button-icon" />
        <span className="nav-button-text">Carte</span>
      </button>
      
      <button
        onClick={() => onViewChange('batiment')}
        className={`nav-button batiment ${activeView === 'batiment' ? 'active' : ''}`}
      >
        <img src="/images/menu/batiments.png" alt="Bâtiments" className="nav-button-icon" />
        <span className="nav-button-text">Bâtiments</span>
      </button>
      
      <button
        onClick={() => onViewChange('ressources')}
        className={`nav-button ressources ${activeView === 'ressources' ? 'active' : ''}`}
      >
        <img src="/images/menu/resources.png" alt="Ressources" className="nav-button-icon" />
        <span className="nav-button-text">Ressources</span>
      </button>
      
      <button
        onClick={() => onViewChange('catalogue')}
        className={`nav-button catalogue ${activeView === 'catalogue' ? 'active' : ''}`}
      >
        <svg className="nav-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span className="nav-button-text">Catalogue</span>
      </button>
    </div>
  );
};

export default NavigationButtons; 