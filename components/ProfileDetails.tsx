
import React from 'react';
import { Profile } from '../types';
import { ArrowLeft, MapPin, Tag, Share2, ExternalLink, ShieldCheck, Instagram } from 'lucide-react';
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
    <div className="animate-in slide-in-from-bottom-6 duration-700 pb-12">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-bold text-sm uppercase tracking-wider">Retour</span>
      </button>

      <div className="relative glass-card rounded-[40px] p-8 overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="bg-[#FFB000] text-black px-3 py-1 rounded-full text-[10px] font-black italic flex items-center gap-1 shadow-lg shadow-[#FFB000]/20">
            <ShieldCheck size={12} /> VALIDÉ
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-32 h-32 bg-[#FFB000] rounded-3xl flex items-center justify-center text-black font-black text-5xl shadow-2xl shadow-[#FFB000]/40 border-8 border-black/20">
            {profile.snapchatHandle[0].toUpperCase()}
          </div>
          
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter italic">@{profile.snapchatHandle}</h2>
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span>{profile.category}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span>{GENDER_LABELS[profile.gender]}</span>
            </div>
          </div>

          <div className="w-full h-px bg-white/10"></div>

          <div className="space-y-4 w-full text-left">
            <div>
              <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-2">À PROPOS</h3>
              <p className="text-gray-300 leading-relaxed text-sm font-medium">
                {profile.presentation}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/5 p-3 rounded-2xl flex items-center gap-2 text-xs font-bold border border-white/5">
                <MapPin size={14} className="text-[#FFB000]" />
                {profile.city}, {profile.country}
              </div>
            </div>

            {profile.discount && (
              <div className="orange-gradient p-4 rounded-3xl space-y-1 shadow-lg shadow-[#FFB000]/20">
                <div className="flex items-center gap-2 text-black font-black text-xs uppercase tracking-widest">
                  <Tag size={14} /> OFFRE EXCLUSIVE
                </div>
                <p className="text-black font-bold text-lg italic">
                  {profile.discount}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full pt-4">
            <button 
              onClick={handleSnapchatAdd}
              className="col-span-2 bg-[#FFFC00] text-black font-black py-5 rounded-3xl flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-xl shadow-[#FFFC00]/10"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 1.341c-3.14 0-5.69 2.55-5.69 5.69 0 2.22 1.28 4.14 3.14 5.04l-.01.01c-.13.06-.24.16-.33.27l-2.07 2.45c-.21.25-.17.61.08.81.25.21.61.17.81-.08l1.41-1.67v4.61c0 .33.27.6.6.6s.6-.27.6-.6V13.8l1.41 1.67c.2.25.56.29.81.08.25-.21.29-.56.08-.81l-2.07-2.45c-.09-.11-.2-.21-.33-.27l-.01-.01c1.86-.9 3.14-2.82 3.14-5.04 0-3.14-2.55-5.69-5.69-5.69z"/>
              </svg>
              AJOUTER SUR SNAPCHAT
            </button>
            
            <button 
              onClick={() => alert("Lien copié !")}
              className="bg-white/5 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 border border-white/10"
            >
              <Share2 size={18} /> Partager
            </button>
            
            <button 
              className="bg-white/5 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 border border-white/10"
            >
              <Instagram size={18} /> Instagram
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-center text-[10px] text-gray-600 mt-8 px-8 font-medium">
        LAYI-CONTACT ne gère pas les transactions directes. Nous validons uniquement l'identité et le sérieux des profils présentés.
      </p>
    </div>
  );
};

export default ProfileDetails;
