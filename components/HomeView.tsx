
import React from 'react';
import { ChevronRight, Calendar, ShieldCheck, Sparkles, Video, Eye, Star, Download } from 'lucide-react';
import { Introducer } from '../types';

interface HomeViewProps {
  onRegisterIntroducer: () => void;
  onTrainingLivesClick: () => void;
  onMemberAccessClick: () => void;
  onIntroducerDetails: (intro: Introducer) => void;
  onPresentationClick: () => void;
  onMembershipOfferClick: () => void;
  onAllFormationsClick: () => void;
  isMember?: boolean;
  onInstallApp?: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  onRegisterIntroducer, 
  onTrainingLivesClick, 
  onMemberAccessClick,
  onIntroducerDetails,
  onPresentationClick,
  onMembershipOfferClick,
  onAllFormationsClick,
  isMember = false,
  onInstallApp
}) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Hero Section */}
      <section className="relative rounded-[48px] overflow-hidden bg-[#FFB000] p-10 mt-2 shadow-[0_20px_50px_rgba(255,176,0,0.3)] text-center border-b-8 border-black/10">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-[80px] animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/10 rounded-full blur-[80px] animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-8">
          <div className="bg-black px-8 py-2 rounded-full border border-white/10 shadow-2xl scale-90 animate-float">
            <span className="text-[#FFB000] font-black italic text-xl tracking-tighter">LAYI</span>
          </div>

          <div className="space-y-6 w-full">
            <h1 className="flex flex-col items-center gap-2">
              <span className="text-[26px] font-[900] leading-none tracking-tighter text-black uppercase italic drop-shadow-sm text-center">
                Formation Snapchat
              </span>
              <span className="relative inline-block text-[36px] font-[950] leading-none tracking-tighter uppercase italic text-center">
                <span className="relative text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] text-flow">
                  N°1 en France
                </span>
                <div className="absolute -right-6 -top-2 text-white animate-bounce">
                  <Sparkles size={24} />
                </div>
              </span>
            </h1>
            
            <div className="pt-2">
              <button 
                onClick={onPresentationClick}
                className="button-glow w-full bg-black text-[#FFB000] py-6 rounded-[28px] font-black uppercase text-[13px] tracking-[0.2em] active:scale-95 transition-all mt-2 border-t border-white/20 flex items-center justify-center gap-3 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                   En savoir plus <ChevronRight size={18} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons Section */}
      <section className="px-1 space-y-4">
        {/* Install App Button */}
        <button 
          onClick={onInstallApp}
          className="w-full glass-card p-6 rounded-[40px] border-white/10 bg-white/5 flex items-center justify-between group active:scale-95 transition-all shadow-xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Download size={28} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Installer l'application</h3>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">Ajouter LAYi à votre écran d'accueil</p>
            </div>
          </div>
          <ChevronRight size={24} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Devenir Membre Shortcut */}
        <button 
          onClick={onMembershipOfferClick}
          className="w-full glass-card p-6 rounded-[40px] border-[#FFB000]/40 bg-gradient-to-br from-[#FFB000]/20 to-transparent flex items-center justify-between group active:scale-95 transition-all shadow-xl animate-pulse"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-lg group-hover:rotate-12 transition-transform">
              <Sparkles size={28} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">S’inscrire à la formation</h3>
            </div>
          </div>
          <ChevronRight size={24} className="text-[#FFB000] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* ESPACE Membre Shortcut */}
        <button 
          onClick={onMemberAccessClick}
          className="w-full glass-card p-6 rounded-[40px] border-[#FFB000]/20 bg-gradient-to-br from-[#FFB000]/10 to-transparent flex items-center justify-between group active:scale-95 transition-all shadow-xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#FFB000] rounded-2xl flex items-center justify-center text-black shadow-lg shadow-[#FFB000]/20 group-hover:rotate-12 transition-transform">
              <Star size={28} fill="currentColor" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Espace Membre</h3>
              <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-widest italic">{isMember ? 'Accès rapide à votre compte' : 'Espace privé & sécurisé'}</p>
            </div>
          </div>
          <ChevronRight size={24} className="text-[#FFB000] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Nos Formations Shortcut */}
        <button 
          onClick={onAllFormationsClick}
          className="w-full glass-card p-6 rounded-[40px] border-white/10 bg-white/5 flex items-center justify-between group active:scale-95 transition-all shadow-xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center text-[#FFB000] shadow-lg group-hover:rotate-12 transition-transform">
              <Eye size={28} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Ils nous ont fait confiance</h3>
            </div>
          </div>
          <ChevronRight size={24} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

    </div>
  );
};

export default HomeView;
