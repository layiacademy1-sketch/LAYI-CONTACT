
import React from 'react';
import { ArrowLeft, CheckCircle2, MessageCircle, Rocket, Target, Zap, Globe, Users, Star, Sparkles } from 'lucide-react';

interface FormationInfoViewProps {
  onBack: () => void;
  formationImage?: string;
}

const FormationInfoView: React.FC<FormationInfoViewProps> = ({ onBack, formationImage }) => {
  const handleContactWhatsApp = () => {
    const message = encodeURIComponent("Bonjour LAYI, je viens de voir l'offre de formation SNAPCHAT sur l'application et je souhaiterais avoir plus d'informations.");
    window.open(`https://wa.me/33757828250?text=${message}`, '_blank');
  };

  const features = [
    { 
      title: "Stratégie Snapchat Professional", 
      desc: "Maîtrisez Snapchat. Apprenez à créer votre site web, vous lancer dans le e-commerce, développer votre entreprise et automatiser vos processus grâce aux nouveaux leviers technologiques." 
    },
    { title: "Personal Branding", desc: "Créez une image de marque forte et mémorable sur les réseaux." },
    { title: "Publicité (Ads)", desc: "Générez des leads qualifiés avec un budget optimisé sur Snapchat." },
    { title: "Productivité", desc: "Utilisez les meilleurs outils pour gagner du temps et de l'efficacité." }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter">Offre Formation</h2>
          <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-widest">SNAPCHAT 2026</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Header Hero */}
        <div className="relative aspect-[16/9] rounded-[48px] overflow-hidden shadow-2xl border border-white/10 group">
          {formationImage ? (
            <img src={formationImage} className="w-full h-full object-cover" alt="Formation Marketing" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-black to-[#222] flex items-center justify-center">
              <Rocket size={60} className="text-[#FFB000] animate-bounce" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8">
            <div className="bg-[#FFB000] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
              FORMATION PRO
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">L'EXPERT À VOS CÔTÉS</h1>
          </div>
        </div>

        {/* Intro Text */}
        <section className="px-2 text-center space-y-4">
          <p className="text-lg text-gray-200 font-medium italic leading-relaxed">
            "Maîtriser Snapchat n'est plus une option, c'est le moteur de votre réussite. Apprenez les méthodes qui marchent vraiment en 2026."
          </p>
          <div className="flex items-center justify-center gap-1 text-[#FFB000]">
            <Star size={14} fill="#FFB000" />
            <Star size={14} fill="#FFB000" />
            <Star size={14} fill="#FFB000" />
            <Star size={14} fill="#FFB000" />
            <Star size={14} fill="#FFB000" />
          </div>
        </section>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-4">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-6 rounded-[32px] border-white/5 flex items-start gap-4">
              <div className="bg-[#FFB000]/10 p-3 rounded-2xl text-[#FFB000]">
                {i === 0 && <Globe size={20} />}
                {i === 1 && <Target size={20} />}
                {i === 2 && <Zap size={20} />}
                {i === 3 && <Sparkles size={20} />}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-sm uppercase italic text-white">{f.title}</h4>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wide leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Why te lancer? Section */}
        <section className="glass-card p-8 rounded-[48px] bg-[#FFB000]/5 border-[#FFB000]/20 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-[#FFB000] rounded-xl flex items-center justify-center text-black">
               <Users size={20} />
             </div>
             <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Pourquoi nous choisir ?</h3>
          </div>
          
          <ul className="space-y-4">
            {[
              "Accompagnement personnalisé",
              "Accès illimité aux formations Snapchat à vie",
              "Accès à mon réseau de partenaires exclusifs",
              "Mise à jour constante selon les algorithmes"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                <CheckCircle2 size={18} className="text-[#FFB000] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA Button */}
        <div className="px-2 pt-4">
          <button 
            onClick={handleContactWhatsApp}
            className="w-full bg-green-600 hover:bg-green-500 text-white py-6 rounded-[32px] font-black text-lg uppercase shadow-2xl shadow-green-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <MessageCircle size={26} />
            S'inscrire maintenant
          </button>
          <p className="text-center text-[9px] text-gray-600 font-black uppercase tracking-[0.3em] mt-6">
            Places limitées chaque mois
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormationInfoView;
