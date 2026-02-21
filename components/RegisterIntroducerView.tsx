
import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, User, Mail, MapPin, Phone, Lock, ChevronDown, Info, CheckCircle2 } from 'lucide-react';

interface RegisterIntroducerViewProps {
  onBack: () => void;
}

const RegisterIntroducerView: React.FC<RegisterIntroducerViewProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    ville: '',
    sexe: 'Homme',
    phone: '',
    pseudo: '',
    code: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Bonjour, je souhaite m’inscrire en tant qu'apporteur d'affaires LAYI.
    
📝 FORMULAIRE D'INSCRIPTION :
• Nom: ${formData.nom}
• Prénom: ${formData.prenom}
• Email: ${formData.email}
• Ville: ${formData.ville}
• Sexe: ${formData.sexe}
• Tel: ${formData.phone}
• Pseudo: ${formData.pseudo}
• Code personnel (6 chiffres): ${formData.code}`;

    const waLink = `https://wa.me/33757828250?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div className="animate-in slide-in-from-right duration-500 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Retour</span>
      </button>

      <div className="space-y-8">
        <div className="px-1 space-y-4">
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-1">
              Devenir <span className="text-[#FFB000]">Apporteur d'Affaires</span>
            </h2>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">Rejoignez le réseau LAYI</p>
          </div>

          <div className="glass-card p-6 rounded-[32px] border-[#FFB000]/20 bg-[#FFB000]/5 space-y-3">
            <div className="flex items-center gap-3 text-[#FFB000]">
              <Info size={18} />
              <h3 className="text-xs font-black uppercase tracking-widest italic">Le concept</h3>
            </div>
            <p className="text-sm font-bold text-gray-200 leading-relaxed italic">
              "Apprenez tout ce qu’il faut savoir pour recommander une personne souhaitant prendre un de nos services."
            </p>
            <div className="grid grid-cols-1 gap-2 pt-2">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-400">
                <CheckCircle2 size={12} className="text-green-500" /> Formation offerte
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-400">
                <CheckCircle2 size={12} className="text-green-500" /> Commission sur chaque recommandation
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#FFB000] px-1">Nom</label>
              <input required value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm font-bold outline-none focus:ring-1 focus:ring-[#FFB000]" placeholder="Nom" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#FFB000] px-1">Prénom</label>
              <input required value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm font-bold outline-none focus:ring-1 focus:ring-[#FFB000]" placeholder="Prénom" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#FFB000] px-1">Adresse Mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:ring-1 focus:ring-[#FFB000]" placeholder="email@exemple.com" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#FFB000] px-1">Ville</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input required value={formData.ville} onChange={e => setFormData({...formData, ville: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:ring-1 focus:ring-[#FFB000]" placeholder="Ville" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#FFB000] px-1">Sexe</label>
              <div className="relative">
                <select 
                  value={formData.sexe} 
                  onChange={e => setFormData({...formData, sexe: e.target.value})} 
                  className="w-full bg-black border border-white/10 rounded-2xl py-4 px-4 text-sm font-bold outline-none appearance-none text-white cursor-pointer focus:ring-1 focus:ring-[#FFB000]"
                >
                  <option value="Homme" className="bg-black">Homme</option>
                  <option value="Femme" className="bg-black">Femme</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#FFB000] px-1">Numéro de téléphone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:ring-1 focus:ring-[#FFB000]" placeholder="06 12 34 56 78" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#FFB000] px-1">Choisir un pseudo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input required value={formData.pseudo} onChange={e => setFormData({...formData, pseudo: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:ring-1 focus:ring-[#FFB000]" placeholder="Pseudo" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#FFB000] px-1">Code (6 chiffres)</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input required maxLength={6} pattern="[0-9]{6}" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:ring-1 focus:ring-[#FFB000] text-center tracking-[0.5em]" placeholder="000000" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white py-6 rounded-[28px] font-black uppercase text-sm tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle size={22} />
              Envoyer via WhatsApp
            </button>
            <p className="text-center text-[8px] text-gray-600 font-black uppercase tracking-[0.4em] mt-6 italic">
              L'inscription est finalisée par un administrateur LAYI
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterIntroducerView;
