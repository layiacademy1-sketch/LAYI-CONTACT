
import React from 'react';
import { View } from '../types';
import { ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  setView: (v: View) => void;
  isAdmin: boolean;
  setIsAdmin: (a: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isAdmin, setIsAdmin }) => {
  return (
    <header className="sticky top-0 bg-black/50 backdrop-blur-xl z-50 border-b border-white/5 py-4 px-6">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('home')}
        >
          <div className="bg-[#FFB000] w-8 h-8 rounded-lg flex items-center justify-center font-black text-black text-xl italic shadow-lg shadow-[#FFB000]/20">
            L
          </div>
          <span className="font-black text-lg tracking-tighter italic">LAYI <span className="text-[#FFB000]">CONTACT</span></span>
        </div>
        
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className={`p-2 rounded-full transition-colors ${isAdmin ? 'bg-[#FFB000]/20 text-[#FFB000]' : 'bg-white/5 text-gray-400'}`}
          title="Mode Admin"
        >
          <ShieldAlert size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
