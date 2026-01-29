
import React from 'react';
import { Profile } from '../types';
import { Search, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';

interface HomeViewProps {
  profiles: Profile[];
  onProfileSelect: (id: string) => void;
  onSearchClick: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ profiles, onProfileSelect, onSearchClick }) => {
  const featured = profiles.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFB000] to-[#FFD700] p-8 mt-4 shadow-2xl shadow-[#FFB000]/20">
        <div className="relative z-10 space-y-4">
          <h1 className="text-3xl font-black leading-tight tracking-tight text-black">
            Trouvez des pros <br/> Snapchat <span className="text-white italic">validés.</span>
          </h1>
          <p className="text-black/80 text-sm font-medium">
            La plateforme N°1 de mise en relation de confiance en France.
          </p>
          <button 
            onClick={onSearchClick}
            className="bg-black text-[#FFB000] px-6 py-3 rounded-xl font-bold flex items-center gap-2 active:scale-95 transition-transform"
          >
            Rechercher maintenant <Search size={18} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-4 px-1">
          <h2 className="text-xl font-bold">Profils à la une</h2>
          <button onClick={onSearchClick} className="text-[#FFB000] text-sm font-semibold flex items-center">
            Voir tout <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="space-y-4">
          {featured.map(profile => (
            <div 
              key={profile.id}
              onClick={() => onProfileSelect(profile.id)}
              className="glass-card p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors"
            >
              <div className="w-16 h-16 bg-[#FFB000] rounded-xl flex items-center justify-center font-bold text-2xl text-black">
                {profile.snapchatHandle[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg">@{profile.snapchatHandle}</h3>
                  <CheckCircle2 size={14} className="text-[#FFB000]" />
                </div>
                <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wide">{profile.category}</p>
                <div className="flex items-center gap-1 text-xs text-[#FFB000] font-medium">
                  <MapPin size={12} /> {profile.city}, {profile.country}
                </div>
              </div>
              <div className="bg-[#FFB000]/10 text-[#FFB000] px-2 py-1 rounded-lg text-[10px] font-black italic">
                -PRO-
              </div>
            </div>
          ))}
          {featured.length === 0 && (
            <p className="text-center text-gray-500 py-8">Aucun profil validé pour le moment.</p>
          )}
        </div>
      </section>

      <section className="glass-card p-6 rounded-3xl border-[#FFB000]/20 bg-[#FFB000]/5">
        <h3 className="text-lg font-bold mb-2">Pourquoi LAYI-CONTACT ?</h3>
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-[#FFB000] rounded-full p-1"><CheckCircle2 size={12} className="text-black" /></div>
            <span>Vérification manuelle de chaque professionnel par l'équipe LAYI.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-[#FFB000] rounded-full p-1"><CheckCircle2 size={12} className="text-black" /></div>
            <span>Accès à des réductions exclusives négociées pour vous.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-[#FFB000] rounded-full p-1"><CheckCircle2 size={12} className="text-black" /></div>
            <span>Contact direct et rapide via Snapchat.</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomeView;
