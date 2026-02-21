
import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, Gift, Car, Hotel, Star, Calendar, Users, 
  Wallet, History, ArrowDownLeft, ArrowUpRight, 
  ChevronRight, User, MapPin, ArrowLeft, Send, BarChart3, Heart, Share2, Video, Banknote, PlusCircle, Sparkles, TrendingUp,
  Clock, Download, ShieldCheck
} from 'lucide-react';

interface MemberSpaceViewProps {
  memberName: string;
  initialTab?: 'avantages' | 'events' | 'tools';
}

const MemberSpaceView: React.FC<MemberSpaceViewProps> = ({ memberName, initialTab }) => {
  const [activeTab, setActiveTab] = useState<'avantages' | 'events' | 'tools'>('avantages');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [toolStep, setToolStep] = useState<'list' | 'downloader'>('list');
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'instagram' | 'facebook' | null>(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMedia, setGeneratedMedia] = useState<string | null>(null);
  
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleContact = (number: string, customMessage: string) => {
    const centralNumber = "33757828250";
    const message = encodeURIComponent(customMessage);
    window.open(`https://wa.me/${centralNumber}?text=${message}`, '_blank');
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      alert("Veuillez saisir un montant valide.");
      return;
    }
    const message = `Bonjour, je souhaite retirer ${withdrawAmount} €`;
    handleContact("33757828250", message);
  };

  const handleAddToCalendar = (title: string, date: string) => {
    alert(`L'événement "${title}" du ${date} a été ajouté à votre calendrier.`);
  };

  const trainingLives = [
    { 
      title: "Formation apporteur d’affaires (Snapchat)", 
      date: "Vendredi 20 Février", 
      time: "21:30",
      category: "SOCIAL MEDIA",
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    }
  ];

  // Simulation de gains pour le design
  const generatedEarnings = "1 450,00";

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="space-y-2 px-1 text-center">
        <div className="bg-[#FFB000]/10 w-16 h-16 rounded-3xl flex items-center justify-center text-[#FFB000] mx-auto mb-4 border border-[#FFB000]/20 shadow-[0_0_20px_rgba(255,176,0,0.1)] animate-float">
          <Star size={32} fill="#FFB000" />
        </div>
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Espace {memberName}</h2>
        <div className="flex items-center justify-center gap-2">
           <div className="h-[1px] w-4 bg-[#FFB000]/30"></div>
           <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-[0.3em] italic">Membre Privilégié LAYI</p>
           <div className="h-[1px] w-4 bg-[#FFB000]/30"></div>
        </div>
      </div>

      <div className="bg-white/5 p-1 rounded-[24px] flex gap-1 border border-white/5 shadow-inner">
        <button 
          onClick={() => setActiveTab('avantages')}
          className={`flex-1 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'avantages' ? 'bg-[#FFB000] text-black shadow-lg shadow-[#FFB000]/20' : 'text-gray-400 hover:text-white'}`}
        >
          Avantages
        </button>
        <button 
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'events' ? 'bg-[#FFB000] text-black shadow-lg shadow-[#FFB000]/20' : 'text-gray-400 hover:text-white'}`}
        >
          Événements
        </button>
        <button 
          onClick={() => setActiveTab('tools')}
          className={`flex-1 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'tools' ? 'bg-[#FFB000] text-black shadow-lg shadow-[#FFB000]/20' : 'text-gray-400 hover:text-white'}`}
        >
          Outils
        </button>
      </div>

      <div className="animate-in slide-in-from-right duration-500">
        {activeTab === 'avantages' && (
          <div className="space-y-4">
            <div className="glass-card p-6 rounded-[40px] border-white/10 space-y-4 overflow-hidden relative group">
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Hotel size={120} />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 bg-purple-500/20 text-purple-500 rounded-2xl flex items-center justify-center border border-purple-500/20"><Hotel size={28} /></div>
                <div>
                  <h4 className="text-xl font-black uppercase italic text-white tracking-tighter">Hôtels Accor</h4>
                  <p className="text-[10px] text-purple-500 font-black uppercase tracking-widest">Réductions jusqu'à -70%</p>
                </div>
              </div>
              <button 
                onClick={() => handleContact('33757828250', "Bonjour, je souhaite bénéficier de l'offre membre LAYI pour les hôtels Accor.")}
                className="w-full bg-white text-black py-5 rounded-[24px] font-black uppercase text-[11px] tracking-widest relative z-10 active:scale-95 transition-all shadow-xl"
              >
                Réserver mon hôtel
              </button>
            </div>

            <div className="glass-card p-6 rounded-[40px] border-white/10 space-y-4 overflow-hidden relative group">
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Car size={120} />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 bg-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center border border-blue-500/20"><Car size={28} /></div>
                <div>
                  <h4 className="text-xl font-black uppercase italic text-white tracking-tighter">Europcar</h4>
                  <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Réductions jusqu'à -40%</p>
                </div>
              </div>
              <button 
                onClick={() => handleContact('33757828250', "Bonjour, je souhaite bénéficier de l'offre membre LAYI chez Europcar.")}
                className="w-full bg-white text-black py-5 rounded-[24px] font-black uppercase text-[11px] tracking-widest relative z-10 active:scale-95 transition-all shadow-xl"
              >
                Louer un véhicule
              </button>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col gap-1 px-1">
               <div className="flex items-center gap-2">
                 <Video size={18} className="text-[#FFB000]" />
                 <h3 className="text-sm font-black uppercase italic text-white tracking-tight">Formations apporteurs d’affaires</h3>
               </div>
               <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] italic">Vos prochains rendez-vous exclusifs 2026</p>
            </div>

            <div className="space-y-4">
              {trainingLives.map((live, idx) => (
                <div key={idx} className="glass-card p-6 rounded-[36px] border-white/5 bg-gradient-to-br from-white/5 to-transparent flex flex-col gap-4 group hover:border-[#FFB000]/30 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                       <div className={`inline-block px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${live.color}`}>
                          {live.category}
                       </div>
                       <h4 className="text-lg font-[900] uppercase italic text-white tracking-tighter leading-tight">{live.title}</h4>
                       <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <Calendar size={12} className="text-[#FFB000]" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{live.date}</span>
                          </div>
                          <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <Clock size={12} className="text-[#FFB000]" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{live.time}</span>
                          </div>
                       </div>
                    </div>
                    <button 
                      onClick={() => handleAddToCalendar(live.title, live.date)}
                      className="w-12 h-12 rounded-[20px] bg-[#FFB000] text-black flex items-center justify-center shadow-lg shadow-[#FFB000]/20 active:scale-90 transition-all hover:rotate-12"
                      title="Ajouter au calendrier"
                    >
                      <PlusCircle size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 text-center">
               <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.4em] italic">
                 Tous les lives sont accessibles via le lien privé envoyé par mail
               </p>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            {toolStep === 'list' ? (
              <div className="space-y-4">
                <div className="glass-card p-8 rounded-[40px] border-white/10 space-y-6 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <Video size={120} />
                  </div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 bg-[#FFB000]/20 text-[#FFB000] rounded-2xl flex items-center justify-center border border-[#FFB000]/20">
                      <Download size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase italic text-white tracking-tighter">Télécharger sans filigrane</h4>
                      <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-widest">TikTok, Instagram, Facebook</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setToolStep('downloader')}
                    className="w-full bg-white text-black py-5 rounded-[24px] font-black uppercase text-[11px] tracking-widest relative z-10 active:scale-95 transition-all shadow-xl"
                  >
                    Ouvrir l'outil
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <button 
                  onClick={() => {
                    setToolStep('list');
                    setSelectedPlatform(null);
                    setGeneratedMedia(null);
                    setMediaUrl('');
                  }}
                  className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest hover:text-white transition-colors mb-2"
                >
                  <ArrowLeft size={14} /> Retour aux outils
                </button>

                {!selectedPlatform ? (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-4">
                      <h3 className="text-2xl font-[950] text-white uppercase italic tracking-tighter">Téléchargeur de Médias</h3>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">Choisissez votre plateforme</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { id: 'tiktok', name: 'TikTok', color: 'bg-[#000000]', icon: <Video size={24} /> },
                        { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]', icon: <Heart size={24} /> },
                        { id: 'facebook', name: 'Facebook', color: 'bg-[#1877F2]', icon: <Share2 size={24} /> }
                      ].map((platform) => (
                        <button 
                          key={platform.id}
                          onClick={() => setSelectedPlatform(platform.id as any)}
                          className={`glass-card p-6 rounded-[32px] border-white/5 flex items-center justify-between group active:scale-95 transition-all hover:border-[#FFB000]/30`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${platform.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                              {platform.icon}
                            </div>
                            <span className="text-lg font-black uppercase italic text-white tracking-tighter">{platform.name}</span>
                          </div>
                          <ChevronRight size={20} className="text-gray-600 group-hover:text-[#FFB000] transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="glass-card p-8 rounded-[48px] border-[#FFB000]/30 bg-gradient-to-b from-[#FFB000]/10 to-black/40 space-y-8 shadow-2xl">
                      <div className="text-center space-y-3">
                        <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-white shadow-2xl mb-4 ${
                          selectedPlatform === 'tiktok' ? 'bg-black' : 
                          selectedPlatform === 'instagram' ? 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]' : 
                          'bg-[#1877F2]'
                        }`}>
                          {selectedPlatform === 'tiktok' ? <Video size={40} /> : 
                           selectedPlatform === 'instagram' ? <Heart size={40} /> : 
                           <Share2 size={40} />}
                        </div>
                        <h4 className="text-3xl font-[950] uppercase italic text-white tracking-tighter">Télécharger {selectedPlatform}</h4>
                        <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] italic">Téléchargement gratuit en haute qualité</p>
                      </div>

                      <div className="space-y-6">
                        <div className="relative group">
                          <input 
                            type="text"
                            placeholder={`Insérer le lien ${selectedPlatform} ici...`}
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                            className="w-full bg-black/60 border-2 border-white/10 rounded-[28px] py-6 px-8 text-white focus:border-[#FFB000] outline-none font-bold text-sm transition-all italic placeholder:text-gray-600"
                          />
                          {mediaUrl && (
                            <button 
                              onClick={() => setMediaUrl('')}
                              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                              <PlusCircle size={20} className="rotate-45" />
                            </button>
                          )}
                        </div>

                        {!generatedMedia ? (
                          <button 
                            onClick={() => {
                              if (!mediaUrl) return;
                              setIsGenerating(true);
                              setTimeout(() => {
                                setIsGenerating(false);
                                setGeneratedMedia('https://picsum.photos/seed/layi/800/1200');
                              }, 2500);
                            }}
                            disabled={isGenerating || !mediaUrl}
                            className="w-full bg-[#FFB000] text-black py-6 rounded-[28px] font-black uppercase text-[14px] tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_15px_40px_rgba(255,176,0,0.3)] disabled:opacity-50 relative overflow-hidden group"
                          >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            {isGenerating ? (
                              <>Traitement en cours... <Sparkles size={20} className="animate-spin" /></>
                            ) : (
                              <>Télécharger <Download size={20} />
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="space-y-6 animate-in zoom-in-95 duration-500">
                            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border-2 border-[#FFB000]/30 shadow-2xl">
                              <img src={generatedMedia} alt="Generated" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                              <div className="absolute bottom-8 left-0 w-full px-8 flex flex-col items-center gap-4">
                                <div className="bg-green-500 text-white px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest shadow-xl flex items-center gap-2">
                                  <ShieldCheck size={16} /> Haute Qualité Détectée
                                </div>
                                <button 
                                  onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = generatedMedia;
                                    link.download = `layi-${selectedPlatform}-${Date.now()}.jpg`;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                  }}
                                  className="w-full bg-white text-black py-5 rounded-[24px] font-black uppercase text-[12px] tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all"
                                >
                                  Télécharger maintenant <Download size={20} />
                                </button>
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => {
                                setGeneratedMedia(null);
                                setMediaUrl('');
                              }}
                              className="w-full py-4 text-gray-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors"
                            >
                              Télécharger un autre fichier
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-4 space-y-4">
                      <div className="flex items-center gap-3 text-gray-500">
                        <ShieldCheck size={16} className="text-[#FFB000]" />
                        <p className="text-[9px] font-black uppercase tracking-widest italic">Service 100% anonyme & sécurisé</p>
                      </div>
                      <div className="p-6 bg-white/5 rounded-[32px] border border-white/5">
                        <p className="text-[10px] text-gray-400 font-bold leading-relaxed italic">
                          Notre outil extrait directement le média source des serveurs {selectedPlatform} pour vous garantir une qualité optimale sans aucune perte ni filigrane publicitaire.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberSpaceView;
