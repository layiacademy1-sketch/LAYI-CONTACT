
import React, { useState, useEffect, useMemo } from 'react';
import { Search, PlusCircle, ShieldCheck, Home, User, Menu, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { View, Profile, ProfileStatus, Gender } from './types';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import RegistrationForm from './components/RegistrationForm';
import AdminPanel from './components/AdminPanel';
import ProfileDetails from './components/ProfileDetails';

const INITIAL_PROFILES: Profile[] = [
  {
    id: '1',
    snapchatHandle: 'layi_burger',
    category: 'Restaurant',
    presentation: 'Les meilleurs smash burgers de Paris ! Ingrédients frais et ambiance assurée.',
    city: 'Paris',
    country: 'France',
    gender: Gender.BUSINESS,
    discount: '15% sur votre menu avec le code LAYI',
    status: ProfileStatus.VALIDATED,
    createdAt: Date.now() - 1000000,
  },
  {
    id: '2',
    snapchatHandle: 'sarah_nails',
    category: 'Esthétique',
    presentation: 'Prothésiste ongulaire certifiée. Spécialiste nail art à Lyon.',
    city: 'Lyon',
    country: 'France',
    gender: Gender.GIRL,
    discount: 'Pose complète à 35€ au lieu de 50€',
    status: ProfileStatus.VALIDATED,
    createdAt: Date.now() - 500000,
  },
  {
    id: '3',
    snapchatHandle: 'vlad_fitness',
    category: 'Sport & Fitness',
    presentation: 'Coach sportif diplômé. Transformation physique et programmes personnalisés.',
    city: 'Marseille',
    country: 'France',
    gender: Gender.BOY,
    discount: '1er mois de coaching offert',
    status: ProfileStatus.VALIDATED,
    createdAt: Date.now() - 200000,
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem('layi_profiles');
    return saved ? JSON.parse(saved) : INITIAL_PROFILES;
  });
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('layi_profiles', JSON.stringify(profiles));
  }, [profiles]);

  const addProfile = (profile: Omit<Profile, 'id' | 'status' | 'createdAt'>) => {
    const newProfile: Profile = {
      ...profile,
      id: Math.random().toString(36).substr(2, 9),
      status: ProfileStatus.PENDING,
      createdAt: Date.now()
    };
    setProfiles(prev => [newProfile, ...prev]);
    setView('home');
    alert("Votre profil a été soumis pour validation par l'équipe LAYI !");
  };

  const updateProfileStatus = (id: string, status: ProfileStatus) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const updateProfileDiscount = (id: string, discount: string) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, discount } : p));
  };

  const selectedProfile = useMemo(() => 
    profiles.find(p => p.id === selectedProfileId), 
    [profiles, selectedProfileId]
  );

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView 
          profiles={profiles.filter(p => p.status === ProfileStatus.VALIDATED)} 
          onProfileSelect={(id) => { setSelectedProfileId(id); setView('profile'); }}
          onSearchClick={() => setView('search')}
        />;
      case 'search':
        return <SearchView 
          profiles={profiles.filter(p => p.status === ProfileStatus.VALIDATED)}
          onProfileSelect={(id) => { setSelectedProfileId(id); setView('profile'); }}
        />;
      case 'register':
        return <RegistrationForm onSubmit={addProfile} />;
      case 'admin':
        return <AdminPanel 
          profiles={profiles} 
          onUpdateStatus={updateProfileStatus}
          onUpdateDiscount={updateProfileDiscount}
        />;
      case 'profile':
        return selectedProfile ? (
          <ProfileDetails 
            profile={selectedProfile} 
            onBack={() => setView('search')} 
          />
        ) : <div className="p-10 text-center">Profil introuvable</div>;
      default:
        return <HomeView profiles={profiles.filter(p => p.status === ProfileStatus.VALIDATED)} onProfileSelect={setSelectedProfileId} onSearchClick={() => setView('search')} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar 
        currentView={view} 
        setView={setView} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
      />
      <main className="max-w-md mx-auto px-4 pt-4">
        {renderView()}
      </main>

      {/* Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-50">
        <div className="max-w-md mx-auto px-6 py-3 flex justify-between items-center">
          <button 
            onClick={() => setView('home')}
            className={`flex flex-col items-center gap-1 ${view === 'home' ? 'text-[#FFB000]' : 'text-gray-400'}`}
          >
            <Home size={22} />
            <span className="text-[10px] uppercase font-bold tracking-wider">Accueil</span>
          </button>
          <button 
            onClick={() => setView('search')}
            className={`flex flex-col items-center gap-1 ${view === 'search' ? 'text-[#FFB000]' : 'text-gray-400'}`}
          >
            <Search size={22} />
            <span className="text-[10px] uppercase font-bold tracking-wider">Trouver</span>
          </button>
          <button 
            onClick={() => setView('register')}
            className="flex flex-col items-center gap-1 -mt-8"
          >
            <div className="bg-[#FFB000] p-3 rounded-full shadow-lg shadow-[#FFB000]/30 border-4 border-black">
              <PlusCircle size={28} className="text-white" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FFB000]">Inscrire</span>
          </button>
          <button 
            onClick={() => setView('admin')}
            className={`flex flex-col items-center gap-1 ${view === 'admin' ? 'text-[#FFB000]' : 'text-gray-400'}`}
          >
            <ShieldCheck size={22} />
            <span className="text-[10px] uppercase font-bold tracking-wider">Admin</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-gray-400"
            onClick={() => alert("Profil utilisateur bientôt disponible")}
          >
            <User size={22} />
            <span className="text-[10px] uppercase font-bold tracking-wider">Moi</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
