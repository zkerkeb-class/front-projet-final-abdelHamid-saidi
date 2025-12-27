import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { RessourceGrouped, Ressource } from '../services/ressourceService';
import CardImage from './CardImage';
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
        spaceBetween={15}
        slidesPerView={4}
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
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1600: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
        className="ressources-swiper"
        watchSlidesProgress={true}
      >
        {allRessources.map((ressource) => (
          <SwiperSlide key={ressource._id}>
            <div
              className="resource-card uniform-size"
              onClick={() => onRessourceClick(ressource)}
            >
              <div className="card-content">
                <CardImage
                  src={`http://localhost:3000${ressource.image}`}
                  alt={ressource.nom}
                  fallbackSrc="/placeholder-resource.png"
                  aspectRatio="square"
                  showShimmer={true}
                  onLoad={() => console.log(`Image chargée: ${ressource.nom}`)}
                  onError={() => console.log(`Erreur de chargement: ${ressource.nom}`)}
                />
                
                <div className="card-info">
                  <h3 className="card-title">{ressource.nom}</h3>
                  {ressource.description && (
                    <p className="card-description">{ressource.description}</p>
                  )}
                  
                  <div className="card-quantity">
                    <span className="quantity-label">Quantité</span>
                    <span className="quantity-value">
                      {Math.floor(Math.random() * 1000) + 100} unités
                    </span>
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