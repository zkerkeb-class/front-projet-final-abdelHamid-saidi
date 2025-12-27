import React, { useState } from 'react';

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  showShimmer?: boolean;
  aspectRatio?: 'square' | '16/9' | '4/3' | 'custom';
  customAspectRatio?: string;
}

const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = '/placeholder-image.png',
  loading = 'lazy',
  onLoad,
  onError,
  showShimmer = true,
  aspectRatio = 'square',
  customAspectRatio
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    onLoad?.();
  };

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImageError(false);
    } else {
      setImageError(true);
    }
    onError?.();
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case '16/9':
        return 'aspect-video';
      case '4/3':
        return 'aspect-[4/3]';
      case 'custom':
        return '';
      default:
        return 'aspect-square';
    }
  };

  const getCustomAspectRatioStyle = () => {
    if (aspectRatio === 'custom' && customAspectRatio) {
      return { aspectRatio: customAspectRatio };
    }
    return {};
  };

  return (
    <div 
      className={`card-image-container ${getAspectRatioClass()} ${className}`}
      style={getCustomAspectRatioStyle()}
    >
      {/* Shimmer effect */}
      {showShimmer && !imageLoaded && !imageError && (
        <div className="card-image-shimmer">
          <div className="shimmer-animation"></div>
        </div>
      )}
      
      {/* Error state */}
      {imageError && (
        <div className="card-image-error">
          <div className="error-icon">📷</div>
          <span className="error-text">Image non disponible</span>
        </div>
      )}
      
      {/* Image */}
      {!imageError && (
        <img
          src={currentSrc}
          alt={alt}
          className={`card-image ${imageLoaded ? 'loaded' : ''}`}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      
      {/* Overlay effect */}
      <div className="card-image-overlay"></div>
    </div>
  );
};

export default CardImage; 