import React, { useState } from 'react';
import '../styles/Header.css';
import ProfileModal from './modals/ProfileModal';
import { useJoueur } from '../hooks/useJoueur';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { joueurData, joueurStats, loading, error, refreshJoueurData } = useJoueur();

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Rafraîchir les données après fermeture du modal
    refreshJoueurData();
  };

  // Fonction pour formater le patrimoine avec des virgules
  const formatPatrimoine = (patrimoine: number) => {
    return patrimoine.toLocaleString('fr-FR');
  };

  // Fonction pour générer un ID unique basé sur le pseudo
  const generatePlayerId = (pseudo: string) => {
    const hash = pseudo.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return `${pseudo}#${Math.abs(hash).toString(16).toUpperCase().slice(0, 6)}`;
  };

  if (loading) {
    return (
      <header className="game-header">
        <div className="button-30 header-button">
          <div className="gh-profile__avatar skeleton-avatar"></div>
          <div className="gh-profile__info">
            <div className="gh-profile__name skeleton-text"></div>
            
          </div>
        </div>
        <div className="gh-resources">
          <div className="gh-resource header-button">
            <span className="gh-resource__icon">
              <svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/><circle cx="12" cy="12" r="6" fill="#FFFDE7" stroke="#FFD700" strokeWidth="1"/></svg>
            </span>
            <span className="gh-resource__value skeleton-text"></span>
          </div>
          <div className="gh-resource header-button">
            <span className="gh-resource__icon">
              <svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/></svg>
            </span>
          </div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="game-header">
        <div className="error-message">
          Erreur de chargement: {error}
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="game-header">
        {/* Profil joueur */}
        <div className="button-30 header-button" onClick={handleProfileClick}>
          <img
            src="http://localhost:3000/images/avatars/hamid.png"
            alt="Avatar"
            className="gh-profile__avatar"
          />
          <div className="gh-profile__info">
            <div className="gh-profile__name">
              {joueurData ? generatePlayerId(joueurData.pseudo) : 'Chargement...'}
            </div>
             
          </div>
        </div>

        {/* Ressources */}
        <div className="gh-resources">
          {/* BizCoin */}
          <div className="gh-resource header-button">
            <span className="gh-resource__icon">
              {/* Icône pièce */}
              <svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/><circle cx="12" cy="12" r="6" fill="#FFFDE7" stroke="#FFD700" strokeWidth="1"/></svg>
            </span>
            <span className="gh-resource__value">
              {joueurData ? formatPatrimoine(joueurData.patrimoine) : '0'}
            </span>
          </div> 
        </div>
      </header>

      {/* Modal du profil */}
      <ProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header; 

