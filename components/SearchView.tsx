
import React, { useState, useMemo } from 'react';
import { Profile } from '../types';
import { Search, MapPin, CheckCircle2, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface SearchViewProps {
  profiles: Profile[];
  onProfileSelect: (id: string) => void;
}

const SearchView: React.FC<SearchViewProps> = ({ profiles, onProfileSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState('');

  const filteredProfiles = useMemo(() => {
    return profiles.filter(p => {
      const matchesSearch = p.snapchatHandle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.presentation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      const matchesCity = cityFilter ? p.city.toLowerCase().includes(cityFilter.toLowerCase()) : true;
      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [profiles, searchTerm, selectedCategory, cityFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="sticky top-[80px] bg-black z-40 pb-4">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text"
            placeholder="Rechercher par pseudo ou mot-clé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#FFB000] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${!selectedCategory ? 'bg-[#FFB000] text-black' : 'bg-white/5 text-gray-400'}`}
          >
            Tout
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-[#FFB000] text-black' : 'bg-white/5 text-gray-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2 px-1">
        <SlidersHorizontal size={16} className="text-gray-500" />
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Localisation</span>
      </div>
      <input 
        type="text"
        placeholder="Filtrer par ville (ex: Paris, Lyon...)"
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-[#FFB000] outline-none mb-6"
      />

      <div className="space-y-4">
        <p className="text-xs font-bold text-gray-500 px-1">{filteredProfiles.length} résultat(s) trouvé(s)</p>
        {filteredProfiles.map(profile => (
          <div 
            key={profile.id}
            onClick={() => onProfileSelect(profile.id)}
            className="glass-card p-5 rounded-3xl flex items-start gap-4 active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center font-bold text-xl border border-white/10">
              {profile.snapchatHandle[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <h3 className="font-bold text-base truncate">@{profile.snapchatHandle}</h3>
                <CheckCircle2 size={14} className="text-[#FFB000] shrink-0" />
              </div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">{profile.category}</p>
              <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed mb-3">
                {profile.presentation}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-[11px] text-[#FFB000] font-bold">
                  <MapPin size={12} /> {profile.city}
                </div>
                {profile.discount && (
                  <span className="bg-[#FFB000]/20 text-[#FFB000] px-3 py-1 rounded-full text-[10px] font-black">
                    OFFRE DISPO
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredProfiles.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <div className="mb-4 inline-block p-4 rounded-full bg-white/5">
              <X size={40} />
            </div>
            <p className="font-bold">Aucun résultat</p>
            <p className="text-sm">Essayez de modifier vos filtres.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
