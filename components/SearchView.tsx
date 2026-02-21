import React, { useState, useMemo } from 'react';
import { Profile, Gender } from '../types';
import { Search, MapPin, X, ChevronRight, Check } from 'lucide-react';

interface SearchViewProps {
  profiles: Profile[];
  onProfileSelect: (id: string) => void;
  title?: string;
}

const SearchView: React.FC<SearchViewProps> = ({ profiles, onProfileSelect, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  const filteredProfiles = useMemo(() => {
    // Ne rien afficher si aucun terme n'est saisi
    if (!searchTerm.trim() && !selectedCity.trim()) return [];

    return profiles.filter(p => {
      const term = searchTerm.toLowerCase();
      const cityFilter = selectedCity.toLowerCase();
      
      const matchesSearch = !term || 
                            p.snapchatHandle.toLowerCase().includes(term) ||
                            p.displayName.toLowerCase().includes(term) ||
                            p.presentation.toLowerCase().includes(term) ||
                            p.category.toLowerCase().includes(term);
                            
      const matchesCity = !cityFilter || p.city.toLowerCase().includes(cityFilter);
      
      return matchesSearch && matchesCity;
    });
  }, [profiles, searchTerm, selectedCity]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="space-y-1 px-1">
        <h2 className="text-xl font-black uppercase italic tracking-tighter">{title || "Recherche thématique"}</h2>
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Trouvez par ville ou mot-clé</p>
      </div>

      {/* Filter Panel */}
      <div className="glass-card p-6 rounded-[32px] border-white/10 space-y-6 shadow-2xl">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#FFB000] px-1 flex items-center gap-2">
            <Search size={12} /> Mot-clé, Nom ou Catégorie
          </label>
          <input 
            type="text"
            placeholder="Ex: influenceur, restaurant, LAYI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-[#FFB000] outline-none transition-all text-sm font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#FFB000] px-1 flex items-center gap-2">
            <MapPin size={12} /> Ville
          </label>
          <input 
            type="text"
            placeholder="Ex: Paris, Le Havre..."
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-[#FFB000] outline-none transition-all text-sm font-bold"
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4 pt-2">
        {(!searchTerm.trim() && !selectedCity.trim()) ? (
          <div className="text-center py-20 opacity-40">
            <div className="mb-4 inline-block p-6 rounded-full bg-white/5 text-gray-600">
              <Search size={40} />
            </div>
            <p className="font-black uppercase tracking-[0.2em] text-xs">Entrez une ville ou un mot-clé</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FFB000] px-1">{filteredProfiles.length} résultat(s) trouvé(s)</p>
            {filteredProfiles.map(profile => (
              <div 
                key={profile.id}
                onClick={() => onProfileSelect(profile.id)}
                className="glass-card p-5 rounded-[32px] flex items-start gap-4 active:scale-95 transition-transform hover:bg-white/10"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden shrink-0 p-2 shadow-inner">
                  <img src={profile.imageUrl} alt={profile.displayName} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-base truncate italic uppercase">{profile.displayName}</h3>
                    <Check size={12} className="text-green-500 shrink-0" />
                  </div>
                  <div className="flex flex-col gap-0.5 mb-2">
                    <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-wider italic">
                      {profile.category}
                    </p>
                    {profile.city && (
                      <p className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em] flex items-center gap-1">
                        <MapPin size={8} /> {profile.city}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-medium">
                    {profile.presentation}
                  </p>
                </div>
                <div className="self-center">
                  <ChevronRight size={20} className="text-gray-700" />
                </div>
              </div>
            ))}
            {filteredProfiles.length === 0 && (
              <div className="text-center py-20 glass-card rounded-[32px] border-dashed border-white/10">
                <p className="font-black uppercase tracking-widest text-sm text-gray-400">Aucun profil ne correspond</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;