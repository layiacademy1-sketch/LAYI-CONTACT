import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ChevronRight, Eye, EyeOff } from 'lucide-react';

interface MemberAccessViewProps {
  onValidated: (name: string) => void;
}

const MemberAccessView: React.FC<MemberAccessViewProps> = ({ onValidated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pass = password.trim();

    // Vérification : 1212
    if (pass === '1212') {
      onValidated('Membre');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-in fade-in duration-700">
      <div className="glass-card p-10 rounded-[40px] w-full max-w-sm space-y-8 text-center border-white/10 relative overflow-hidden">
        <div className="mx-auto w-20 h-20 bg-[#FFB000]/10 rounded-3xl flex items-center justify-center text-[#FFB000] shadow-inner">
          <Lock size={36} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Accès <span className="text-[#FFB000]">Membre</span></h2>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-relaxed">
            Identifiez-vous pour entrer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Code d'accès"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-12 text-white focus:ring-2 focus:ring-[#FFB000] outline-none transition-all font-bold tracking-[0.3em] text-lg text-center"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          {error && (
            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Code incorrect</p>
          )}

          <button 
            type="submit"
            className="w-full orange-gradient py-5 rounded-2xl font-black text-black uppercase text-sm tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-xl shadow-[#FFB000]/20"
          >
            Se connecter <ChevronRight size={18} />
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 pt-4">
          <ShieldCheck size={14} className="text-gray-600" />
          <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest italic">Authentification Sécurisée</span>
        </div>
      </div>
    </div>
  );
};

export default MemberAccessView;