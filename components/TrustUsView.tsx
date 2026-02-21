
import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, User, ChevronRight, Star } from 'lucide-react';

interface TrustUsViewProps {
  onBack: () => void;
}

const TRUSTED_PROFILES = [
  { id: '1', name: 'Nasdas', city: 'Perpignan', handle: '@nasdas' },
  { id: '2', name: 'Hachemi', city: 'Paris', handle: '@hachemi' },
  { id: '3', name: 'Saveur de Yemma', city: 'Marseille', handle: '@saveurdeyemma' },
  { id: '4', name: 'Zeyro', city: 'Lyon', handle: '@zeyro' },
  { id: '5', name: 'La Plume de la Réussite', city: 'Nice', handle: '@laplumedelareussite' },
];

const TrustUsView: React.FC<TrustUsViewProps> = ({ onBack }) => {
  const [searchCity, setSearchCity] = useState('');
  const [searchPseudo, setSearchPseudo] = useState('');

  const filteredProfiles = TRUSTED_PROFILES.filter(profile => 
    profile.city.toLowerCase().includes(searchCity.toLowerCase()) &&
    profile.name.toLowerCase().includes(searchPseudo.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 px-1">
        <button 
          onClick={onBack}
          className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">Ils nous ont fait confiance</h2>
          <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-widest italic">Nos partenaires & succès</p>
        </div>
      </div>

      {/* Search Filters */}
      <div className="space-y-4 mb-10 px-1">
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#FFB000] transition-colors">
            <MapPin size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Recherche par ville"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-[24px] py-5 pl-14 pr-6 text-[13px] font-bold text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FFB000]/50 focus:bg-white/10 transition-all italic"
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#FFB000] transition-colors">
            <User size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Recherche par pseudo"
            value={searchPseudo}
            onChange={(e) => setSearchPseudo(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-[24px] py-5 pl-14 pr-6 text-[13px] font-bold text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FFB000]/50 focus:bg-white/10 transition-all italic"
          />
        </div>
      </div>

      {/* Profiles List */}
      <div className="space-y-4">
        <h3 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] italic px-2 mb-6">
          {filteredProfiles.length} Profils trouvés
        </h3>

        {filteredProfiles.map((profile) => (
          <div 
            key={profile.id}
            className="glass-card p-6 rounded-[32px] border-white/5 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-between group hover:border-[#FFB000]/20 transition-all shadow-xl"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#FFB000]/10 rounded-2xl flex items-center justify-center text-[#FFB000] shadow-lg group-hover:scale-110 transition-transform">
                <Star size={24} fill="currentColor" className="animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="text-[17px] font-black uppercase italic tracking-tighter text-white">{profile.name}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{profile.city}</span>
                  <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                  <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-widest italic">{profile.handle}</p>
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-600 group-hover:text-[#FFB000] group-hover:translate-x-1 transition-all" />
          </div>
        ))}

        {filteredProfiles.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-600">
              <Search size={32} />
            </div>
            <p className="text-gray-500 font-black uppercase italic text-[10px] tracking-widest">Aucun profil ne correspond à votre recherche</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrustUsView;
