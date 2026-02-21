
import React from 'react';
import { ArrowLeft, CheckCircle2, Sparkles, Star, Zap, MessageSquare } from 'lucide-react';

interface PresentationViewProps {
  onBack: () => void;
  onJoinMember: () => void;
}

const PresentationView: React.FC<PresentationViewProps> = ({ onBack }) => {
  const handleRegister = () => {
    const message = encodeURIComponent("Bonjour, j’aimerais avoir plus de renseignements afin de pouvoir m’inscrire à la formation.");
    window.open(`https://wa.me/33757828250?text=${message}`, '_blank');
  };

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
          <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">Formation Snapchat</h2>
          <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-widest italic">L'expertise N°1 en France</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Pricing Card */}
        <div className="glass-card p-8 rounded-[48px] border-4 bg-black animate-gold-border relative overflow-hidden text-center">
          <div className="absolute -top-10 -right-10 opacity-10 text-[#FFB000]">
            <Zap size={120} fill="currentColor" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#FFB000]/10 border border-[#FFB000]/20 px-4 py-1.5 rounded-full">
              <Sparkles size={14} className="text-[#FFB000]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB000]">OFFRE EXCLUSIVE</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-3">
                <span className="text-gray-500 line-through text-2xl font-black italic">365€</span>
                <span className="text-5xl font-[950] text-white italic tracking-tighter">250€</span>
              </div>
              <p className="text-[#FFB000] text-[11px] font-black uppercase tracking-widest italic">Devenez un expert snapchat</p>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-6 px-2">
          <div className="relative p-8 rounded-[40px] border border-[#FFB000]/30 bg-gradient-to-b from-[#FFB000]/5 to-transparent overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFB000]/50 to-transparent"></div>
            
            <h3 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] italic mb-8 text-center">Inclus dans la formation</h3>
            
            <div className="grid gap-3">
              {[
                "Passage du compte Snapchat en compte professionnel",
                "Sécurisation du compte Snapchat pour éviter toute perte en cas de signalement",
                "Personnalisation du profil public",
                "Explication des nouvelles options",
                "Méthodes pour apparaître dans les tendances",
                "Méthodes pour obtenir plus d’abonnés",
                "Méthodes pour atteindre la monétisation",
                "Méthode pour demander la certification (si éligible) ⭐",
                "Méthodes pour créer du bon contenu",
                "Accès à l’application et à l’espace membre Layi",
                "Accès aux différents lives de formation pour rester informé des nouveautés Snapchat",
                "Accès à nos avantages partenaires (réductions hôtel, location de voiture, etc.)"
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4 py-2 border-b border-white/5 last:border-0">
                  <div className="w-5 h-5 bg-[#FFB000]/10 rounded-full flex items-center justify-center text-[#FFB000] shrink-0 mt-0.5">
                    <CheckCircle2 size={12} />
                  </div>
                  <p className="text-[11px] font-bold text-gray-300 uppercase tracking-tight leading-relaxed italic">
                    {feature.includes('⭐') ? (
                      <>
                        Méthode pour demander la certification (si éligible) <span className="text-yellow-400 animate-pulse inline-block ml-1">★</span>
                      </>
                    ) : feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 px-2">
          <button 
            onClick={handleRegister}
            className="button-glow w-full bg-[#FFB000] text-black py-6 rounded-[28px] font-black uppercase text-[13px] tracking-[0.2em] active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden shadow-[0_10px_40px_rgba(255,176,0,0.3)]"
          >
            <MessageSquare size={20} fill="currentColor" />
            <span className="relative z-10">S’inscrire</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentationView;
