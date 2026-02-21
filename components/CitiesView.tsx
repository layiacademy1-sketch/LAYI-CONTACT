
import React, { useState } from 'react';
import { MapPin, ChevronRight, CheckCircle2, Search, ArrowLeft, Trophy } from 'lucide-react';
import { Profile, Gender, ProfileStatus } from '../types';

interface CitiesViewProps {
  onProfileSelect: (id: string) => void;
}

// Données fictives des Snapchatters célèbres par ville (images réelles émulées par les avatars ou URLs connues)
const FAMOUS_SNAPCHATTERS: Record<string, Profile[]> = {
  "Paris": [
    {
      id: 'fam-p1',
      snapchatHandle: 'poupettekenza',
      displayName: 'POUPETTE KENZA',
      presentation: 'La reine du Snap français. Influenceuse lifestyle n°1.',
      category: 'Influenceur',
      city: 'Paris',
      country: 'France',
      gender: Gender.GIRL,
      imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman.png',
      status: ProfileStatus.VALIDATED,
      createdAt: Date.now()
    },
    {
      id: 'fam-p2',
      snapchatHandle: 'jazz_correia',
      displayName: 'JAZZ CORREIA',
      presentation: 'JLC Family. Business & Lifestyle.',
      category: 'Influenceur',
      city: 'Paris',
      country: 'France',
      gender: Gender.GIRL,
      imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Princess.png',
      status: ProfileStatus.VALIDATED,
      createdAt: Date.now()
    }
  ],
  "Marseille": [
    {
      id: 'fam-m1',
      snapchatHandle: 'julientanti',
      displayName: 'JULIEN TANTI',
      presentation: 'Le roi des problèmes. Marseillais à vie.',
      category: 'Influenceur',
      city: 'Marseille',
      country: 'France',
      gender: Gender.BOY,
      imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man.png',
      status: ProfileStatus.VALIDATED,
      createdAt: Date.now()
    },
    {
      id: 'fam-m2',
      snapchatHandle: 'maevaghennam',
      displayName: 'MAEVA GHENNAM',
      presentation: 'Lifestyle, Mode & Marseillais.',
      category: 'Influenceur',
      city: 'Marseille',
      country: 'France',
      gender: Gender.GIRL,
      imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20with%20Bun.png',
      status: ProfileStatus.VALIDATED,
      createdAt: Date.now()
    }
  ],
  "Le Havre": [
    {
      id: 'p1',
      snapchatHandle: 'layi-life',
      displayName: 'LAYI',
      presentation: 'Formateur en marketing digital, expert Snapchat.',
      category: 'Formateur marketing digital',
      city: 'Le Havre',
      country: 'France',
      gender: Gender.BOY,
      imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Boy.png',
      status: ProfileStatus.VALIDATED,
      createdAt: Date.now()
    }
  ],
  "Lyon": [
    {
      id: 'fam-ly1',
      snapchatHandle: 'lyon_snap',
      displayName: 'LYON CITY PRO',
      presentation: 'Le meilleur de Lyon sur Snapchat.',
      category: 'Guide / Influenceur',
      city: 'Lyon',
      country: 'France',
      gender: Gender.BUSINESS,
      imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20Places/Statue%20of%20Liberty.png',
      status: ProfileStatus.VALIDATED,
      createdAt: Date.now()
    }
  ],
  "Lille": [
    {
      id: 'fam-li1',
      snapchatHandle: 'lille_vibes',
      displayName: 'LILLE VIBES',
      presentation: 'Actualités et bons plans à Lille.',
      category: 'Actualités',
      city: 'Lille',
      country: 'France',
      gender: Gender.BUSINESS,
      imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20Places/Tower%20Bridge.png',
      status: ProfileStatus.VALIDATED,
      createdAt: Date.now()
    }
  ]
};

const CitiesView: React.FC<CitiesViewProps> = ({ onProfileSelect }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cities = Object.keys(FAMOUS_SNAPCHATTERS);

  // Position relative des villes sur la carte SVG simplifiée de la France
  const cityPositions: Record<string, { x: string, y: string }> = {
    "Paris": { x: "50%", y: "25%" },
    "Marseille": { x: "78%", y: "85%" },
    "Le Havre": { x: "35%", y: "15%" },
    "Lyon": { x: "68%", y: "55%" },
    "Lille": { x: "58%", y: "5%" },
    "Bordeaux": { x: "30%", y: "70%" },
    "Nantes": { x: "20%", y: "35%" },
    "Strasbourg": { x: "90%", y: "25%" }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Villes <span className="text-[#FFB000]">Stars</span></h2>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">Les Snapchatters les plus connus</p>
        </div>
        <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
          <MapPin size={24} className="text-[#FFB000]" />
        </div>
      </div>

      {/* Interactive Map Section */}
      {!selectedCity ? (
        <div className="space-y-8">
          <div className="relative glass-card rounded-[48px] border-[#FFB000]/20 bg-black/40 aspect-[4/5] overflow-hidden p-6 shadow-2xl">
            {/* Sleek SVG France Map Placeholder */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 pointer-events-none fill-[#FFB000]">
              <path d="M45,2 L55,3 L65,10 L75,15 L85,25 L92,40 L95,60 L85,85 L70,95 L50,98 L30,95 L15,85 L5,65 L8,45 L15,30 L30,15 L40,5 Z" />
            </svg>

            {/* City Pins */}
            {Object.entries(cityPositions).map(([city, pos]) => (
                <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className="absolute group -translate-x-1/2 -translate-y-1/2"
                    style={{ left: pos.x, top: pos.y }}
                >
                    <div className="relative flex flex-col items-center">
                        <div className="w-4 h-4 bg-[#FFB000] rounded-full shadow-[0_0_15px_rgba(255,176,0,0.8)] border-4 border-black group-hover:scale-150 transition-transform"></div>
                        <div className="mt-1 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[9px] font-black uppercase text-white whitespace-nowrap">{city}</span>
                        </div>
                    </div>
                </button>
            ))}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-[10px] text-[#FFB000]/30 font-black uppercase tracking-[0.4em] italic text-center">
                    Cliquer sur une ville <br/> pour voir les stars
                </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
              {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className="glass-card p-6 rounded-[32px] border-white/5 flex items-center justify-between group active:scale-95 transition-all"
                  >
                    <span className="text-sm font-black uppercase italic tracking-tighter text-white">{city}</span>
                    <ChevronRight size={18} className="text-[#FFB000] group-hover:translate-x-1 transition-transform" />
                  </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
          <button
            onClick={() => setSelectedCity(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group mb-2"
          >
            <ArrowLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Retour à la carte</span>
          </button>

          <div className="flex items-center justify-between px-1">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Stars de <span className="text-[#FFB000]">{selectedCity}</span></h3>
            <div className="flex items-center gap-1.5 bg-[#FFB000]/10 px-3 py-1.5 rounded-full border border-[#FFB000]/20">
              <Trophy size={12} className="text-[#FFB000]" />
              <span className="text-[9px] font-black text-[#FFB000] uppercase italic">Top Profils</span>
            </div>
          </div>

          <div className="space-y-4">
            {FAMOUS_SNAPCHATTERS[selectedCity]?.map(profile => (
              <div
                key={profile.id}
                onClick={() => onProfileSelect(profile.id)}
                className="glass-card p-6 rounded-[40px] flex items-center gap-5 border-white/5 hover:bg-white/10 active:scale-95 transition-all cursor-pointer overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <CheckCircle2 size={80} />
                </div>
                
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden shrink-0 shadow-2xl border border-white/10 ${profile.gender === Gender.GIRL ? 'bg-pink-600/20' : 'bg-blue-600/20'}`}>
                    <img src={profile.imageUrl} alt={profile.displayName} className="w-full h-full object-contain p-2" />
                </div>
                
                <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-center gap-1.5 mb-1">
                        <h4 className="text-lg font-black uppercase italic tracking-tight text-white truncate">{profile.displayName}</h4>
                        <CheckCircle2 size={16} className="text-[#FFB000] shrink-0" />
                    </div>
                    <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-widest italic mb-2">@{profile.snapchatHandle}</p>
                    <p className="text-[11px] text-gray-400 font-medium leading-tight line-clamp-2">
                        {profile.presentation}
                    </p>
                </div>
                
                <div className="bg-[#FFB000] text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-[#FFB000]/20 shrink-0">
                    <ChevronRight size={22} />
                </div>
              </div>
            ))}
          </div>

          {(!FAMOUS_SNAPCHATTERS[selectedCity] || FAMOUS_SNAPCHATTERS[selectedCity].length === 0) && (
            <div className="text-center py-20 opacity-30 italic font-black uppercase text-[10px] tracking-widest">
                Arrive bientôt pour cette ville...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CitiesView;
