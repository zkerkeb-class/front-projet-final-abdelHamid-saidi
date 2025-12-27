import React, { useState, useEffect } from 'react';
import { UserOutlined, BuildOutlined, ShopOutlined, HomeOutlined, AppstoreOutlined, GoldOutlined, CrownOutlined, ThunderboltOutlined, EnvironmentOutlined, BankOutlined } from '@ant-design/icons';
import { batimentService, ressourceService, menuService } from '../services/api';
import './Dashboard.css';

// Interface pour les éléments du menu
interface MenuItem {
  icon: string;
  label: string;
  id?: string;
  niveau?: number;
  description?: string;
}

// Interface pour les ressources
interface Ressource {
  _id: string;
  type: string;
  nom: string;
  image: string;
  prixAchat: number;
  prixVente: number;
  description: string;
}

// Interface pour les éléments de la sidebar
interface SidebarItem {
  icon: string;
  label: string;
  type: 'image' | 'icon';
}

// Palette extraite de l'image
const COLORS = {
  blueSky: '#5DC6F6',
  blueDark: '#4A7BA7',
  greenTree: '#6DC16D',
  greenHill: '#3B7B4B',
  road: '#E3E7EA',
  roadBorder: '#B0B8C1',
  orange: '#F9C44D',
  beige: '#E6CBA8',
  white: '#FFFFFF',
  leaderboardBg: '#F4F8FB',
  sidebar: '#295B7A',
  menuHover: '#EAF6FB',
};

const ressources = [
  { icon: <GoldOutlined />, label: '5,120', color: COLORS.orange, bg: COLORS.white },
  { icon: <EnvironmentOutlined />, label: '166', color: COLORS.greenTree, bg: COLORS.white },
  { icon: <ThunderboltOutlined />, label: '82', color: COLORS.blueSky, bg: COLORS.white },
  { icon: <AppstoreOutlined />, label: '0', color: COLORS.roadBorder, bg: COLORS.white },
];

// Menu par défaut en attendant le chargement des données
const menuBasDefault: MenuItem[] = [
  { icon: 'http://localhost:3000/images/batiments/bureau/1.png', label: 'BUREAU' },
  { icon: 'http://localhost:3000/images/batiments/usine/1.png', label: 'USINE' },
  { icon: 'http://localhost:3000/images/batiments/Epicerie/1.png', label: 'ÉPICERIE' },
  { icon: 'http://localhost:3000/images/batiments/centrale/1.png', label: 'CENTRALE' },
  { icon: 'http://localhost:3000/images/batiments/bureau/1.png', label: 'BANQUE' },
  { icon: 'http://localhost:3000/images/batiments/Epicerie/1.png', label: 'MARCHÉ' },
];

const leaderboard = [
  { pseudo: 'Player456', rank: 1 },
  { pseudo: 'Player789', rank: 2 },
  { pseudo: 'Player123', rank: 3 },
];

export default function Dashboard() {
  const [menuBas, setMenuBas] = useState<MenuItem[]>(menuBasDefault);
  const [ressources, setRessources] = useState<Ressource[]>([]);
  const [loading, setLoading] = useState(true);
  const [ressourcesLoading, setRessourcesLoading] = useState(true);
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setRessourcesLoading(true);
        
        // Récupérer les bâtiments et les ressources en parallèle
        const [batiments, ressourcesData] = await Promise.all([
          batimentService.getAllNiveauxBatiments(),
          ressourceService.getAllRessources()
        ]);
        
        // Transformer les données des bâtiments en format menu
        const menuItems = batiments.map((batiment: any) => ({
          icon: `http://localhost:3000${batiment.image}`,
          label: batiment.nom.toUpperCase(),
          id: batiment._id,
          niveau: batiment.niveau,
          description: batiment.description
        }));
        
        // Récupérer les images du menu
        const menuImages = menuService.getMenuImages();
        const sidebarMenuItems: SidebarItem[] = [
          { 
            icon: menuImages.carte, 
            label: 'Carte',
            type: 'image'
          },
          { 
            icon: menuImages.ressources, 
            label: 'Ressources',
            type: 'image'
          },
          { 
            icon: menuImages.batiments, 
            label: 'Bâtiments',
            type: 'image'
          },
        ];
        
        setMenuBas(menuItems);
        setRessources(ressourcesData);
        setSidebarItems(sidebarMenuItems);
        
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        // En cas d'erreur, on garde les données par défaut
        setSidebarItems([
          { 
            icon: 'http://localhost:3000/images/menu/carte.png', 
            label: 'Carte',
            type: 'image'
          },
          { 
            icon: 'http://localhost:3000/images/menu/resources.png', 
            label: 'Ressources',
            type: 'image'
          },
          { 
            icon: 'http://localhost:3000/images/menu/batiments.png', 
            label: 'Bâtiments',
            type: 'image'
          },
        ]);
      } finally {
        setLoading(false);
        setRessourcesLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction pour obtenir l'icône appropriée selon le type de ressource
  const getRessourceIcon = (type: string) => {
    switch (type) {
      case 'Énergie':
        return <ThunderboltOutlined />;
      case 'Matériaux':
        return <BuildOutlined />;
      case 'Produits':
        return <AppstoreOutlined />;
      case 'Influence':
        return <CrownOutlined />;
      default:
        return <GoldOutlined />;
    }
  };

  // Fonction pour obtenir la couleur selon le type de ressource
  const getRessourceColor = (type: string) => {
    switch (type) {
      case 'Énergie':
        return COLORS.blueSky;
      case 'Matériaux':
        return COLORS.greenTree;
      case 'Produits':
        return COLORS.orange;
      case 'Influence':
        return COLORS.blueDark;
      default:
        return COLORS.roadBorder;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-[Rubik,sans-serif]" style={{background: `linear-gradient(180deg, ${COLORS.blueSky} 0%, #EAF6FB 100%)`}}>
      {/* Barre du haut */}
      <div className="Barre-haut flex items-center justify-between px-8 py-4 shadow-xl relative">
        <div className="text-3xl font-extrabold tracking-wide text-white flex items-center gap-2 drop-shadow-[0_2px_8px_rgba(44,62,80,0.10)]">
          <span>BizTown</span>
        </div>
        <div className="flex gap-4">
          {ressourcesLoading ? (
            // Affichage de chargement pour les ressources
            <div className="flex items-center gap-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-white text-sm">Chargement...</span>
            </div>
          ) : (
            // Affichage des ressources récupérées depuis l'API
            ressources.slice(0, 4).map((ressource, i) => (
              <div 
                key={ressource._id} 
                className="flex items-center gap-2 px-5 py-2 rounded-2xl shadow-md animate-pulse-on-hover transition-all duration-300 cursor-pointer ressource-bubble" 
                style={{background: COLORS.white}}
                title={`${ressource.nom} - ${ressource.description}`}
              >
                <span 
                  className="text-2xl animate-bounce-slow" 
                  style={{color: getRessourceColor(ressource.type)}}
                >
                  {getRessourceIcon(ressource.type)}
                </span>
                <span 
                  className="font-bold text-lg" 
                  style={{color: getRessourceColor(ressource.type)}}
                >
                  {ressource.prixAchat}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white">PROFIL PUBLIC</span>
          <button className="w-9 h-9 rounded-full bg-white/80 shadow-lg flex items-center justify-center border border-[#e0e0e0] hover:bg-[#eaf6fb] transition-all duration-200 ml-2" title="Aide">
            <span className="text-xl text-[#1899D6] font-bold">?</span>
          </button>
        </div> 
      </div>

      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <aside className="sidebar flex flex-col items-center justify-center">
          <div >
            {sidebarItems.map((item, i) => (
              <div key={i}>
                  {item.type === 'image' ? (
                    <img 
                      src={item.icon} 
                      alt={item.label}
                      className="w-25 h-25 transition-transform duration-200 hover:scale-110 cursor-pointer"
                      onError={(e) => {
                        // En cas d'erreur de chargement d'image, masquer l'image
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    item.icon
                  )}
              </div>
            ))}
          </div>
        </aside>

        {/* Ville centrale */}
        <main className="flex-1 flex flex-col items-center justify-center relative">
           
        </main>
      </div>

      {/* Barre de menu en bas */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-center gap-8 py-6 shadow-2xl rounded-t-3xl border-t border-[#e0e0e0] z-20" style={{background: COLORS.white, boxShadow: '0 -4px 24px #4A7BA755'}}>
        {loading ? (
          // Affichage de chargement
          <div className="flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-gray-600">Chargement des bâtiments...</span>
          </div>
        ) : (
          // Affichage des bâtiments
          menuBas.map((btn, i) => (
            <button 
              key={btn.id || i} 
              className="menu-btn flex flex-col items-center gap-1 px-6 py-3 rounded-2xl transition-all shadow-lg border border-[#e0e0e0] bg-white text-[#2C3E50] text-base font-bold hover:scale-110 hover:shadow-glow" 
              style={{fontFamily: 'Rubik, sans-serif'}}
              title={btn.description}
            >
              <img 
                src={btn.icon} 
                alt={btn.label} 
                className="w-12 h-12 object-contain drop-shadow-lg" 
                onError={(e) => {
                  // En cas d'erreur de chargement d'image, utiliser une image par défaut
                  e.currentTarget.src = 'http://localhost:3000/images/batiments/bureau/1.png';
                }}
              />
              <span className="text-xs font-bold tracking-wide mt-1 drop-shadow-[0_1px_2px_rgba(44,62,80,0.10)]">
                {btn.label}
              </span>
              {btn.niveau && (
                <span className="text-xs text-gray-500">Niv. {btn.niveau}</span>
              )}
            </button>
          ))
        )}
      </nav>
    </div>
  );
} 