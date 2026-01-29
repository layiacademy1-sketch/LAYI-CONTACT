
import React from 'react';
import { Profile, News } from '../types';
import { Search, MapPin, ChevronRight, CheckCircle2, Calendar, MessageCircle, ShieldCheck } from 'lucide-react';

interface HomeViewProps {
  profiles: Profile[];
  news: News[];
  formationImage: string;
  onProfileSelect: (id: string) => void;
  onNewsSelect: (id: string) => void;
  onSearchClick: () => void;
  onSeeAllNews: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ profiles, news, formationImage, onProfileSelect, onNewsSelect, onSearchClick, onSeeAllNews }) => {
  const featured = profiles.slice(0, 3);
  const latestNews = news.length > 0 ? news[0] : null;

  const handleFormationClick = () => {
    // Contacting 0757828250 via WhatsApp
    const message = encodeURIComponent("Bonjour, je souhaite plus d'informations sur la formation Snapchat Professionnel pour passer en mode pro.");
    window.open(`https://wa.me/33757828250?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Hero Section avec slogan exact */}
      <section className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#FFB000] to-[#FFD700] p-8 mt-2 shadow-2xl shadow-[#FFB000]/20">
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-black leading-[0.9] tracking-tighter text-black uppercase italic">
            LA CONFIANCE <br/> <span className="text-white">C'EST ICI</span>
          </h1>
          <p className="text-black/80 text-[11px] font-black uppercase tracking-tight leading-relaxed max-w-[280px]">
            La plateforme n°1 pour mettre en relation des professionnels Snapchat fiables, en France et à l’international.
          </p>
          <button 
            onClick={onSearchClick}
            className="bg-black text-[#FFB000] px-8 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-2"
          >
            Trouver un Pro <Search size={14} />
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <ShieldCheck size={200} color="white" />
        </div>
      </section>

      {/* Formation Snapchat - Positionnée AVANT les profils à la une */}
      {formationImage && (
        <section className="px-1">
          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h2 className="text-xl font-black uppercase italic tracking-tighter">Formation Snapchat</h2>
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Passer en mode professionnel</p>
                </div>
                <div className="bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full text-[8px] font-black uppercase flex items-center gap-1.5 border border-green-500/20">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> DISPONIBLE
                </div>
             </div>
             <div 
              onClick={handleFormationClick}
              className="relative aspect-[16/9] rounded-[32px] overflow-hidden cursor-pointer group shadow-2xl border border-white/10 active:scale-[0.98] transition-all"
            >
              <img 
                src={formationImage} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt="Formation Snapchat Professionnel" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 group-hover:scale-110 transition-transform">
                <MessageCircle size={28} />
              </div>
              
              <div className="absolute bottom-6 left-6">
                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white italic drop-shadow-lg">
                  Cliquez pour passer en mode pro
                </p>
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Contact direct WhatsApp</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Profils à la une */}
      <section>
        <div className="flex justify-between items-end mb-5 px-1">
          <h2 className="text-xl font-black uppercase italic tracking-tighter">Profils à la une</h2>
          <button onClick={onSearchClick} className="text-[#FFB000] text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            Tout voir <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="space-y-4">
          {featured.map(profile => (
            <div 
              key={profile.id}
              onClick={() => onProfileSelect(profile.id)}
              className="glass-card p-4 rounded-[32px] flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-all border-white/5 active:scale-[0.98]"
            >
              <div className="w-16 h-16 bg-[#111] rounded-2xl border border-white/10 overflow-hidden shrink-0 shadow-lg">
                <img src={profile.imageUrl} alt={profile.snapchatHandle} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="font-black text-lg truncate uppercase italic">@{profile.snapchatHandle}</h3>
                  <CheckCircle2 size={14} className="text-[#FFB000]" />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                  <MapPin size={12} className="text-[#FFB000]" /> {profile.city}
                </div>
              </div>
              <div className="bg-[#FFB000] text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg shadow-[#FFB000]/20">
                <ChevronRight size={18} />
              </div>
            </div>
          ))}
          {profiles.length === 0 && (
            <div className="glass-card p-12 rounded-[32px] text-center border-dashed border-white/10 opacity-50">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">En attente de nouveaux profils...</p>
            </div>
          )}
        </div>
      </section>

      {/* Actualités */}
      <section className="space-y-6">
        <div className="px-1">
          <h2 className="text-xl font-black uppercase italic tracking-tighter">Actualités</h2>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Évènements & News</p>
        </div>

        {latestNews ? (
          <div className="space-y-4">
            <div className="relative aspect-[16/10] rounded-[48px] overflow-hidden group shadow-2xl border border-white/5">
              <img src={latestNews.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <div className="inline-flex items-center gap-2 bg-[#FFB000] text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl shadow-[#FFB000]/20">
                  <Calendar size={12} /> DERNIÈRE ACTU
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white line-clamp-2">
                  {latestNews.title}
                </h3>
                <button 
                  onClick={() => onNewsSelect(latestNews.id)}
                  className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                >
                  En savoir plus
                </button>
              </div>
            </div>

            <button 
              onClick={onSeeAllNews}
              className="w-full bg-white/5 border border-white/10 py-5 rounded-[32px] text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Voir toutes les actualités <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div className="glass-card p-10 rounded-[48px] text-center border-dashed border-white/10">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest italic opacity-50">Aucune actualité pour le moment</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeView;
