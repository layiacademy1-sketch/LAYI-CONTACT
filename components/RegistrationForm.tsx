
import React from 'react';
import { MessageCircle, ShieldCheck, Check } from 'lucide-react';

const RegistrationForm: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Bonjour LAYI-CONTACT, je souhaite inscrire un profil Snapchat sur la plateforme.");
    window.open(`https://wa.me/33757828250?text=${message}`, '_blank');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-10 relative">
        <div className="w-24 h-24 bg-[#FFB000]/10 rounded-[32px] flex items-center justify-center text-[#FFB000] shadow-2xl shadow-[#FFB000]/20 border border-[#FFB000]/20">
          <ShieldCheck size={48} />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full border-4 border-black">
          <Check size={16} className="text-white" />
        </div>
      </div>

      <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">
        Rejoindre <span className="text-[#FFB000]">LAYI</span>
      </h2>
      
      <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-xs font-medium">
        Toutes les inscriptions sont gérées exclusivement par nos administrateurs pour garantir une base de données 100% fiable.
      </p>

      <button 
        onClick={handleWhatsAppClick}
        className="w-full max-w-xs bg-green-600 hover:bg-green-500 text-white py-6 rounded-[32px] font-black text-lg uppercase shadow-2xl shadow-green-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
      >
        <MessageCircle size={26} />
        Contacter l'Admin
      </button>

      <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] mt-12">
        Service client ouvert 24/7
      </p>
    </div>
  );
};

export default RegistrationForm;
