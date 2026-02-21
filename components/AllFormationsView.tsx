
import React from 'react';
import { ArrowLeft, BookOpen, ChevronRight, Sparkles, Zap, Globe, Palette, Users, TrendingUp, MessageSquare } from 'lucide-react';

interface AllFormationsViewProps {
  onBack: () => void;
}

const AllFormationsView: React.FC<AllFormationsViewProps> = ({ onBack }) => {
  const formations = [
    { title: "Formation Snapchat", icon: <Zap size={24} />, color: "bg-yellow-500" },
    { title: "Formation création de site internet", icon: <Globe size={24} />, color: "bg-blue-500" },
    { title: "Formation création de logo", icon: <Palette size={24} />, color: "bg-pink-500" },
    { title: "Formation création d’association", icon: <Users size={24} />, color: "bg-green-500" },
    { title: "Formation développement de projet", icon: <TrendingUp size={24} />, color: "bg-purple-500" },
    { title: "Formation stratégie digitale", icon: <BookOpen size={24} />, color: "bg-indigo-500" },
    { title: "Formation communication et visibilité", icon: <MessageSquare size={24} />, color: "bg-orange-500" },
  ];

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
          <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">Toutes les formations</h2>
          <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-widest italic">Catalogue complet 2026</p>
        </div>
      </div>

      <div className="space-y-6 px-1">
        <div className="grid gap-4">
          {formations.map((formation, i) => (
            <div 
              key={i}
              className="glass-card p-6 rounded-[32px] border-white/5 flex items-center justify-between group hover:border-[#FFB000]/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 ${formation.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {formation.icon}
                </div>
                <h3 className="text-[14px] font-black uppercase italic tracking-tight text-white leading-tight">
                  {formation.title}
                </h3>
              </div>
              <ChevronRight size={20} className="text-gray-600 group-hover:text-[#FFB000] group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-10 glass-card p-8 rounded-[40px] border-[#FFB000]/20 bg-gradient-to-br from-[#FFB000]/5 to-transparent text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFB000]/10 px-4 py-1.5 rounded-full">
            <Sparkles size={14} className="text-[#FFB000]" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#FFB000]">NOUVEAUTÉ</span>
          </div>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed italic">
            De nouvelles formations sont ajoutées chaque mois pour nos membres.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllFormationsView;
