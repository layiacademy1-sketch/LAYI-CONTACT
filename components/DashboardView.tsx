
import React, { useState } from 'react';
import { Profile, Gender } from '../types';
import { Save, LogOut, Camera, Instagram, Linkedin, Facebook, Youtube, Clock, MapPin, X, Plus, Utensils } from 'lucide-react';
import { GENDER_LABELS } from '../constants';

interface DashboardViewProps {
  user: Profile;
  onUpdate: (updated: Profile) => void;
  onLogout: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ user, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState<Profile>({
    ...user,
    gallery: user.gallery || [],
    socials: user.socials || {},
    restaurantInfo: user.restaurantInfo || { address: '', openingHours: [], menuPhotos: [] }
  });

  const handleSave = () => {
    onUpdate(formData);
    alert("Profil mis à jour !");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'gallery' | 'menu') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (target === 'gallery') {
          if ((formData.gallery?.length || 0) >= 5) return alert("Max 5 photos");
          setFormData({ ...formData, gallery: [...(formData.gallery || []), base64] });
        } else {
          setFormData({
            ...formData,
            restaurantInfo: {
              ...formData.restaurantInfo,
              menuPhotos: [...(formData.restaurantInfo?.menuPhotos || []), base64]
            }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number, target: 'gallery' | 'menu') => {
    if (target === 'gallery') {
      const next = [...(formData.gallery || [])];
      next.splice(index, 1);
      setFormData({ ...formData, gallery: next });
    } else {
      const next = [...(formData.restaurantInfo?.menuPhotos || [])];
      next.splice(index, 1);
      setFormData({
        ...formData,
        restaurantInfo: { ...formData.restaurantInfo, menuPhotos: next }
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Mon <span className="text-[#FFB000]">Espace</span></h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">@{user.snapchatHandle}</p>
        </div>
        <button onClick={onLogout} className="p-3 bg-red-500/10 text-red-500 rounded-2xl">
          <LogOut size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info (Read Only or limited) */}
        <section className="glass-card p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#FFB000]">Offres & Promo</h3>
          <textarea 
            value={formData.discount}
            onChange={(e) => setFormData({...formData, discount: e.target.value})}
            placeholder="Ex: -10% sur présentation du Snap..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#FFB000] outline-none"
          />
        </section>

        {/* Gallery */}
        <section className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#FFB000]">Photos ({formData.gallery?.length || 0}/5)</h3>
            {(formData.gallery?.length || 0) < 5 && (
              <label className="cursor-pointer bg-white/5 p-2 rounded-xl text-[#FFB000]">
                <Plus size={20} />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'gallery')} />
              </label>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {formData.gallery?.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <img src={img} className="w-full h-full object-cover" alt="" />
                <button 
                  onClick={() => removePhoto(i, 'gallery')}
                  className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="glass-card p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#FFB000]">Réseaux Sociaux</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-black/40 rounded-2xl px-4 py-3">
              <Instagram size={18} className="text-pink-500" />
              <input 
                placeholder="Lien Instagram"
                value={formData.socials?.instagram || ''}
                onChange={(e) => setFormData({...formData, socials: {...formData.socials, instagram: e.target.value}})}
                className="bg-transparent text-sm w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-2xl px-4 py-3">
              <Linkedin size={18} className="text-blue-600" />
              <input 
                placeholder="Lien LinkedIn"
                value={formData.socials?.linkedin || ''}
                onChange={(e) => setFormData({...formData, socials: {...formData.socials, linkedin: e.target.value}})}
                className="bg-transparent text-sm w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-2xl px-4 py-3">
              <Facebook size={18} className="text-blue-500" />
              <input 
                placeholder="Lien Facebook"
                value={formData.socials?.facebook || ''}
                onChange={(e) => setFormData({...formData, socials: {...formData.socials, facebook: e.target.value}})}
                className="bg-transparent text-sm w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-2xl px-4 py-3">
              <Youtube size={18} className="text-red-600" />
              <input 
                placeholder="Lien YouTube"
                value={formData.socials?.youtube || ''}
                onChange={(e) => setFormData({...formData, socials: {...formData.socials, youtube: e.target.value}})}
                className="bg-transparent text-sm w-full outline-none"
              />
            </div>
          </div>
        </section>

        {/* Restaurant Specifics */}
        {formData.category === 'Restaurant' && (
          <section className="glass-card p-6 rounded-3xl space-y-4 border-[#FFB000]/20 bg-[#FFB000]/5">
            <div className="flex items-center gap-2 mb-2">
              <Utensils size={18} className="text-[#FFB000]" />
              <h3 className="text-sm font-black uppercase tracking-widest text-[#FFB000]">Infos Restaurant</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Adresse</label>
                <input 
                  value={formData.restaurantInfo?.address || ''}
                  onChange={(e) => setFormData({...formData, restaurantInfo: {...formData.restaurantInfo!, address: e.target.value}})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Photos Menu</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <label className="flex-shrink-0 w-20 h-20 bg-white/5 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer">
                    <Camera size={20} className="text-gray-500" />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'menu')} />
                  </label>
                  {formData.restaurantInfo?.menuPhotos?.map((img, i) => (
                    <div key={i} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden relative group">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                      <button onClick={() => removePhoto(i, 'menu')} className="absolute top-1 right-1 p-1 bg-black/60 rounded-lg"><X size={10}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <button 
          onClick={handleSave}
          className="w-full orange-gradient py-5 rounded-[28px] font-black text-black text-lg uppercase shadow-2xl shadow-[#FFB000]/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Enregistrer les modifications <Save size={20} />
        </button>
      </div>
    </div>
  );
};

export default DashboardView;
