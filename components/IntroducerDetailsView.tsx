
import React from 'react';
import { ArrowLeft, TrendingUp, Calendar, List, Award, Star } from 'lucide-react';
import { Introducer } from '../types';

interface IntroducerDetailsViewProps {
  introducer: Introducer;
  onBack: () => void;
}

const IntroducerDetailsView: React.FC<IntroducerDetailsViewProps> = ({ introducer, onBack }) => {
  const isGold = introducer.status === 'GOLD';

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Retour Accueil</span>
      </button>

      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className={`w-24 h-24 rounded-[40px] flex items-center justify-center text-white mx-auto shadow-2xl border border-white/10 font-black text-4xl italic ${introducer.gender === 'Femme' ? 'bg-pink-500/20 text-pink-500' : 'bg-blue-500/20 text-blue-500'}`}>
              {introducer.name[0]}
            </div>
            {/* Status Badge Overlay */}
            <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full border-2 border-black font-black text-[8px] uppercase tracking-widest shadow-xl flex items-center gap-1 ${isGold ? 'bg-[#FFB000] text-black' : 'bg-orange-800 text-white'}`}>
              {isGold ? <Star size={10} fill="black" /> : <Award size={10} />}
              {introducer.status}
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">{introducer.name}</h2>
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase text-[#FFB000] tracking-widest italic mt-1">
              <TrendingUp size={12} /> Apporteur(se) Certifié(e) {introducer.status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="glass-card p-6 rounded-[32px] border-[#FFB000]/20 bg-[#FFB000]/5 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <TrendingUp size={80} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Gains générés depuis le début</p>
            <p className="text-3xl font-black italic tracking-tighter text-[#FFB000]">{introducer.totalGains}</p>
          </div>

          <div className="glass-card p-6 rounded-[32px] border-white/5 space-y-2">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Date de début</p>
            </div>
            <p className="text-xl font-black italic tracking-tighter text-white">{introducer.startDate} 2026</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <List size={16} className="text-[#FFB000]" />
            <div className="flex flex-col">
              <h3 className="text-sm font-black uppercase italic tracking-widest">Type de service</h3>
              <p className="text-[8px] text-gray-500 font-black uppercase tracking-[0.2em]">Détail par catégorie</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {introducer.serviceGains.map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-[28px] border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
                <div className="flex flex-col gap-0.5">
                   <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">{item.service}</span>
                   <span className="text-[8px] text-[#FFB000] font-black uppercase italic tracking-widest">Service Actif</span>
                </div>
                <span className="text-lg font-black italic text-white tracking-tighter">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroducerDetailsView;
