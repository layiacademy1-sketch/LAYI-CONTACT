
import React, { useState, useEffect } from 'react';
import { ListTodo, Euro, Gift, CheckCircle2, LayoutDashboard, TrendingUp, Calendar, LogOut, MessageCircle, Wallet, User, MapPin, Phone, ChevronDown, Info, Mail, ShieldCheck, History, ArrowDownLeft, ArrowUpRight, BarChart3, Heart, CalendarRange, Clock, ArrowLeft, Palmtree, ChevronRight, Users, FileSpreadsheet, Film } from 'lucide-react';
import { AdminIndividualData, HistoryEntry } from '../types';

interface IndividualAdminViewProps {
  adminName: string;
  onLogout: () => void;
}

type TabType = 'tasks' | 'amounts' | 'outings';
type AmountsSubView = 'summary' | 'monthly_details';

const IndividualAdminView: React.FC<IndividualAdminViewProps> = ({ adminName, onLogout }) => {
  const isHajar = adminName.toLowerCase() === 'hajar';
  const isRabab = adminName.toLowerCase() === 'rabab';
  const isDjo = adminName.toLowerCase() === 'djo';
  const isSaida = adminName.toLowerCase() === 'saida';

  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const [amountsSubView, setAmountsSubView] = useState<AmountsSubView>('summary');
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [openClientId, setOpenClientId] = useState<string | null>(null);
  
  // States for outings navigation
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const [data] = useState<AdminIndividualData>(() => {
    const saved = localStorage.getItem(`layi_admin_data_${adminName.toLowerCase()}`);
    if (saved) return JSON.parse(saved);

    const defaultData: AdminIndividualData = {
      tasks: [],
      amounts: { week: 0, month: 0, year: 0 },
      monthlyBreakdown: { "Janvier": 0, "Février": 0 },
      history: [],
      bonuses: []
    };

    if (adminName.toLowerCase() === 'rabab') {
      defaultData.amounts.year = 480;
      defaultData.amounts.month = 480;
      defaultData.amounts.week = 40; 
      defaultData.monthlyBreakdown = {
        "Janvier": 480, "Février": 0, "Mars": 0, "Avril": 0, "Mai": 0, "Juin": 0,
        "Juillet": 0, "Août": 0, "Septembre": 0, "Octobre": 0, "Novembre": 0, "Décembre": 0
      };
      defaultData.history = [
        { id: 'h8', type: 'withdrawal', label: 'Retrait', amount: 40, date: new Date('2026-01-30').getTime() },
        { id: 'h7', type: 'received', label: 'Reçu', amount: 40, date: new Date('2026-01-30').getTime() },
        { id: 'h1', type: 'received', label: 'Reçu', amount: 40, date: new Date('2026-01-20').getTime() },
        { id: 'h2', type: 'withdrawal', label: 'Retrait', amount: 40, date: new Date('2026-01-20').getTime() },
        { id: 'h3', type: 'received', label: 'Reçu', amount: 120, date: new Date('2026-01-18').getTime() },
        { id: 'h4', type: 'withdrawal', label: 'Retrait', amount: 120, date: new Date('2026-01-18').getTime() },
        { id: 'h5', type: 'received', label: 'Reçu', amount: 120, date: new Date('2026-01-10').getTime() },
        { id: 'h6', type: 'withdrawal', label: 'Retrait', amount: 120, date: new Date('2026-01-10').getTime() },
      ];
    }

    return defaultData;
  });

  const totalBonuses = data.bonuses ? data.bonuses.reduce((acc, b) => acc + b.amount, 0) : 0;

  const handleWithdrawRequest = () => {
    const LAYI_WHATSAPP = "33757828250";
    const message = encodeURIComponent(`Bonjour LAYI, c'est ${adminName}. Je souhaiterais demander le retrait de ma prime d'un montant total de ${totalBonuses} €.`);
    window.open(`https://wa.me/${LAYI_WHATSAPP}?text=${message}`, '_blank');
  };

  const rababClients = [
    { id: 'rc1', name: 'Andronic Andreia', email: 'smm@monaco.mc', invoice: '150 €', status: 'Payé', factureInfo: 'Formation snapchat' },
    { id: 'rc2', name: 'Antoine Absoir', email: 'gari35975@gmail.com', invoice: '250 €', status: 'Payé', factureInfo: 'Formation snapchat' },
    { 
      id: 'rc3', 
      name: 'Anaelle Tournier', 
      email: 'okurtos3300@gmail.com', 
      phone: '06 08 63 06 44', 
      invoice: '250 €', 
      status: 'Payé',
      excelLines: [
        { label: "Création de site", amount: "250 €" },
        { label: "Hébergement inclus pour 1 an", amount: "0 €" },
        { label: "Nom de domaine inclus pour 1 an", amount: "0 €" }
      ]
    },
    { id: 'rc4', name: 'Kadoussi Fouadi', email: 'fouadikadoussi@gmail.com', invoice: '250 €', status: 'Payé', factureInfo: 'Formation snapchat' },
  ];

  const sortedHistory = [...(data.history || [])].sort((a, b) => {
    if (b.date !== a.date) return b.date - a.date;
    return a.type === 'withdrawal' ? -1 : 1;
  }).slice(0, 20);

  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  
  const februaryOutings = [
    { id: 'feb-6', label: '6 Février', color: 'bg-rose-500' },
    { id: 'feb-7', label: '7 Février', color: 'bg-[#FFB000]' }
  ].filter(outing => !(isSaida && outing.id === 'feb-6'));

  const scheduleFeb6 = [
    { time: '09h30', title: 'remise cadeau', desc: 'remise cadeau dans la voiture', icon: <Gift size={16} /> },
    { time: '10h00', title: isDjo ? 'Déjeuner avec Hajar' : 'Déjeuner avec Djo', desc: 'Lieu à définir', icon: <Utensils size={16} /> },
    { time: '10h35', title: 'Cinéma', desc: 'Film : La femme de ménage (à confirmer)', icon: <Film size={16} /> },
    { time: '13h30', title: 'Pause Repas', desc: 'Lieu à définir', icon: <Palmtree size={16} /> },
    { time: '15h00', title: 'shopping', desc: 'à définir', icon: <ShoppingBag size={16} /> },
  ];

  const scheduleFeb7 = [
    { time: '19h00', title: 'Rencontre membre LAYI à paris', desc: 'Lieu à confirmer', icon: <Users size={16} /> },
  ];

  const getOutingPartner = () => {
    if (isHajar) return 'Djo';
    if (isDjo) return 'Hajar';
    if (isSaida) return 'LAYI';
    return 'Djo';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FFB000]/10 rounded-2xl flex items-center justify-center border border-[#FFB000]/20">
            <LayoutDashboard className="text-[#FFB000]" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">Espace {adminName}</h2>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={10} className="text-[#FFB000]" />
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">Dashboard Sécurisé</p>
            </div>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20 transition-all active:scale-90"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/5 p-1.5 rounded-[24px] flex gap-1 border border-white/5 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => { setActiveTab('tasks'); setAmountsSubView('summary'); }}
          className={`shrink-0 flex-1 py-4 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'tasks' ? 'bg-[#FFB000] text-black shadow-lg shadow-[#FFB000]/20' : 'text-gray-400'}`}
        >
          <ListTodo size={14} /> Tâches
        </button>
        {!isDjo && (
          <button 
            onClick={() => setActiveTab('amounts')}
            className={`shrink-0 flex-1 py-4 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'amounts' ? 'bg-[#FFB000] text-black shadow-lg shadow-[#FFB000]/20' : 'text-gray-400'}`}
          >
            <Euro size={14} /> Montant
          </button>
        )}
        {(isHajar || isDjo || isSaida) && (
          <button 
            onClick={() => setActiveTab('outings')}
            className={`shrink-0 flex-1 py-4 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'outings' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-gray-400'}`}
          >
            <Heart size={14} /> Sorties
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="animate-in slide-in-from-right duration-500">
        {/* Onglet Sorties (Hajar, Djo & Saida) */}
        {activeTab === 'outings' && (isHajar || isDjo || isSaida) && (
          <div className="space-y-6">
             {/* Fil d'ariane / Retour */}
             <div className="flex items-center justify-between px-1">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Sorties avec <span className="text-rose-500">{getOutingPartner()}</span></h3>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">Planning & Moments Partagés</p>
                </div>
                {(selectedMonth || selectedDay) && (
                  <button 
                    onClick={() => {
                      if (selectedDay) setSelectedDay(null);
                      else if (selectedMonth) setSelectedMonth(null);
                    }}
                    className="p-2 bg-white/5 rounded-xl text-gray-400"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
             </div>

             {/* Niveau 1 : Liste des mois (Excluant Janvier pour les sorties) */}
             {!selectedMonth && (
               <div className="grid grid-cols-2 gap-3">
                 {months.filter(m => m !== 'Janvier').map(m => (
                   <button 
                     key={m} 
                     onClick={() => setSelectedMonth(m)}
                     className="glass-card p-6 rounded-[32px] border-white/5 text-center group active:scale-95 transition-all hover:bg-rose-500/10 hover:border-rose-500/30"
                   >
                     <CalendarRange className="mx-auto mb-2 text-rose-500 opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
                     <span className="text-sm font-black uppercase italic text-white tracking-tighter">{m}</span>
                   </button>
                 ))}
               </div>
             )}

             {/* Niveau 2 : Dossiers du mois */}
             {selectedMonth && !selectedDay && (
               <div className="space-y-4">
                 <div className="bg-rose-500/10 p-4 rounded-2xl border border-rose-500/20 text-center">
                    <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest">Mois de {selectedMonth} 2026</span>
                 </div>
                 
                 {selectedMonth === "Février" ? (
                    <div className="grid grid-cols-1 gap-3">
                       {februaryOutings.map(outing => (
                         <button 
                          key={outing.id}
                          onClick={() => setSelectedDay(outing.id)}
                          className="glass-card p-6 rounded-[32px] border-white/5 flex items-center justify-between group active:scale-95 transition-all hover:bg-rose-500/5"
                         >
                           <div className="flex items-center gap-4">
                             <div className={`w-12 h-12 ${outing.color} rounded-2xl flex items-center justify-center text-black shadow-lg`}>
                               <Calendar size={24} />
                             </div>
                             <span className="text-lg font-black uppercase italic text-white tracking-tighter">{outing.label}</span>
                           </div>
                           <ChevronDown size={20} className="text-gray-600 -rotate-90" />
                         </button>
                       ))}
                    </div>
                 ) : (
                    <div className="text-center py-20 opacity-30 italic font-black uppercase text-[10px] tracking-widest">
                      Aucun événement prévu pour ce mois
                    </div>
                 )}
               </div>
             )}

             {/* Niveau 3 : Planning de la journée */}
             {selectedDay === "feb-6" && !isSaida && (
               <div className="space-y-6 animate-in slide-in-from-bottom-4">
                  <div className="glass-card p-8 rounded-[40px] border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-transparent flex flex-col items-center text-center space-y-2">
                     <div className="w-16 h-16 bg-rose-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-rose-500/20 mb-2">
                        <Heart size={32} />
                     </div>
                     <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">Vendredi 6 Février</h4>
                     <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest">Une journée avec {getOutingPartner()}</p>
                  </div>

                  <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-500/20">
                     {scheduleFeb6.map((item, idx) => (
                       <div key={idx} className="relative group">
                          <div className="absolute -left-6.5 top-2 w-3.5 h-3.5 rounded-full border-2 border-black bg-rose-500 z-10 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                          
                          <div className="glass-card p-5 rounded-[28px] border-white/5 bg-white/2 hover:bg-rose-500/5 transition-all">
                             <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest flex items-center gap-1.5">
                                   <Clock size={12} /> {item.time}
                                </span>
                                <div className="text-gray-600 group-hover:text-rose-500 transition-colors">
                                   {item.icon}
                                </div>
                             </div>
                             <h5 className="text-sm font-black uppercase italic text-white tracking-tight">{item.title}</h5>
                             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 italic">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             )}

             {selectedDay === "feb-7" && (
               <div className="space-y-6 animate-in slide-in-from-bottom-4">
                  <div className="glass-card p-8 rounded-[40px] border-rose-500/20 bg-gradient-to-br from-[#FFB000]/10 to-transparent flex flex-col items-center text-center space-y-2">
                     <div className="w-16 h-16 bg-[#FFB000] rounded-3xl flex items-center justify-center text-black shadow-xl shadow-[#FFB000]/20 mb-2">
                        <Heart size={32} />
                     </div>
                     <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">Samedi 7 Février</h4>
                     <p className="text-[10px] text-[#FFB000] font-black uppercase tracking-widest">Planning de la soirée</p>
                  </div>

                  <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-500/20">
                     {scheduleFeb7.map((item, idx) => (
                       <div key={idx} className="relative group">
                          <div className="absolute -left-6.5 top-2 w-3.5 h-3.5 rounded-full border-2 border-black bg-[#FFB000] z-10 shadow-[0_0_10px_rgba(255,176,0,0.5)]"></div>
                          
                          <div className="glass-card p-5 rounded-[28px] border-white/5 bg-white/2 hover:bg-[#FFB000]/5 transition-all">
                             <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black uppercase text-[#FFB000] tracking-widest flex items-center gap-1.5">
                                   <Clock size={12} /> {item.time}
                                </span>
                                <div className="text-gray-600 group-hover:text-[#FFB000] transition-colors">
                                   {item.icon}
                                </div>
                             </div>
                             <h5 className="text-sm font-black uppercase italic text-white tracking-tight">{item.title}</h5>
                             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 italic">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             )}
          </div>
        )}

        {/* Onglet 1 : Tâches à effectuer */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1 mb-2">
                <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Dossiers & Tâches assignées</h4>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <div className="w-1.5 h-1.5 bg-[#FFB000] rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Lecture seule</span>
                </div>
              </div>
              
              {isHajar && (
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'hc1', title: 'Client 1 pour site', location: 'Belgique', whatsapp: '0485 60 44 01', waLink: '32485604401' },
                    { 
                      id: 'hc2', 
                      title: 'Client 2 pour site', 
                      whatsapp: '07 68 57 99 93', 
                      waLink: '33768579993', 
                      description: 'Son frère a déjà payé depuis longtemps, mais elle était occupée. Elle nous avait indiqué qu’elle nous contacterait en janvier pour la création du site. Pour le moment, il s’agit simplement de récupérer les informations nécessaires à la réalisation du site.' 
                    },
                    { 
                      id: 'hc3', 
                      title: 'Client 3 pour site', 
                      whatsapp: '07 66 56 44 87', 
                      waLink: '33766564487', 
                      description: 'Nom : THE NMB. Il nous a demandé en janvier de renvoyer le devis. Je l’ai renvoyé sur Snapchat, mais depuis il nous a dit qu’il nous tiendrait informés. Étant donné que nous sommes à la fin du mois, il faut envoyer un message sur WhatsApp pour vérifier ce qu’il en est.' 
                    }
                  ].map((client) => {
                    const isOpen = openClientId === client.id;
                    return (
                      <div key={client.id} className={`glass-card rounded-[32px] border-[#FFB000]/30 overflow-hidden transition-all duration-500 ${isOpen ? 'bg-[#FFB000]/5' : 'bg-white/5'}`}>
                        <button onClick={() => setOpenClientId(isOpen ? null : client.id)} className="w-full flex items-center justify-between p-5 text-left">
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-[#FFB000] text-black' : 'bg-[#FFB000]/10 text-[#FFB000]'}`}>
                              <Info size={18} />
                            </div>
                            <p className="text-sm font-black uppercase italic tracking-tight text-white">{client.title}</p>
                          </div>
                          <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
                            <div className="h-px bg-white/5 w-full"></div>
                            <div className="space-y-3">
                              {client.location && (
                                <div className="flex items-center gap-3">
                                  <MapPin size={14} className="text-[#FFB000]" />
                                  <p className="text-[11px] text-gray-400 font-black uppercase">Localisation : <span className="text-white">{client.location}</span></p>
                                </div>
                              )}
                              <div className="flex items-center gap-3">
                                <Phone size={14} className="text-green-500" />
                                <p className="text-[11px] text-gray-400 font-black uppercase">WhatsApp : <span className="text-white">{client.whatsapp}</span></p>
                              </div>
                              {client.description && (
                                <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Description</p>
                                  <p className="text-[11px] text-white leading-relaxed italic">{client.description}</p>
                                </div>
                              )}
                              <button onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${client.waLink}`, '_blank'); }} className="w-full bg-[#FFB000]/20 text-[#FFB000] py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest mt-2 border border-[#FFB000]/10 hover:bg-[#FFB000]/30 transition-all">
                                Lancer la discussion
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {isRabab && (
                <div className="space-y-3 mb-6">
                  {rababClients.map((client: any) => {
                    const isOpen = openClientId === client.id;
                    return (
                      <div key={client.id} className={`glass-card rounded-[32px] border-[#FFB000]/30 overflow-hidden transition-all duration-500 ${isOpen ? 'bg-[#FFB000]/5' : 'bg-white/5'}`}>
                        <button onClick={() => setOpenClientId(isOpen ? null : client.id)} className="w-full flex items-center justify-between p-5 text-left">
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-[#FFB000] text-black' : 'bg-[#FFB000]/10 text-[#FFB000]'}`}>
                              <User size={18} />
                            </div>
                            <p className="text-sm font-black uppercase italic tracking-tight text-white">{client.name}</p>
                          </div>
                          <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
                            <div className="h-px bg-white/5 w-full"></div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Mail size={14} className="text-[#FFB000]" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-0.5">E-mail</p>
                                  <a href={`mailto:${client.email}`} className="text-xs text-white font-bold truncate block">{client.email}</a>
                                </div>
                              </div>
                              {client.phone && (
                                <div className="flex items-center gap-3">
                                  <Phone size={14} className="text-green-500" />
                                  <div className="flex-1">
                                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-0.5">Téléphone</p>
                                    <a href={`tel:${client.phone.replace(/\s/g, '')}`} className="text-xs text-white font-bold">{client.phone}</a>
                                  </div>
                                </div>
                              )}
                              {(client.invoice || client.status || client.note || client.factureInfo || client.excelLines) && (
                                <div className="flex flex-col gap-1 pl-7">
                                  {client.invoice && (
                                    <p className="text-[11px] text-gray-400 font-black uppercase">Facture à faire : <span className="text-white">{client.invoice}</span></p>
                                  )}
                                  
                                  {client.excelLines && (
                                    <div className="mt-2 space-y-1.5 border-t border-white/5 pt-2">
                                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1 italic">Infos pour la facture :</p>
                                      {client.excelLines.map((line: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center text-[11px]">
                                          <span className="text-gray-400 font-black uppercase">- {line.label} :</span>
                                          <span className="text-white font-black italic">{line.amount}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {client.factureInfo && (
                                    <p className="text-[11px] text-gray-400 font-black uppercase">Infos pour la facture : <span className="text-[#FFB000] italic">{client.factureInfo}</span></p>
                                  )}
                                  {client.note && (
                                    <p className="text-[11px] text-[#FFB000] font-black uppercase italic flex items-center gap-1.5">
                                      <FileSpreadsheet size={12} /> {client.note}
                                    </p>
                                  )}
                                  {client.status && (
                                    <p className="text-[11px] text-gray-400 font-black uppercase">Statut : <span className="text-green-500 font-black">{client.status}</span></p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {isDjo && (
                <div className="space-y-3 mb-6">
                  {[
                    { 
                      id: 'dc1', 
                      title: 'Client 1 pour site', 
                      name: 'HACHIM Moeva', 
                      description: 'Site internet à faire', 
                      contact: 'Snapchat LE H' 
                    }
                  ].map((client) => {
                    const isOpen = openClientId === client.id;
                    return (
                      <div key={client.id} className={`glass-card rounded-[32px] border-[#FFB000]/30 overflow-hidden transition-all duration-500 ${isOpen ? 'bg-[#FFB000]/5' : 'bg-white/5'}`}>
                        <button onClick={() => setOpenClientId(isOpen ? null : client.id)} className="w-full flex items-center justify-between p-5 text-left">
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-[#FFB000] text-black' : 'bg-[#FFB000]/10 text-[#FFB000]'}`}>
                              <Info size={18} />
                            </div>
                            <p className="text-sm font-black uppercase italic tracking-tight text-white">{client.title}</p>
                          </div>
                          <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
                            <div className="h-px bg-white/5 w-full"></div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <User size={14} className="text-[#FFB000]" />
                                <p className="text-[11px] text-gray-400 font-black uppercase">Nom : <span className="text-white">{client.name}</span></p>
                              </div>
                              <div className="flex items-center gap-3">
                                <MessageCircle size={14} className="text-yellow-400" />
                                <p className="text-[11px] text-gray-400 font-black uppercase">Coordonnées : <span className="text-white">{client.contact}</span></p>
                              </div>
                              {client.description && (
                                <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Description</p>
                                  <p className="text-[11px] text-white leading-relaxed italic">{client.description}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {data.tasks.map((task) => (
                <div key={task.id} className={`glass-card p-5 rounded-[32px] border border-white/5 flex items-center justify-between gap-4 transition-all ${task.completed ? 'opacity-40' : 'opacity-100'}`}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${task.completed ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-600 border border-white/10'}`}>
                      <CheckCircle2 size={18} />
                    </div>
                    <p className={`text-sm font-bold uppercase italic tracking-tight ${task.completed ? 'line-through' : 'text-white'}`}>{task.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Onglet 2 : Montant généré & Historique (Masqué pour Djo) */}
        {activeTab === 'amounts' && !isDjo && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {amountsSubView === 'summary' ? (
              <>
                <div className="px-1">
                  <button 
                    onClick={() => setAmountsSubView('monthly_details')}
                    className="w-full glass-card p-6 rounded-[32px] border-[#FFB000]/20 bg-gradient-to-br from-[#FFB000]/10 to-transparent flex items-center justify-between group active:scale-95 transition-all"
                  >
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-[#FFB000] rounded-2xl flex items-center justify-center text-black shadow-lg">
                          <BarChart3 size={24} />
                       </div>
                       <div className="text-left">
                          <h4 className="text-sm font-black uppercase italic text-white tracking-tight">Voir les revenus par mois</h4>
                          <p className="text-[9px] text-[#FFB000] font-black uppercase tracking-widest italic">Détail complet 2026</p>
                       </div>
                    </div>
                    <ChevronRight size={20} className="text-[#FFB000] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Statistiques des revenus</h4>
                    <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10 text-[8px] font-black text-gray-400 uppercase">Lecture seule</div>
                  </div>
                  {[
                    { key: 'week', label: 'Montant généré cette semaine', icon: <Calendar className="text-blue-400" /> },
                    { key: 'month', label: 'Montant généré ce mois', icon: <TrendingUp className="text-green-400" /> },
                    { key: 'year', label: 'Montant généré cette année', icon: <Euro className="text-[#FFB000]" /> }
                  ].map((item) => (
                    <div key={item.key} className="glass-card p-6 rounded-[40px] border-[#FFB000]/10 flex items-center justify-between overflow-hidden relative">
                      <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">{item.icon}</div>
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shadow-inner">
                          {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
                        </div>
                        <div>
                          <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">{item.label}</h4>
                          <p className="text-2xl font-black text-white italic tracking-tighter">{data.amounts[item.key as keyof typeof data.amounts].toLocaleString('fr-FR')} €</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="glass-card p-6 rounded-[40px] border-[#FFB000]/20 bg-gradient-to-br from-[#FFB000]/5 to-transparent flex flex-col gap-6 overflow-hidden relative group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none text-[#FFB000] group-hover:scale-110 transition-transform duration-1000"><Gift size={200} /></div>
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-[#FFB000] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FFB000]/10 text-black">
                          <Gift size={28} />
                        </div>
                        <div>
                          <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Prime totale accumulée</h4>
                          <p className="text-2xl font-black text-white italic tracking-tighter">{totalBonuses.toLocaleString('fr-FR')} €</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleWithdrawRequest} 
                      disabled={totalBonuses === 0} 
                      className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl relative z-10 ${totalBonuses > 0 ? 'bg-white text-black hover:bg-gray-100' : 'bg-white/5 text-gray-600 cursor-not-allowed opacity-50'}`}
                    >
                      <Wallet size={16} /> Demander le retrait <MessageCircle size={14} className={totalBonuses > 0 ? "text-green-600" : ""} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 px-1">
                  <div className="flex items-center gap-2 mb-2">
                    <History size={16} className="text-[#FFB000]" />
                    <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Historique des gains et retraits</h4>
                  </div>
                  <div className="space-y-2">
                    {sortedHistory.map((item) => (
                      <div key={item.id} className="glass-card p-4 rounded-3xl border-white/5 bg-white/2 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-xl ${item.type === 'received' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {item.type === 'received' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                          </div>
                          <div>
                            <p className={`text-xs font-black uppercase italic ${item.type === 'received' ? 'text-green-500' : 'text-red-500'}`}>
                              {item.label} – {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                            <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Transaction ID: {item.id.toUpperCase()}</p>
                          </div>
                        </div>
                        <div className={`font-black italic text-sm ${item.type === 'received' ? 'text-green-500' : 'text-red-500'}`}>
                          {item.type === 'received' ? '+' : '-'}{item.amount} €
                        </div>
                      </div>
                    ))}
                    {sortedHistory.length === 0 && (
                      <div className="text-center py-10 opacity-20 text-[10px] font-black uppercase">Aucun historique disponible</div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right duration-500">
                <div className="flex items-center justify-between px-1">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">Revenus <span className="text-[#FFB000]">Par Mois</span></h3>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">Détail Exercice 2026</p>
                  </div>
                  <button 
                    onClick={() => setAmountsSubView('summary')}
                    className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all flex items-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Retour</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {months.map((month) => {
                    const amount = data.monthlyBreakdown[month] || 0;
                    return (
                      <div key={month} className={`glass-card p-5 rounded-[32px] border-white/5 transition-all ${amount > 0 ? 'bg-gradient-to-br from-[#FFB000]/10 to-transparent border-[#FFB000]/20' : 'opacity-40'}`}>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#FFB000] mb-1 italic">{month}</p>
                        <p className="text-2xl font-black text-white italic tracking-tighter">{amount.toLocaleString('fr-FR')} €</p>
                        {amount > 0 && (
                          <div className="mt-3 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#FFB000] rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-center py-6">
                   <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.4em] italic">Mise à jour automatique en temps réel</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Internal components for Icons
const Utensils = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>;
const ShoppingBag = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;

export default IndividualAdminView;
