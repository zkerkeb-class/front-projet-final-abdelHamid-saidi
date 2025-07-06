import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import '../../styles/ProfileModal.css';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState({
    pseudo: '',
    email: '',
    patrimoine: 0,
    classement: 0
  });

  const [formData, setFormData] = useState(playerData);

  useEffect(() => {
    // Récupérer les vraies données du joueur connecté
    const currentJoueur = authService.getCurrentJoueur();
    if (currentJoueur) {
      setPlayerData({
        pseudo: currentJoueur.pseudo,
        email: currentJoueur.email,
        patrimoine: currentJoueur.patrimoine,
        classement: currentJoueur.classement
      });
      setFormData({
        pseudo: currentJoueur.pseudo,
        email: currentJoueur.email,
        patrimoine: currentJoueur.patrimoine,
        classement: currentJoueur.classement
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await authService.updateProfile({
        pseudo: formData.pseudo,
        email: formData.email
      });
      setPlayerData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleCancel = () => {
    setFormData(playerData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    authService.logout();
    onClose();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      // TODO: Implémenter la suppression de compte
      console.log('Suppression de compte');
      authService.logout();
      onClose();
      navigate('/login');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header moderne */}
        <div className="modal-header">
          <div className="header-content">
            <div className="header-title">
              <h2>PROFIL DU JOUEUR</h2>
            </div>
            <button className="close-button" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="modal-content">
          {/* Section Avatar et Info principale */}
          <div className="profile-hero">
            <div className="avatar-container">
              <div className="avatar-frame">
                <div className="avatar-border">
                  <img
                    src="http://localhost:3000/images/avatars/hamid.png"
                    alt="Avatar du joueur"
                    className="profile-avatar"
                  />
                </div>
              </div>
            </div>

            <div className="hero-info">
              <div className="username-section">
                {isEditing ? (
                  <input
                    type="text"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={handleInputChange}
                    className="username-input"
                    placeholder="Nom d'utilisateur"
                  />
                ) : (
                  <h1 className="username">{playerData.pseudo}</h1>
                )}
              </div>

              {/* Email à côté de l'image */}
              <div className="email-section-inline">
                <div className="email-content-inline">
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="email-input-inline"
                      placeholder="Email"
                    />
                  ) : (
                    <span className="email-value-inline">{playerData.email}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section INFO avec patrimoine et classement */}
          <div className="info-section">
            <div className="section-header">
              <div className="section-icon">ℹ️</div>
              <h3>INFO</h3>
            </div>
            
            <div className="info-grid">
              <div className="info-card patrimoine-card">
                <div className="info-icon">
                  <div className="patrimoine-icon">💰</div>
                </div>
                <div className="info-content">
                  <span className="info-value">{playerData.patrimoine.toLocaleString()}</span>
                  <span className="info-label">PATRIMOINE</span>
                </div>
              </div>

              <div className="info-card classement-card">
                <div className="info-icon">
                  <div className="classement-icon">🏆</div>
                </div>
                <div className="info-content">
                  <span className="info-value">#{playerData.classement}</span>
                  <span className="info-label">CLASSEMENT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Actions - Trois boutons alignés */}
          <div className="actions-section">
            {isEditing ? (
              <div className="edit-actions">
                <button className="btn btn-save" onClick={handleSave}>
                  <div className="btn-icon">✅</div>
                  SAUVEGARDER
                </button>
                <button className="btn btn-cancel" onClick={handleCancel}>
                  <div className="btn-icon">❌</div>
                  ANNULER
                </button>
              </div>
            ) : (
              <div className="view-actions">
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  <div className="btn-icon">✏️</div>
                  MODIFIER
                </button>
                <button className="btn btn-logout" onClick={handleLogout}>
                  <div className="btn-icon">🚪</div>
                  DÉCONNEXION
                </button>
                <button className="btn btn-delete" onClick={handleDeleteAccount}>
                  <div className="btn-icon">🗑️</div>
                  SUPPRIMER
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal; 