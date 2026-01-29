
import React, { useState } from 'react';
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';

interface LoginViewProps {
  onLogin: (pseudo: string, pass: string) => boolean;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [pseudo, setPseudo] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    
    // Slight delay for effect
    setTimeout(() => {
      const success = onLogin(pseudo, pass);
      if (!success) {
        setError(true);
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-20 h-20 bg-[#FFB000]/10 rounded-[28px] flex items-center justify-center text-[#FFB000] mb-4">
            <User size={40} />
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">Espace <span className="text-[#FFB000]">Pro</span></h2>
          <p className="text-gray-400 text-sm font-medium">Connectez-vous pour gérer votre profil</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              required
              type="text"
              placeholder="Pseudo Snapchat"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value.replace('@', ''))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#FFB000] outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              required
              type="password"
              placeholder="Mot de passe"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#FFB000] outline-none transition-all"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center animate-shake">
              Identifiants incorrects
            </p>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full orange-gradient py-5 rounded-[28px] font-black text-black text-lg uppercase shadow-2xl shadow-[#FFB000]/20 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : (
              <>Se connecter <ArrowRight size={22} /></>
            )}
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          Mot de passe perdu ? Contactez l'admin
        </p>
      </div>
    </div>
  );
};

export default LoginView;
