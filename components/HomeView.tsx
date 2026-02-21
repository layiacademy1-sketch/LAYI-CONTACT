
import React, { useState } from 'react';
import { ChevronRight, Calendar, ShieldCheck, Sparkles, Video, Eye, Star, Search, Loader2, CheckCircle2, XCircle } from 'lucide-react';
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
}

const HomeView: React.FC<HomeViewProps> = ({ 
  onRegisterIntroducer, 
  onTrainingLivesClick, 
  onMemberAccessClick,
  onIntroducerDetails,
  onPresentationClick,
  onMembershipOfferClick,
  onAllFormationsClick,
  isMember = false
}) => {
  const [verifyPseudo, setVerifyPseudo] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'secured' | 'not_secured' | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyPseudo.trim()) return;

    setIsVerifying(true);
    setVerificationResult(null);

    // Simulate analysis
    setTimeout(() => {
      setIsVerifying(false);
      // Logic: If pseudo is in our trusted list (simulated) or matches certain "secured" criteria
      // For this demo, we'll make it "secured" if it's one of our known handles or has more than 5 chars
      // Adding 'feliccia_gul' as an example of a certified account (black star on yellow background)
      const trustedHandles = ['naslachiente', 'hachemi95', 'saveursyemma', 'le_zeyro', 'laplumedlr', 'hachime269', 'mendozatereza25', 'melli-creation', 'sophie-zina', 'saida-75', 'camillalougayne', 'sultan-92013', 'feliccia_gul'];
      const cleanPseudo = verifyPseudo.toLowerCase().replace('@', '');
      
      if (trustedHandles.includes(cleanPseudo)) {
        setVerificationResult('secured');
      } else {
        setVerificationResult('not_secured');
      }
    }, 2000);
  };

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

        {/* Security Check Section */}
        <div className="pt-6 space-y-4">
          <h3 className="text-[10px] text-white font-black uppercase tracking-[0.3em] italic px-2">Vérifier si mon compte est sécurisé</h3>
          
          <div className="glass-card p-6 rounded-[40px] border-white/10 bg-white/5 space-y-4 shadow-xl">
            <form onSubmit={handleVerify} className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#FFB000] transition-colors">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Entrez votre pseudo Snapchat..."
                value={verifyPseudo}
                onChange={(e) => setVerifyPseudo(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-[24px] py-5 pl-14 pr-32 text-[13px] font-bold text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FFB000]/50 focus:bg-white/10 transition-all italic"
              />
              <button 
                type="submit"
                disabled={isVerifying || !verifyPseudo.trim()}
                className="absolute right-2 top-2 bottom-2 px-6 bg-[#FFB000] text-black rounded-[18px] font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                {isVerifying ? <Loader2 size={16} className="animate-spin" /> : 'Vérifier'}
              </button>
            </form>

            {isVerifying && (
              <div className="flex flex-col items-center justify-center py-4 space-y-3 animate-pulse">
                <div className="flex items-center gap-2 text-[10px] text-[#FFB000] font-black uppercase tracking-widest italic">
                  <Loader2 size={14} className="animate-spin" />
                  Analyse du profil public...
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFB000] animate-[shimmer_2s_infinite]"></div>
                </div>
                <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest italic text-center">
                  Vérification du badge certifié (Étoile jaune), catégorie, ville et bio...
                </p>
              </div>
            )}

            {verificationResult === 'secured' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-[24px] flex items-center gap-4 animate-in zoom-in duration-300">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center relative">
                  <CheckCircle2 size={24} />
                  <div className="absolute -top-1 -right-1 bg-[#FFB000] text-black rounded-full p-0.5 shadow-lg">
                    <Star size={10} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase italic text-emerald-500 tracking-tight">Compte sécurisé</h4>
                  <p className="text-[9px] text-emerald-500/70 font-black uppercase tracking-widest italic">Profil certifié (Étoile jaune) ou présent dans notre base</p>
                </div>
              </div>
            )}

            {verificationResult === 'not_secured' && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-[24px] flex items-center gap-4 animate-in zoom-in duration-300">
                <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center">
                  <XCircle size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase italic text-red-500 tracking-tight">Compte non sécurisé</h4>
                  <p className="text-[9px] text-red-500/70 font-black uppercase tracking-widest italic">Merci de faire la demande dès maintenant pour éviter tout blocage ou suppression.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeView;
