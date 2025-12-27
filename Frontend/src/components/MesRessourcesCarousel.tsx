import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import CardImage from './CardImage';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Modals.css';

interface Ressource {
  id: string;
  nom: string;
  description: string;
  image: string;
  quantite: number;
  unite: string;
}

interface MesRessourcesCarouselProps {
  onRessourceClick?: (ressource: Ressource) => void;
}

const MesRessourcesCarousel: React.FC<MesRessourcesCarouselProps> = ({ onRessourceClick }) => {
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

  if (ressources.length === 0) {
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
        className="mes-ressources-swiper"
        watchSlidesProgress={true}
      >
        {ressources.map((ressource) => (
          <SwiperSlide key={ressource.id}>
            <div
              className="resource-card uniform-size"
              onClick={() => onRessourceClick?.(ressource)}
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
                  <p className="card-description">{ressource.description}</p>
                  
                  <div className="card-quantity">
                    <span className="quantity-label">Quantité</span>
                    <span className="quantity-value">
                      {ressource.quantite.toLocaleString()} {ressource.unite}
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

export default MesRessourcesCarousel; 