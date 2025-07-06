import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { RessourceGrouped, Ressource } from '../services/ressourceService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Modals.css';

interface RessourcesCarouselProps {
  ressourcesGrouped: RessourceGrouped[];
  onRessourceClick: (ressource: Ressource) => void;
}

const RessourcesCarousel: React.FC<RessourcesCarouselProps> = ({ 
  ressourcesGrouped, 
  onRessourceClick 
}) => {
  const allRessources = ressourcesGrouped.flatMap(group => group.ressources);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Énergie':
        return '⚡';
      case 'Matériaux':
        return '🔨';
      case 'Produits':
        return '📦';
      case 'Influence':
        return '👑';
      default:
        return '📋';
    }
  };

  if (allRessources.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-500">Aucune ressource disponible</p>
      </div>
    );
  }

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={60}
        slidesPerView={3}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          1600: {
            slidesPerView: 4,
            spaceBetween: 60,
          },
        }}
        className="ressources-swiper"
      >
        {allRessources.map((ressource) => (
          <SwiperSlide key={ressource._id}>
            <div
              className="resource-card uniform-size"
              onClick={() => onRessourceClick(ressource)}
            >
              <div className="card-content">
                <div className="card-image-container">
                  <img
                    src={`http://localhost:3000${ressource.image}`}
                    alt={ressource.nom}
                    className="card-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-resource.png';
                    }}
                  />
                </div>
                
                <div className="card-info">
                  <h3 className="card-title">{ressource.nom}</h3>
                  <div className="type-badge-small">
                    <span className="type-icon">{getTypeIcon(ressource.type)}</span>
                    <span className="type-text">{ressource.type}</span>
                  </div>
                  {ressource.description && (
                    <p className="card-description">{ressource.description}</p>
                  )}
                  
                  <div className="resource-prices">
                    <div className="price-item">
                      <span className="price-label">Achat:</span>
                      <span className="price-value buy">{ressource.prixAchat} pièces</span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Vente:</span>
                      <span className="price-value sell">{ressource.prixVente} pièces</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation buttons */}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      
      {/* Pagination */}
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default RessourcesCarousel; 