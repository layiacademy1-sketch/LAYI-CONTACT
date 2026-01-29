
import React from 'react';
import { Profile } from '../types';
import { ArrowLeft, MapPin, ShieldCheck, User } from 'lucide-react';
import { GENDER_LABELS } from '../constants';

interface ProfileDetailsProps {
  profile: Profile;
  onBack: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile, onBack }) => {
  const handleSnapchatAdd = () => {
    window.open(`https://www.snapchat.com/add/${profile.snapchatHandle}`, '_blank');
  };

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

      {/* Profil Photo */}
      <div className="relative aspect-square mb-8 rounded-[56px] overflow-hidden bg-white/5 shadow-2xl border border-white/10 group">
        <img 
          src={profile.imageUrl} 
          alt={profile.snapchatHandle} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
        />
        <div className="absolute top-6 right-6">
          <div className="bg-[#FFB000] text-black px-4 py-1.5 rounded-full text-[10px] font-black italic flex items-center gap-1 shadow-2xl">
            <ShieldCheck size={12} /> PRO VALIDÉ
          </div>
        </div>
        <div className="absolute bottom-6 left-6">
           <div className="bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
            {GENDER_LABELS[profile.gender]}
          </div>
        </div>
      </div>

      <div className="space-y-8 px-2">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-black tracking-tighter italic uppercase text-white">@{profile.snapchatHandle}</h2>
          <div className="flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB000]">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="opacity-70" /> {profile.city}
            </div>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
            <div className="flex items-center gap-1">
              <User size={14} className="opacity-70" /> {GENDER_LABELS[profile.gender]}
            </div>
          </div>
        </div>

        <button 
          onClick={handleSnapchatAdd}
          className="w-full bg-[#FFFC00] text-black font-black py-5 rounded-[32px] flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-2xl shadow-[#FFFC00]/20 text-lg"
        >
          <img src="https://www.snapchat.com/favicon.ico" className="w-6 h-6" alt="" />
          AJOUTER SUR SNAPCHAT
        </button>

        <section className="glass-card p-8 rounded-[48px] space-y-4 border-white/5">
          <h3 className="text-[9px] font-black uppercase text-gray-500 tracking-[0.4em] text-center mb-2">Présentation</h3>
          <p className="text-gray-200 leading-relaxed text-center font-medium italic text-lg">
            "{profile.presentation || "Aucune description."}"
          </p>
        </section>

        <div className="pt-4 flex flex-col items-center gap-4">
           <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] text-center">
            Membre certifié par LAYI-CONTACT
          </p>
          <button 
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert("Lien copié dans le presse-papier !");
            }}
            className="text-gray-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest underline decoration-[#FFB000] underline-offset-4"
          >
            Partager ce profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
