import React, { useState } from 'react';
import '../../styles/ProfileModal.css';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerData, setPlayerData] = useState({
    username: 'Olga#1G5FH86',
    level: 37,
    experience: 70,
    coins: 144766,
    diamonds: 2429,
    email: 'olga@example.com',
    joinDate: '15 Janvier 2024',
    totalPlayTime: '156h 23m',
    achievements: 24,
    rank: 'Gold',
    energy: 85,
    maxEnergy: 100,
    population: 1200,
    maxPopulation: 1500
  });

  const [formData, setFormData] = useState(playerData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setPlayerData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(playerData);
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header style Clash of Clans */}
        <div className="modal-header">
          <div className="header-decoration">
            <div className="header-gems">
              <div className="gem gem-red"></div>
              <div className="gem gem-blue"></div>
              <div className="gem gem-green"></div>
            </div>
            <div className="header-title">
              <h2>PROFIL DU JOUEUR</h2>
            </div>
            <div className="header-gems">
              <div className="gem gem-green"></div>
              <div className="gem gem-blue"></div>
              <div className="gem gem-red"></div>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
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
                <div className="level-badge">
                  <span>{playerData.level}</span>
                </div>
              </div>
              {isEditing && (
                <button className="avatar-edit-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              )}
            </div>

            <div className="hero-info">
              <div className="username-section">
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="username-input"
                    placeholder="Nom d'utilisateur"
                  />
                ) : (
                  <h1 className="username">{playerData.username}</h1>
                )}
                <div className="rank-badge">
                  <div className="rank-icon">👑</div>
                  <span>{playerData.rank}</span>
                </div>
              </div>

              <div className="xp-section">
                <div className="xp-info">
                  <span className="xp-label">EXPÉRIENCE</span>
                  <span className="xp-percentage">{playerData.experience}%</span>
                </div>
                <div className="xp-bar">
                  <div className="xp-bar-bg">
                    <div 
                      className="xp-fill" 
                      style={{ width: `${playerData.experience}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Statistiques */}
          <div className="stats-section">
            <div className="section-header">
              <div className="section-icon">💰</div>
              <h3>RESSOURCES</h3>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card coins-card">
                <div className="stat-icon">
                  <div className="coin-icon">🪙</div>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{playerData.coins.toLocaleString()}</span>
                  <span className="stat-label">PIÈCES</span>
                </div>
              </div>

              <div className="stat-card gems-card">
                <div className="stat-icon">
                  <div className="gem-icon">💎</div>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{playerData.diamonds.toLocaleString()}</span>
                  <span className="stat-label">DIAMANTS</span>
                </div>
              </div>

              <div className="stat-card achievements-card">
                <div className="stat-icon">
                  <div className="trophy-icon">🏆</div>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{playerData.achievements}</span>
                  <span className="stat-label">SUCCÈS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Jauges */}
          <div className="gauges-section">
            <div className="section-header">
              <div className="section-icon">⚡</div>
              <h3>JAUGE</h3>
            </div>
            
            <div className="gauges-grid">
              <div className="gauge-card energy-card">
                <div className="gauge-header">
                  <div className="gauge-icon">
                    <div className="energy-icon">⚡</div>
                  </div>
                  <span className="gauge-label">ÉNERGIE</span>
                  <span className="gauge-value">{playerData.energy}/{playerData.maxEnergy}</span>
                </div>
                <div className="gauge-bar">
                  <div className="gauge-bg">
                    <div 
                      className="gauge-fill energy-fill" 
                      style={{ width: `${(playerData.energy / playerData.maxEnergy) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="gauge-card population-card">
                <div className="gauge-header">
                  <div className="gauge-icon">
                    <div className="population-icon">👥</div>
                  </div>
                  <span className="gauge-label">POPULATION</span>
                  <span className="gauge-value">{playerData.population}/{playerData.maxPopulation}</span>
                </div>
                <div className="gauge-bar">
                  <div className="gauge-bg">
                    <div 
                      className="gauge-fill population-fill" 
                      style={{ width: `${(playerData.population / playerData.maxPopulation) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Informations détaillées */}
          <div className="details-section">
            <div className="section-header">
              <div className="section-icon">📋</div>
              <h3>INFORMATIONS</h3>
            </div>
            
            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-icon">
                  <div className="email-icon">📧</div>
                </div>
                <div className="detail-content">
                  <span className="detail-label">EMAIL</span>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="detail-input"
                      placeholder="Email"
                    />
                  ) : (
                    <span className="detail-value">{playerData.email}</span>
                  )}
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <div className="calendar-icon">📅</div>
                </div>
                <div className="detail-content">
                  <span className="detail-label">INSCRIPTION</span>
                  <span className="detail-value">{playerData.joinDate}</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <div className="clock-icon">⏰</div>
                </div>
                <div className="detail-content">
                  <span className="detail-label">TEMPS DE JEU</span>
                  <span className="detail-value">{playerData.totalPlayTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Actions */}
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
                <button className="btn btn-secondary">
                  <div className="btn-icon">📊</div>
                  STATISTIQUES
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