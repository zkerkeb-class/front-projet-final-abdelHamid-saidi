import React from 'react';
import '../styles/Modals.css';

interface Ressource {
  id: string;
  nom: string;
  description: string;
  image: string;
  quantite: number;
  unite: string;
}

const ressources: Ressource[] = [
  {
    id: 'bois',
    nom: 'Bois',
    description: 'Matière première essentielle pour la construction de bâtiments et d\'objets.',
    image: '/arbre1.png',
    quantite: 1250,
    unite: 'unités'
  },
  {
    id: 'pierre',
    nom: 'Pierre',
    description: 'Matériau de construction solide utilisé pour les fondations et les structures.',
    image: '/pierre.png',
    quantite: 850,
    unite: 'unités'
  },
  {
    id: 'fer',
    nom: 'Fer',
    description: 'Métal précieux utilisé pour les outils et les constructions avancées.',
    image: '/pierre.png',
    quantite: 320,
    unite: 'unités'
  },
  {
    id: 'or',
    nom: 'Or',
    description: 'Métal précieux rare utilisé pour les améliorations de haut niveau.',
    image: '/pierre.png',
    quantite: 45,
    unite: 'unités'
  },
  {
    id: 'electricite',
    nom: 'Électricité',
    description: 'Énergie nécessaire au fonctionnement des bâtiments modernes.',
    image: '/pierre.png',
    quantite: 150,
    unite: 'kW/h'
  },
  {
    id: 'eau',
    nom: 'Eau',
    description: 'Ressource vitale pour la population et les processus industriels.',
    image: '/pierre.png',
    quantite: 200,
    unite: 'litres'
  },
  {
    id: 'nourriture',
    nom: 'Nourriture',
    description: 'Alimentation nécessaire pour maintenir la population en bonne santé.',
    image: '/pierre.png',
    quantite: 180,
    unite: 'unités'
  },
  {
    id: 'produits',
    nom: 'Produits',
    description: 'Biens manufacturés produits par les usines pour la consommation.',
    image: '/pierre.png',
    quantite: 95,
    unite: 'unités'
  },
  {
    id: 'revenus',
    nom: 'Revenus',
    description: 'Monnaie générée par les activités commerciales et industrielles.',
    image: '/pierre.png',
    quantite: 1250,
    unite: 'pièces'
  }
];

interface RessourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RessourcesModal: React.FC<RessourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">RESSOURCES</h2>
          <button className="modal-close-button" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="resources-grid">
            {ressources.map((ressource) => (
              <div key={ressource.id} className="resource-card">
                <div className="card-header">
                  <img
                    src={ressource.image}
                    alt={ressource.nom}
                    className="card-image"
                  />
                  <div>
                    <h3 className="card-title">{ressource.nom}</h3>
                    <p className="card-description">{ressource.description}</p>
                  </div>
                </div>
                
                <div className="card-quantity">
                  <span className="quantity-label">Quantité</span>
                  <span className="quantity-value">
                    {ressource.quantite.toLocaleString()} {ressource.unite}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="tips-section">
            <h3 className="tips-title">
              <span>💡</span>
              Conseils de gestion
            </h3>
            <ul className="tips-list">
              <li>Équilibrez vos ressources pour éviter les pénuries</li>
              <li>Construisez des centrales électriques pour alimenter vos bâtiments</li>
              <li>Améliorez vos bâtiments pour augmenter la production</li>
              <li>Surveillez vos stocks régulièrement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RessourcesModal; 