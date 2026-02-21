
import React from 'react';
import { ArrowLeft, Calendar, Lock, PlayCircle, PlusCircle, CheckCircle2, ChevronRight, Video } from 'lucide-react';

interface TrainingLivesViewProps {
  onBack: () => void;
  isMember: boolean;
  onLoginRequired: () => void;
}

const TrainingLivesView: React.FC<TrainingLivesViewProps> = ({ onBack, isMember, onLoginRequired }) => {
  const lives = [
    {
      id: 'l1',
      title: "Formation apporteur d’affaires (Formation Snapchat)",
      date: "Vendredi 20 Février",
      time: "21:30",
      description: "Apprenez les bases de la recommandation stratégique pour nos formations Snapchat."
    },
    {
      id: 'l2',
      title: "Formation apporteur (Création de site internet)",
      date: "Samedi 21 février",
      time: "21:30",
      description: "Atelier complet sur comment recommander nos services de création web."
    },
    {
      id: 'l3',
      title: "Formation apporteur d’affaires (Création association)",
      date: "Lundi 23 février",
      time: "21:30",
      description: "Apprenez à orienter les projets associatifs vers nos solutions spécialisées."
    }
  ];

  const handleAction = (e: React.MouseEvent, title: string, date: string, time: string) => {
    e.stopPropagation();
    if (isMember) {
      alert(`L'événement "${title}" du ${date} a été ajouté à votre calendrier.`);
    } else {
      onLoginRequired();
    }
  };

  const handleCardClick = () => {
    if (!isMember) {
      onLoginRequired();
    }
  };

  return (
    <div className="animate-in slide-in-from-right duration-500 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Retour Accueil</span>
      </button>

      <div className="space-y-8">
        <div className="px-1">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Prochains <span className="text-[#FFB000]">Lives Formation</span></h2>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic mt-1">Programme LAYI 2026</p>
        </div>

        <div className="space-y-6">
          {lives.map((live) => (
            <div 
              key={live.id}
              onClick={handleCardClick}
              className={`glass-card p-8 rounded-[40px] border-[#FFB000]/10 flex flex-col space-y-5 relative overflow-hidden transition-all duration-300 ${!isMember ? 'hover:border-[#FFB000]/40 cursor-pointer active:scale-[0.98]' : 'shadow-2xl'}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="bg-[#FFB000]/10 text-[#FFB000] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-[#FFB000]/20 flex items-center gap-1.5">
                    <Video size={12} /> DIRECT
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{live.date} — {live.time}</span>
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tight text-white leading-tight">{live.title}</h3>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide leading-relaxed italic">{live.description}</p>
              </div>

              <button 
                onClick={(e) => handleAction(e, live.title, live.date, live.time)}
                className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all ${isMember ? 'bg-[#FFB000] text-black shadow-lg shadow-[#FFB000]/20' : 'bg-white/5 text-gray-400 border border-white/10'}`}
              >
                {isMember ? (
                  <>
                    <PlusCircle size={16} /> Ajouter à mon calendrier
                  </>
                ) : (
                  <>
                    <Lock size={16} className="text-[#FFB000]" /> Se connecter pour s'inscrire
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingLivesView;
