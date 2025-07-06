# Composant CardImage - Améliorations

## 🎯 Vue d'ensemble

Le composant `CardImage` a été entièrement refactorisé pour offrir une expérience utilisateur améliorée avec des fonctionnalités avancées.

## ✨ Nouvelles fonctionnalités

### 1. **Gestion d'état intelligente**
- **Chargement progressif** : L'image apparaît avec une animation de fade-in
- **Gestion d'erreur** : Fallback automatique vers une image par défaut
- **État de chargement** : Indicateur visuel pendant le chargement

### 2. **Effet Shimmer**
- Animation de chargement moderne avec effet de brillance
- Améliore la perception de performance
- Désactivé automatiquement si l'utilisateur préfère moins d'animations

### 3. **Aspect Ratio flexible**
```typescript
// Options disponibles
aspectRatio="square"     // 1:1
aspectRatio="16/9"       // Format vidéo
aspectRatio="4/3"        // Format photo
aspectRatio="custom"     // Ratio personnalisé
customAspectRatio="3/2"  // Ratio spécifique
```

### 4. **Accessibilité améliorée**
- Support du mode contraste élevé
- Respect des préférences de réduction de mouvement
- États de focus visibles
- Textes alternatifs appropriés

### 5. **Performance optimisée**
- Chargement lazy par défaut
- Transitions fluides avec `cubic-bezier`
- Gestion mémoire optimisée

## 🎨 Améliorations visuelles

### Effets de survol
- **Scale** : Légère augmentation de taille (1.05x)
- **Translation** : Mouvement vers le haut (-2px)
- **Ombre** : Ombre portée avec couleur thématique
- **Filtres** : Amélioration de la luminosité et du contraste

### Animations
- **Fade-in** : Apparition progressive de l'image
- **Scale** : Animation d'échelle au chargement
- **Shimmer** : Effet de brillance pendant le chargement
- **Overlay** : Effet de superposition au survol

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile (≤480px) */
.card-image-container { height: 70px; }
.card-image { width: 70%; max-height: 50px; }

/* Tablet (≤768px) */
.card-image-container { height: 80px; }
.card-image { width: 65%; max-height: 60px; }

/* Desktop (>768px) */
.card-image-container { height: 90px; }
.card-image { width: 60%; max-height: 70px; }
```

## 🔧 Utilisation

### Import
```typescript
import CardImage from './CardImage';
```

### Props disponibles
```typescript
interface CardImageProps {
  src: string;                    // URL de l'image
  alt: string;                    // Texte alternatif
  className?: string;             // Classes CSS additionnelles
  fallbackSrc?: string;           // Image de fallback
  loading?: 'lazy' | 'eager';     // Type de chargement
  onLoad?: () => void;            // Callback au chargement
  onError?: () => void;           // Callback en cas d'erreur
  showShimmer?: boolean;          // Afficher l'effet shimmer
  aspectRatio?: 'square' | '16/9' | '4/3' | 'custom';
  customAspectRatio?: string;     // Ratio personnalisé
}
```

### Exemple d'utilisation
```typescript
<CardImage
  src="/images/batiment.png"
  alt="Bâtiment de production"
  fallbackSrc="/placeholder-building.png"
  aspectRatio="square"
  showShimmer={true}
  onLoad={() => console.log('Image chargée')}
  onError={() => console.log('Erreur de chargement')}
/>
```

## 🎯 Intégration

Le composant a été intégré dans :
- ✅ `BatimentsCarousel`
- ✅ `RessourcesCarousel`
- ✅ `BatimentsModal`
- ✅ `RessourcesModal`
- ✅ `CatalogueModal`

## 🚀 Avantages

1. **Cohérence** : Interface uniforme dans toute l'application
2. **Performance** : Chargement optimisé et gestion d'erreur
3. **UX** : Animations fluides et feedback visuel
4. **Accessibilité** : Support des standards d'accessibilité
5. **Maintenabilité** : Code centralisé et réutilisable

## 🔮 Futures améliorations

- [ ] Support du format WebP avec fallback
- [ ] Préchargement des images critiques
- [ ] Compression automatique des images
- [ ] Support du mode sombre
- [ ] Animations personnalisables 