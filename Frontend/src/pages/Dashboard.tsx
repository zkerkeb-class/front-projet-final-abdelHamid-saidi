import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserOutlined, ThunderboltOutlined, FireOutlined, AppleOutlined, BuildOutlined, TeamOutlined, BarChartOutlined, HomeOutlined, TrophyOutlined, SettingOutlined, BellOutlined, SearchOutlined, ShopOutlined, BankOutlined, LineChartOutlined } from '@ant-design/icons';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import CityMap from '../components/CityMap';

const besoins = [
  { id: 1, nom: 'Électricité', quantite: 150, unite: 'kWh', icone: <ThunderboltOutlined className="text-[#1899D6]" />, couleur: 'bg-[#E6F4FB] text-[#1899D6]', progression: 75 },
  { id: 2, nom: 'Eau', quantite: 200, unite: 'L', icone: <FireOutlined className="text-[#1899D6]" />, couleur: 'bg-[#E6F4FB] text-[#1899D6]', progression: 60 },
  { id: 3, nom: 'Nourriture', quantite: 50, unite: 'kg', icone: <AppleOutlined className="text-[#1899D6]" />, couleur: 'bg-[#E6F4FB] text-[#1899D6]', progression: 85 },
  { id: 4, nom: 'Matières premières', quantite: 100, unite: 'kg', icone: <BuildOutlined className="text-[#1899D6]" />, couleur: 'bg-[#E6F4FB] text-[#1899D6]', progression: 45 },
  { id: 5, nom: 'Main d\'œuvre', quantite: 25, unite: 'personnes', icone: <TeamOutlined className="text-[#1899D6]" />, couleur: 'bg-[#E6F4FB] text-[#1899D6]', progression: 90 },
];

const stats = [
  { label: 'Population', value: '4,420', percent: '+12.3%', color: 'bg-[#1899D6]', extra: '35,000', icon: <UserOutlined className="text-white" />, trend: 'up' },
  { label: 'Économie', value: '€780K', percent: '+8.5%', color: 'bg-[#1899D6]', extra: '€8.8M', icon: <BarChartOutlined className="text-white" />, trend: 'up' },
  { label: 'Production', value: '1,880', percent: '+15.4%', color: 'bg-[#1899D6]', extra: '1,943', icon: <ThunderboltOutlined className="text-white" />, trend: 'up' },
  { label: 'Revenus', value: '€35K', percent: '+22.4%', color: 'bg-[#1899D6]', extra: '€395K', icon: <FireOutlined className="text-white" />, trend: 'up' },
];

const dataLine = [
  { name: 'Lun', population: 24, economie: 13, production: 18 },
  { name: 'Mar', population: 30, economie: 20, production: 25 },
  { name: 'Mer', population: 45, economie: 28, production: 32 },
  { name: 'Jeu', population: 40, economie: 25, production: 28 },
  { name: 'Ven', population: 60, economie: 40, production: 45 },
  { name: 'Sam', population: 90, economie: 60, production: 70 },
  { name: 'Dim', population: 70, economie: 50, production: 55 },
];

const dataBar = [
  { name: 'Lun', valeur: 4000, objectif: 5000 },
  { name: 'Mar', valeur: 6500, objectif: 6000 },
  { name: 'Mer', valeur: 7650, objectif: 7000 },
  { name: 'Jeu', valeur: 5000, objectif: 5500 },
  { name: 'Ven', valeur: 4200, objectif: 4500 },
  { name: 'Sam', valeur: 3800, objectif: 4000 },
  { name: 'Dim', valeur: 6000, objectif: 6500 },
];

const pieData = [
  { name: 'Électricité', value: 35, color: '#1899D6' },
  { name: 'Eau', value: 25, color: '#4A90E2' },
  { name: 'Nourriture', value: 20, color: '#7BB3F0' },
  { name: 'Matières', value: 15, color: '#A8D1FF' },
  { name: 'Main d\'œuvre', value: 5, color: '#D1E7FF' },
];

const recentActivities = [
  { id: 1, action: 'Nouvelle usine construite', time: 'Il y a 2h', type: 'construction', icon: <BuildOutlined className="text-[#1899D6]" /> },
  { id: 2, action: 'Production d\'électricité augmentée', time: 'Il y a 4h', type: 'production', icon: <ThunderboltOutlined className="text-[#1899D6]" /> },
  { id: 3, action: 'Nouveau joueur rejoint', time: 'Il y a 6h', type: 'social', icon: <UserOutlined className="text-[#1899D6]" /> },
  { id: 4, action: 'Vente de ressources', time: 'Il y a 8h', type: 'economy', icon: <BarChartOutlined className="text-[#1899D6]" /> },
];

const Dashboard: React.FC = () => {
  const { joueur, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#F4F4F4]">
      {/* Sidebar avec le style du Login */}
      <aside className="w-72 flex flex-col bg-white border-r border-[#e0e0e0] shadow-2xl min-h-screen">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-[#e0e0e0]">
          <div className="relative">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full object-cover shadow-lg" />
            <div className="absolute -inset-1 bg-[#1899D6] rounded-full blur-lg opacity-30 animate-pulse"></div>
          </div>
          <div>
            <span className="font-bold text-[#2C3E50] text-xl tracking-wide">BizTown</span>
            <span className="ml-1 text-xs text-gray-400">v2.0</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="mb-6">
            <span className="text-xs font-semibold text-[#2C3E50]/60 uppercase tracking-wider px-3 mb-3 block">Navigation</span>
            <RouterLink to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 bg-[#E6F4FB] text-[#1899D6] border border-[#1899D6]/20 shadow-lg hover:shadow-xl transform hover:scale-105">
              <DashboardIcon fontSize="small" />
              <span>Dashboard</span>
            </RouterLink>
          </div>
          
          <div className="mb-6">
            <span className="text-xs font-semibold text-[#2C3E50]/60 uppercase tracking-wider px-3 mb-3 block">Gestion</span>
            <RouterLink to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#E6F4FB] hover:text-[#1899D6] text-[#2C3E50] transition-all duration-300 hover:transform hover:scale-105">
              <PersonIcon fontSize="small" />
              <span>Profil</span>
            </RouterLink>
            <RouterLink to="/classement" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#E6F4FB] hover:text-[#1899D6] text-[#2C3E50] transition-all duration-300 hover:transform hover:scale-105">
              <TrophyOutlined />
              <span>Classement</span>
            </RouterLink>
          </div>

          <div className="mb-6">
            <span className="text-xs font-semibold text-[#2C3E50]/60 uppercase tracking-wider px-3 mb-3 block">Ville</span>
            <RouterLink to="/batiments" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#E6F4FB] hover:text-[#1899D6] text-[#2C3E50] transition-all duration-300 hover:transform hover:scale-105">
              <BuildOutlined className="text-lg" />
              <span>Mes Bâtiments</span>
            </RouterLink>
            <RouterLink to="/ressources" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#E6F4FB] hover:text-[#1899D6] text-[#2C3E50] transition-all duration-300 hover:transform hover:scale-105">
              <BankOutlined className="text-lg" />
              <span>Mes Ressources</span>
            </RouterLink>
          </div>

          <div className="mb-6">
            <span className="text-xs font-semibold text-[#2C3E50]/60 uppercase tracking-wider px-3 mb-3 block">Commerce</span>
            <RouterLink to="/boutique" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#E6F4FB] hover:text-[#1899D6] text-[#2C3E50] transition-all duration-300 hover:transform hover:scale-105">
              <ShopOutlined className="text-lg" />
              <span>Boutique</span>
            </RouterLink>
          </div>

          <div className="mb-6">
            <span className="text-xs font-semibold text-[#2C3E50]/60 uppercase tracking-wider px-3 mb-3 block">Analyses</span>
            <RouterLink to="/analyse" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#E6F4FB] hover:text-[#1899D6] text-[#2C3E50] transition-all duration-300 hover:transform hover:scale-105">
              <LineChartOutlined className="text-lg" />
              <span>Analyse</span>
            </RouterLink>
          </div>
          
          <div className="mb-6">
            <span className="text-xs font-semibold text-[#2C3E50]/60 uppercase tracking-wider px-3 mb-3 block">Ressources</span>
            <div className="space-y-2">
              {besoins.map((b) => (
                <div key={b.id} className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#F4F4F4] hover:bg-[#E6F4FB] transition-all duration-300 hover:transform hover:scale-105">
                  <span className="text-xl group-hover:scale-110 transition-transform">{b.icone}</span>
                  <div className="flex-1">
                    <span className="font-medium text-[#2C3E50] block">{b.nom}</span>
                    <div className="w-full bg-[#e0e0e0] rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full transition-all duration-500 bg-[#1899D6]" 
                        style={{ width: `${b.progression}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${b.couleur} shadow-sm`}>
                    {b.quantite} {b.unite}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </nav>
        
        <div className="p-4 border-t border-[#e0e0e0]">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F4F4F4]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1899D6] flex items-center justify-center shadow-lg">
                <UserOutlined className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-[#2C3E50] text-sm">{joueur?.pseudo || 'John Doe'}</div>
                <div className="text-xs text-gray-500">Maire de BizTown</div>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-all duration-300 hover:transform hover:scale-110" 
              title="Déconnexion"
            >
              <LogoutIcon fontSize="small" />
            </button>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header avec le style du Login */}
        <header className="h-20 flex items-center justify-between bg-white border-b border-[#e0e0e0] px-8 shadow-2xl">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-3xl font-bold text-[#2C3E50]">
                Dashboard
              </h1>
              <p className="text-[#2C3E50]/60 text-sm mt-1">
                {currentTime.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Barre de recherche */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 px-4 py-2 pl-10 rounded-2xl bg-[#F4F4F4] border border-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#1899D6] focus:border-transparent transition-all duration-300"
              />
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2C3E50]/60" />
            </div>
            
            {/* Notifications */}
            <button className="relative p-3 rounded-2xl bg-[#F4F4F4] hover:bg-[#E6F4FB] transition-all duration-300 hover:transform hover:scale-110">
              <BellOutlined className="text-[#2C3E50] text-lg" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Profil utilisateur */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#F4F4F4]">
              <div className="w-10 h-10 rounded-full bg-[#1899D6] flex items-center justify-center shadow-lg">
                <UserOutlined className="text-white text-sm" />
              </div>
              <div>
                <div className="font-semibold text-[#2C3E50] text-sm">{joueur?.pseudo || 'John Doe'}</div>
                <div className="text-xs text-gray-500">Niveau 15</div>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu du dashboard */}
        <main className="flex-1 p-8 space-y-8 bg-[#F4F4F4] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Ma Ville</h2>
          <CityMap />
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 