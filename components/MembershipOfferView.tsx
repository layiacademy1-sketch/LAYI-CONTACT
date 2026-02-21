
import React from 'react';
import { ArrowLeft, CheckCircle2, Sparkles, Star, Zap, MessageSquare } from 'lucide-react';

interface MembershipOfferViewProps {
  onBack: () => void;
  onViewFormations: () => void;
}

const MembershipOfferView: React.FC<MembershipOfferViewProps> = ({ onBack, onViewFormations }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 px-1">
        <button 
          onClick={onBack}
          className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">Offre lancement</h2>
          <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-widest italic">Opportunité limitée</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Pricing Card */}
        <div className="glass-card p-8 rounded-[48px] border-4 bg-black animate-gold-border relative overflow-hidden text-center">
          <div className="absolute -top-10 -right-10 opacity-10 text-[#FFB000]">
            <Star size={120} fill="currentColor" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#FFB000]/10 border border-[#FFB000]/20 px-4 py-1.5 rounded-full">
              <Sparkles size={14} className="text-[#FFB000]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB000]">OFFRE DE LANCEMENT</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-3">
                <span className="text-gray-500 line-through text-2xl font-black italic">365€</span>
                <span className="text-5xl font-[950] text-white italic tracking-tighter">150€</span>
              </div>
              <p className="text-[#FFB000] text-[11px] font-black uppercase tracking-widest italic">Accès complet à l'application</p>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-6 px-2">
          <h3 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] italic">Inclus dans l’offre</h3>
          
          <div className="grid gap-4">
            {[
              "Accès à tous les lives de formation pendant 1 an",
              "Accès aux avantages LAYI (réductions hôtels, locations de voiture, etc.)",
              "Accès aux cadeaux",
              "Accès au programme de parrainage"
            ].map((feature, i) => (
              <div key={i} className="glass-card p-5 rounded-3xl border-white/5 flex items-start gap-4">
                <div className="w-8 h-8 bg-[#FFB000]/10 rounded-xl flex items-center justify-center text-[#FFB000] shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <p className="text-[12px] font-bold text-gray-300 uppercase tracking-tight leading-relaxed italic">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* WhatsApp Join Button */}
          <div className="pt-4">
            <button 
              onClick={() => {
                const message = encodeURIComponent("Bonjour, je souhaite devenir membre LAYI.");
                window.open(`https://wa.me/33757828250?text=${message}`, '_blank');
              }}
              className="w-full bg-[#25D366] text-white py-5 rounded-[24px] font-black uppercase text-[12px] tracking-widest shadow-[0_10px_30px_rgba(37,211,102,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <MessageSquare size={20} fill="currentColor" /> NOUS REJOINDRE
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 px-2">
          <button 
            onClick={onViewFormations}
            className="w-full bg-white text-black py-6 rounded-[28px] font-black uppercase text-[12px] tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Voir toutes les formations disponibles
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipOfferView;
