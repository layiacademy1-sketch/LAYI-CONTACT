
import React, { useState, useRef } from 'react';
import { Profile, ProfileStatus, Gender, News } from '../types';
import { X, ShieldAlert, UserPlus, Trash2, Camera, Check, Newspaper, BookOpen } from 'lucide-react';
import { GENDER_LABELS } from '../constants';

interface AdminPanelProps {
  profiles: Profile[];
  news: News[];
  formationImage: string;
  onUpdateFormationImage: (img: string) => void;
  onAddProfile: (p: Profile) => void;
  onDeleteProfile: (id: string) => void;
  onAddNews: (n: News) => void;
  onDeleteNews: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  profiles, news, formationImage, onUpdateFormationImage, 
  onAddProfile, onDeleteProfile, onAddNews, onDeleteNews 
}) => {
  const [activeTab, setActiveTab] = useState<'profiles' | 'news' | 'formation'>('profiles');
  const [showAddForm, setShowAddForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newsFileInputRef = useRef<HTMLInputElement>(null);
  const formationFileInputRef = useRef<HTMLInputElement>(null);
  
  // States for forms
  const [newProfile, setNewProfile] = useState({ snapchatHandle: '', city: '', presentation: '', gender: Gender.GIRL, imageUrl: '' });
  const [newNews, setNewNews] = useState({ title: '', description: '', imageUrl: '' });

  const handleProfileFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProfile({ ...newProfile, imageUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleNewsFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewNews({ ...newNews, imageUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleFormationFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateFormationImage(reader.result as string);
        alert("Image de formation mise à jour avec succès !");
      };
      reader.readAsDataURL(file);
    }
  };

  const submitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfile.imageUrl) return alert("Photo obligatoire");
    onAddProfile({
      ...newProfile,
      id: Math.random().toString(36).substr(2, 9),
      category: 'Pro',
      country: 'France',
      status: ProfileStatus.VALIDATED,
      createdAt: Date.now(),
    });
    setShowAddForm(false);
    setNewProfile({ snapchatHandle: '', city: '', presentation: '', gender: Gender.GIRL, imageUrl: '' });
  };

  const submitNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.imageUrl) return alert("Photo obligatoire");
    onAddNews({
      ...newNews,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    });
    setShowAddForm(false);
    setNewNews({ title: '', description: '', imageUrl: '' });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      <div className="bg-[#FFB000]/10 p-4 rounded-[32px] border border-[#FFB000]/20">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="text-[#FFB000]" />
          <h2 className="font-black text-lg uppercase italic tracking-tighter">Gestion LAYI-CONTACT</h2>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => { setActiveTab('profiles'); setShowAddForm(false); }}
            className={`flex-1 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'profiles' ? 'bg-[#FFB000] text-black shadow-lg shadow-[#FFB000]/20' : 'bg-white/5 text-gray-400'}`}
          >
            Membres
          </button>
          <button 
            onClick={() => { setActiveTab('news'); setShowAddForm(false); }}
            className={`flex-1 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'news' ? 'bg-[#FFB000] text-black shadow-lg shadow-[#FFB000]/20' : 'bg-white/5 text-gray-400'}`}
          >
            Actualités
          </button>
          <button 
            onClick={() => { setActiveTab('formation'); setShowAddForm(false); }}
            className={`flex-1 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'formation' ? 'bg-[#FFB000] text-black shadow-lg shadow-[#FFB000]/20' : 'bg-white/5 text-gray-400'}`}
          >
            Formation
          </button>
        </div>
      </div>

      {activeTab !== 'formation' && (
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full bg-white/5 border border-white/10 p-5 rounded-[32px] flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest text-[#FFB000] shadow-xl active:scale-95 transition-all"
        >
          {showAddForm ? <X size={20} /> : (activeTab === 'profiles' ? <UserPlus size={20} /> : <Newspaper size={20} />)}
          {showAddForm ? 'Annuler l\'ajout' : (activeTab === 'profiles' ? 'Enregistrer un nouveau profil' : 'Enregistrer une actualité')}
        </button>
      )}

      {showAddForm && activeTab === 'profiles' && (
        <form onSubmit={submitProfile} className="glass-card p-6 rounded-[32px] space-y-4 animate-in slide-in-from-top-4">
          <div onClick={() => fileInputRef.current?.click()} className="w-24 h-24 mx-auto rounded-[32px] bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden cursor-pointer group">
            {newProfile.imageUrl ? <img src={newProfile.imageUrl} className="w-full h-full object-cover" /> : <Camera className="text-gray-600" />}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleProfileFile} className="hidden" accept="image/*" />
          <input required placeholder="Pseudo Snapchat" value={newProfile.snapchatHandle} onChange={e => setNewProfile({...newProfile, snapchatHandle: e.target.value.replace('@', '')})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-[#FFB000]" />
          <input required placeholder="Ville" value={newProfile.city} onChange={e => setNewProfile({...newProfile, city: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-[#FFB000]" />
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(Gender) as Array<keyof typeof Gender>).map(k => (
              <button key={k} type="button" onClick={() => setNewProfile({...newProfile, gender: Gender[k]})} className={`py-2 rounded-xl text-[9px] font-black uppercase border ${newProfile.gender === Gender[k] ? 'bg-[#FFB000] border-[#FFB000] text-black' : 'border-white/10 text-gray-500'}`}>{GENDER_LABELS[Gender[k]]}</button>
            ))}
          </div>
          <textarea required placeholder="Présentation du pro..." rows={3} value={newProfile.presentation} onChange={e => setNewProfile({...newProfile, presentation: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-[#FFB000] resize-none" />
          <button type="submit" className="w-full orange-gradient py-4 rounded-2xl font-black text-black uppercase text-xs shadow-xl">Enregistrer le Profil</button>
        </form>
      )}

      {showAddForm && activeTab === 'news' && (
        <form onSubmit={submitNews} className="glass-card p-6 rounded-[32px] space-y-4 animate-in slide-in-from-top-4">
          <div onClick={() => newsFileInputRef.current?.click()} className="aspect-video w-full rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden cursor-pointer">
            {newNews.imageUrl ? <img src={newNews.imageUrl} className="w-full h-full object-cover" /> : <div className="text-center"><Camera className="mx-auto mb-1 text-gray-600"/><p className="text-[10px] uppercase font-black text-gray-600">Choisir une photo d'actu</p></div>}
          </div>
          <input type="file" ref={newsFileInputRef} onChange={handleNewsFile} className="hidden" accept="image/*" />
          <input required placeholder="Titre de l'actualité" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-[#FFB000]" />
          <textarea required placeholder="Contenu de l'actualité..." rows={5} value={newNews.description} onChange={e => setNewNews({...newNews, description: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-[#FFB000] resize-none" />
          <button type="submit" className="w-full orange-gradient py-4 rounded-2xl font-black text-black uppercase text-xs shadow-xl">Publier l'Actualité</button>
        </form>
      )}

      {activeTab === 'formation' && (
        <div className="glass-card p-8 rounded-[40px] space-y-8 animate-in slide-in-from-right-4">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-[#FFB000]" />
            <h3 className="text-lg font-black uppercase italic tracking-tighter text-[#FFB000]">Enregistrer la formation</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] px-1">Bannière Formation Snapchat</p>
              <div 
                onClick={() => formationFileInputRef.current?.click()}
                className="relative aspect-[16/9] w-full rounded-[32px] bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden cursor-pointer group"
              >
                {formationImage ? (
                  <img src={formationImage} className="w-full h-full object-cover" alt="Bannière Formation" />
                ) : (
                  <div className="text-center p-6">
                    <Camera className="mx-auto mb-3 text-[#FFB000]" size={32} />
                    <p className="text-[10px] uppercase font-black text-gray-400 leading-relaxed">
                      Cliquez pour ajouter la photo<br/>depuis votre téléphone
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-sm">
                  <p className="text-white text-[11px] font-black uppercase tracking-[0.3em]">Changer l'image</p>
                </div>
              </div>
              <input type="file" ref={formationFileInputRef} onChange={handleFormationFile} className="hidden" accept="image/*" />
            </div>
            
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <p className="text-[10px] text-gray-300 font-medium italic leading-relaxed text-center">
                Cette image apparaîtra en haut de l'accueil. Les clients pourront cliquer dessus pour vous contacter sur WhatsApp au <span className="text-[#FFB000] font-black">07 57 82 82 50</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'formation' && (
        <div className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2 px-1">Liste des {activeTab === 'profiles' ? 'membres' : 'actus'} existantes</h3>
          {activeTab === 'profiles' ? profiles.map(p => (
            <div key={p.id} className="glass-card p-4 rounded-[28px] flex items-center justify-between border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <img src={p.imageUrl} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-black text-sm uppercase italic">@{p.snapchatHandle}</h4>
                  <p className="text-[9px] text-[#FFB000] font-black uppercase tracking-widest">{p.city}</p>
                </div>
              </div>
              <button onClick={() => confirm(`Supprimer @${p.snapchatHandle} ?`) && onDeleteProfile(p.id)} className="p-3 text-red-500 bg-red-500/10 rounded-xl active:scale-90 transition-transform"><Trash2 size={16} /></button>
            </div>
          )) : news.map(n => (
            <div key={n.id} className="glass-card p-4 rounded-[28px] flex items-center justify-between border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <img src={n.imageUrl} className="w-12 h-12 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-black text-sm truncate uppercase italic pr-2">{n.title}</h4>
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{new Date(n.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <button onClick={() => confirm('Supprimer cette actualité ?') && onDeleteNews(n.id)} className="p-3 text-red-500 bg-red-500/10 rounded-xl active:scale-90 transition-transform"><Trash2 size={16} /></button>
            </div>
          ))}
          {(activeTab === 'profiles' ? profiles.length : news.length) === 0 && (
            <div className="text-center py-10 opacity-30">
              <p className="text-[10px] font-black uppercase tracking-widest italic">Vide</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
