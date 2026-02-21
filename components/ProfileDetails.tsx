
import React from 'react';
import { Profile, Gender } from '../types';
import { ArrowLeft, MapPin, ShieldCheck, Briefcase, Globe, MessageCircle, ExternalLink, Check } from 'lucide-react';

interface ProfileDetailsProps {
  profile: Profile;
  onBack: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile, onBack }) => {
  const handleSnapchatAdd = () => {
    window.open(`https://www.snapchat.com/add/${profile.snapchatHandle}`, '_blank');
  };

  const handleVisitWebsite = () => {
    if (profile.snapchatHandle.toLowerCase() === 'le_zeyro') {
      window.open('https://le-zeyro.com/', '_blank');
    } else if (profile.snapchatHandle.toLowerCase() === 'laplume-reussite') {
      window.open('https://www.la-plume-de-la-reussite.com/', '_blank');
    }
  };

  const handleWhatsAppContact = () => {
    if (profile.snapchatHandle.toLowerCase() === 'le_zeyro') {
      window.open('https://wa.me/33652887494', '_blank');
    }
  };

  const bgColor = profile.gender === Gender.BOY ? 'bg-blue-600/20' : profile.gender === Gender.GIRL ? 'bg-pink-600/20' : 'bg-white/5';
  const borderColor = profile.gender === Gender.BOY ? 'border-blue-500/40' : profile.gender === Gender.GIRL ? 'border-pink-500/40' : 'border-white/10';

  const isZeyro = profile.snapchatHandle.toLowerCase() === 'le_zeyro';
  const isPlume = profile.snapchatHandle.toLowerCase() === 'laplume-reussite';

  return (
    <div className="animate-in slide-in-from-bottom-6 duration-700 pb-20">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10">
          <ArrowLeft size={16} />
        </div>
        <span className="font-bold text-[10px] uppercase tracking-widest">Retour</span>
      </button>

      {/* Profil Photo - Taille réduite et centrée pour plus d'harmonie */}
      <div className="flex justify-center mb-8">
        <div className={`relative w-44 h-44 rounded-[40px] overflow-hidden ${bgColor} shadow-2xl border ${borderColor} group flex items-center justify-center p-8 transition-all duration-500`}>
          <img 
            src={profile.imageUrl} 
            alt={profile.displayName} 
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" 
          />
          <div className="absolute top-4 right-4">
            <div className="bg-[#FFB000] text-black w-6 h-6 rounded-full flex items-center justify-center shadow-2xl">
              <ShieldCheck size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-2">
        <div className="text-center space-y-3">
          <div className="flex flex-col items-center">
             <div className="bg-[#FFB000] text-black px-4 py-1.5 rounded-full text-[10px] font-black italic flex items-center gap-1 shadow-2xl mb-3">
                <ShieldCheck size={12} /> PRO VALIDÉ
              </div>
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-4xl font-black tracking-tighter italic uppercase text-white">{profile.displayName}</h2>
              <div className="bg-green-500 p-1 rounded-full shadow-lg shadow-green-500/30 shrink-0">
                <Check size={16} strokeWidth={4} className="text-black" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB000]">
            <div className="flex items-center gap-1">
              <Briefcase size={14} className="opacity-70" /> {profile.category}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleSnapchatAdd}
            className="w-full bg-[#FFFC00] text-black font-black py-5 rounded-[32px] flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-2xl shadow-[#FFFC00]/30 text-lg hover:brightness-110"
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center p-1.5 shadow-lg">
              <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                <path d="M12 2C9.5 2 7.5 3 6.5 4.5C6.5 4.5 5 4.5 4 6.5C3.5 7.5 3 8 2.5 9.5C2 11 2 12 2 12.5C2 13 3 14 3.5 15C4 16 4.5 16.5 5 17C6 18 8 18.5 10 19C10.5 19.5 11 20 12 20C13 20 13.5 19.5 14 19C16 18.5 18 18 19 17C19.5 16.5 20 16 20.5 15C21 14 22 13 22 12.5C22 12 22 11 21.5 9.5C21 8 20.5 7.5 20 6.5C19 4.5 17.5 4.5 17.5 4.5C16.5 3 14.5 2 12 2ZM12 4C13.5 4 14.5 4.5 15.5 5.5C16 6 16.5 7 16.5 8C16.5 8.5 16 9 15.5 9.5C15 10 14 10.5 13 11C12.5 11.2 11.5 11.2 11 11C10 10.5 9 10 8.5 9.5C8 9 7.5 8.5 7.5 8C7.5 7 8 6 8.5 5.5C9.5 4.5 10.5 4 12 4Z" />
              </svg>
            </div>
            S'ABONNER À @{profile.snapchatHandle.toUpperCase()}
          </button>

          {/* Boutons spécifiques pour Zeyro */}
          {isZeyro && (
            <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-top-4 duration-500 delay-150">
              <button 
                onClick={handleVisitWebsite}
                className="w-full glass-card border-[#FFB000]/40 text-[#FFB000] font-black py-4 rounded-[32px] flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl uppercase text-xs tracking-widest"
              >
                <Globe size={18} />
                Voir son site
                <ExternalLink size={14} className="opacity-50" />
              </button>
              
              <button 
                onClick={handleWhatsAppContact}
                className="w-full bg-green-600 text-white font-black py-4 rounded-[32px] flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl shadow-green-600/20 uppercase text-xs tracking-widest"
              >
                <MessageCircle size={18} />
                Le contacter sur WhatsApp
              </button>
            </div>
          )}

          {/* Boutons spécifiques pour La Plume de la Réussite */}
          {isPlume && (
            <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-top-4 duration-500 delay-150">
              <button 
                onClick={handleVisitWebsite}
                className="w-full glass-card border-[#FFB000]/40 text-[#FFB000] font-black py-4 rounded-[32px] flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl uppercase text-xs tracking-widest"
              >
                <Globe size={18} />
                Visiter le site web
                <ExternalLink size={14} className="opacity-50" />
              </button>
            </div>
          )}
        </div>

        <section className="glass-card p-8 rounded-[48px] space-y-4 border-white/5 bg-white/5">
          <h3 className="text-[9px] font-black uppercase text-gray-500 tracking-[0.4em] text-center mb-2">Présentation Professionnelle</h3>
          <p className="text-gray-200 leading-relaxed text-center font-medium italic text-lg px-2">
            "{profile.presentation || "Aucune description."}"
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProfileDetails;
