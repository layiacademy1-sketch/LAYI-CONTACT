
import React, { useState, useEffect, useMemo } from 'react';
import { Search, PlusCircle, ShieldCheck, Home, Lock, ArrowRight } from 'lucide-react';
import { View, Profile, ProfileStatus, Gender, News } from './types';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import RegistrationForm from './components/RegistrationForm';
import AdminPanel from './components/AdminPanel';
import ProfileDetails from './components/ProfileDetails';
import NewsListView from './components/NewsListView';
import NewsDetailView from './components/NewsDetailView';

const ADMIN_CODE = "Mellina77";

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem('layi_profiles_v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [news, setNews] = useState<News[]>(() => {
    const saved = localStorage.getItem('layi_news');
    return saved ? JSON.parse(saved) : [];
  });
  const [formationImage, setFormationImage] = useState<string>(() => {
    return localStorage.getItem('layi_formation_img') || '';
  });
  
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminInputCode, setAdminInputCode] = useState('');

  useEffect(() => {
    localStorage.setItem('layi_profiles_v2', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('layi_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('layi_formation_img', formationImage);
  }, [formationImage]);

  const addProfile = (profile: Profile) => {
    setProfiles(prev => [profile, ...prev]);
    alert("Profil enregistré !");
  };

  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
  };

  const addNews = (item: News) => {
    setNews(prev => [item, ...prev]);
    alert("Actualité publiée !");
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const handleAdminLogin = () => {
    if (adminInputCode === ADMIN_CODE) {
      setIsAdminAuthenticated(true);
      setAdminInputCode('');
    } else {
      alert("Code incorrect");
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setView('home');
  };

  const selectedProfile = useMemo(() => 
    profiles.find(p => p.id === selectedProfileId), 
    [profiles, selectedProfileId]
  );

  const selectedNewsItem = useMemo(() => 
    news.find(n => n.id === selectedNewsId), 
    [news, selectedNewsId]
  );

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView 
          profiles={profiles} 
          news={news}
          formationImage={formationImage}
          onProfileSelect={(id) => { setSelectedProfileId(id); setView('profile'); }}
          onNewsSelect={(id) => { setSelectedNewsId(id); setView('news-detail'); }}
          onSearchClick={() => setView('search')}
          onSeeAllNews={() => setView('news-list')}
        />;
      case 'search':
        return <SearchView 
          profiles={profiles}
          onProfileSelect={(id) => { setSelectedProfileId(id); setView('profile'); }}
        />;
      case 'register':
        return <RegistrationForm />;
      case 'news-list':
        return <NewsListView 
          news={news} 
          onNewsSelect={(id) => { setSelectedNewsId(id); setView('news-detail'); }} 
          onBack={() => setView('home')} 
        />;
      case 'news-detail':
        return selectedNewsItem ? (
          <NewsDetailView news={selectedNewsItem} onBack={() => setView('news-list')} />
        ) : <HomeView profiles={profiles} news={news} formationImage={formationImage} onProfileSelect={setSelectedProfileId} onNewsSelect={setSelectedNewsId} onSearchClick={() => setView('search')} onSeeAllNews={() => setView('news-list')} />;
      case 'admin':
        if (!isAdminAuthenticated) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="glass-card p-8 rounded-[32px] w-full max-w-sm space-y-6 text-center border-[#FFB000]/20">
                <div className="mx-auto w-16 h-16 bg-[#FFB000]/10 rounded-2xl flex items-center justify-center text-[#FFB000]">
                  <Lock size={32} />
                </div>
                <h2 className="text-xl font-black uppercase italic">Accès Admin</h2>
                <div className="space-y-4">
                  <input 
                    type="password"
                    placeholder="Code secret"
                    value={adminInputCode}
                    onChange={(e) => setAdminInputCode(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-center focus:ring-2 focus:ring-[#FFB000] outline-none transition-all font-mono"
                    onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                  />
                  <button 
                    onClick={handleAdminLogin}
                    className="w-full orange-gradient py-4 rounded-2xl font-black text-black uppercase text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    Se connecter <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        }
        return <AdminPanel 
          profiles={profiles} 
          news={news}
          formationImage={formationImage}
          onUpdateFormationImage={setFormationImage}
          onAddProfile={addProfile}
          onDeleteProfile={deleteProfile}
          onAddNews={addNews}
          onDeleteNews={deleteNews}
        />;
      case 'profile':
        return selectedProfile ? (
          <ProfileDetails profile={selectedProfile} onBack={() => setView('home')} />
        ) : <div className="p-10 text-center">Profil introuvable</div>;
      default:
        return <HomeView profiles={profiles} news={news} formationImage={formationImage} onProfileSelect={setSelectedProfileId} onNewsSelect={setSelectedNewsId} onSearchClick={() => setView('search')} onSeeAllNews={() => setView('news-list')} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar 
        currentView={view} 
        setView={setView} 
        isAdmin={isAdminAuthenticated} 
        onLogout={handleLogout}
      />
      <main className="max-w-md mx-auto px-4 pt-4">
        {renderView()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-50">
        <div className="max-w-md mx-auto px-6 py-3 flex justify-around items-center">
          <button onClick={() => setView('home')} className={`flex flex-col items-center gap-1 ${view === 'home' || view === 'news-list' || view === 'news-detail' ? 'text-[#FFB000]' : 'text-gray-400'}`}>
            <Home size={22} /><span className="text-[10px] uppercase font-bold tracking-wider">Accueil</span>
          </button>
          <button onClick={() => setView('search')} className={`flex flex-col items-center gap-1 ${view === 'search' || view === 'profile' ? 'text-[#FFB000]' : 'text-gray-400'}`}>
            <Search size={22} /><span className="text-[10px] uppercase font-bold tracking-wider">Trouver</span>
          </button>
          <button onClick={() => setView('register')} className="flex flex-col items-center gap-1">
            <div className="bg-[#FFB000] p-3 rounded-full shadow-lg border-4 border-black -mt-8"><PlusCircle size={28} className="text-white" /></div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FFB000]">Contact</span>
          </button>
          <button onClick={() => setView('admin')} className={`flex flex-col items-center gap-1 ${view === 'admin' ? 'text-[#FFB000]' : 'text-gray-400'}`}>
            <ShieldCheck size={22} /><span className="text-[10px] uppercase font-bold tracking-wider">Admin</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
