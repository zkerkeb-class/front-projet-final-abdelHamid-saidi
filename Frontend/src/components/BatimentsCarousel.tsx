import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { BatimentGrouped } from '../services/batimentService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Modals.css';

interface BatimentsCarouselProps {
  batiments: BatimentGrouped[];
  onBatimentClick: (batiment: BatimentGrouped) => void;
}

const BatimentsCarousel: React.FC<BatimentsCarouselProps> = ({ batiments, onBatimentClick }) => {
  if (batiments.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-500">Aucun bâtiment disponible</p>
      </div>
    );
  }

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
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
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="batiments-swiper"
      >
        {batiments.map((batiment) => (
          <SwiperSlide key={batiment.nom}>
            <div
              className="batiment-card uniform-size"
              onClick={() => onBatimentClick(batiment)}
            >
              <div className="card-content">
                <div className="card-image-container">
                  <img
                    src={batiment.image}
                    alt={batiment.nom}
                    className="card-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-building.png';
                    }}
                  />
                </div>
                <div className="card-info">
                  <h3 className="card-title">{batiment.nom}</h3>
                  <p className="card-description">
                    {batiment.niveaux.length} niveau{batiment.niveaux.length > 1 ? 'x' : ''}
                  </p>
                  <div className="level-indicators">
                    {batiment.niveaux.map((niveau, index) => (
                      <div
                        key={niveau._id}
                        className={`level-indicator ${
                          index === 0 ? 'available' : 'unavailable'
                        }`}
                        title={`Niveau ${niveau.niveau}`}
                      />
                    ))}
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

export default BatimentsCarousel; 