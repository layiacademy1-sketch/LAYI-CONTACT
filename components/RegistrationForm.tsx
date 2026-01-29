
import React, { useState } from 'react';
import { Profile, Gender } from '../types';
import { CATEGORIES } from '../constants';
import { Sparkles, Check, Loader2 } from 'lucide-react';
import { enhancePresentation } from '../services/geminiService';

interface RegistrationFormProps {
  onSubmit: (profile: Omit<Profile, 'id' | 'status' | 'createdAt'>) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    snapchatHandle: '',
    category: CATEGORIES[0],
    presentation: '',
    city: '',
    country: 'France',
    gender: Gender.BUSINESS,
    discount: ''
  });
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.snapchatHandle || !formData.presentation || !formData.city) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    onSubmit(formData);
  };

  const handleEnhance = async () => {
    if (!formData.presentation) return;
    setIsEnhancing(true);
    const enhanced = await enhancePresentation(formData.snapchatHandle, formData.category, formData.presentation);
    setFormData(prev => ({ ...prev, presentation: enhanced }));
    setIsEnhancing(false);
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-500 space-y-6 pb-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter">Devenir Pro <span className="text-[#FFB000]">LAYI</span></h2>
        <p className="text-gray-400 text-sm">Boostez votre visibilité en rejoignant la première plateforme de contacts Snapchat validés.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Pseudo Snapchat *</label>
            <input 
              required
              type="text"
              placeholder="Ex: jean_pro_75"
              value={formData.snapchatHandle}
              onChange={(e) => setFormData({ ...formData, snapchatHandle: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-[#FFB000] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Catégorie d'activité *</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-[#FFB000] outline-none appearance-none"
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Présentation *</label>
              <button 
                type="button"
                onClick={handleEnhance}
                disabled={isEnhancing || !formData.presentation}
                className="text-[#FFB000] text-[10px] font-black uppercase flex items-center gap-1 hover:opacity-80 disabled:opacity-30"
              >
                {isEnhancing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                Magie AI
              </button>
            </div>
            <textarea 
              required
              rows={4}
              placeholder="Décrivez votre activité en quelques mots..."
              value={formData.presentation}
              onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-[#FFB000] outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Ville *</label>
              <input 
                required
                type="text"
                placeholder="Ex: Paris"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-[#FFB000] outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Pays</label>
              <input 
                type="text"
                value={formData.country}
                disabled
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 opacity-50 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Type de profil</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(Gender) as Array<keyof typeof Gender>).map(key => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: Gender[key] })}
                  className={`py-3 rounded-xl text-xs font-bold transition-all ${formData.gender === Gender[key] ? 'bg-[#FFB000] text-black scale-105' : 'bg-white/5 text-gray-400'}`}
                >
                  {Gender[key] === 'girl' ? 'Fille' : Gender[key] === 'boy' ? 'Garçon' : 'Business'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Réduction spéciale (optionnel)</label>
            <input 
              type="text"
              placeholder="Ex: -10% avec code LAYI"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-[#FFB000] outline-none"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full orange-gradient py-5 rounded-3xl font-black text-black text-lg uppercase shadow-2xl shadow-[#FFB000]/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Soumettre mon profil <Check size={20} />
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
