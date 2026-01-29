
import React, { useState } from 'react';
import { Profile, ProfileStatus } from '../types';
import { Check, X, ShieldAlert, Edit2, Save } from 'lucide-react';

interface AdminPanelProps {
  profiles: Profile[];
  onUpdateStatus: (id: string, status: ProfileStatus) => void;
  onUpdateDiscount: (id: string, discount: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ profiles, onUpdateStatus, onUpdateDiscount }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDiscount, setNewDiscount] = useState('');

  const pendingProfiles = profiles.filter(p => p.status === ProfileStatus.PENDING);
  const validatedProfiles = profiles.filter(p => p.status === ProfileStatus.VALIDATED);

  const startEdit = (p: Profile) => {
    setEditingId(p.id);
    setNewDiscount(p.discount);
  };

  const saveDiscount = (id: string) => {
    onUpdateDiscount(id, newDiscount);
    setEditingId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-[#FFB000]/10 p-4 rounded-2xl border border-[#FFB000]/20">
        <ShieldAlert className="text-[#FFB000]" />
        <div>
          <h2 className="font-black text-lg">Espace Admin</h2>
          <p className="text-xs text-gray-400 font-medium">Modération & Validation des profils</p>
        </div>
      </div>

      <section>
        <h3 className="text-sm font-black uppercase tracking-widest text-[#FFB000] mb-4 flex items-center gap-2">
          En attente ({pendingProfiles.length})
        </h3>
        <div className="space-y-4">
          {pendingProfiles.map(p => (
            <div key={p.id} className="glass-card p-4 rounded-3xl space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">@{p.snapchatHandle}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{p.category} • {p.city}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onUpdateStatus(p.id, ProfileStatus.VALIDATED)}
                    className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                  >
                    <Check size={18} />
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(p.id, ProfileStatus.REJECTED)}
                    className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-xl italic">"{p.presentation}"</p>
            </div>
          ))}
          {pendingProfiles.length === 0 && (
            <p className="text-center text-gray-500 py-8 text-sm italic">Aucun profil en attente de validation.</p>
          )}
        </div>
      </section>

      <section className="pb-8">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
          Validés ({validatedProfiles.length})
        </h3>
        <div className="space-y-3">
          {validatedProfiles.map(p => (
            <div key={p.id} className="glass-card p-4 rounded-2xl flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-bold">@{p.snapchatHandle}</h4>
                {editingId === p.id ? (
                  <div className="flex gap-2 mt-2">
                    <input 
                      type="text" 
                      value={newDiscount}
                      onChange={(e) => setNewDiscount(e.target.value)}
                      className="flex-1 bg-black border border-white/20 rounded-lg px-2 py-1 text-xs outline-none"
                    />
                    <button onClick={() => saveDiscount(p.id)} className="text-[#FFB000]"><Save size={16} /></button>
                  </div>
                ) : (
                  <p className="text-xs text-[#FFB000] font-bold mt-1">
                    Remise: {p.discount || 'Aucune'}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => startEdit(p)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => onUpdateStatus(p.id, ProfileStatus.REJECTED)}
                  className="p-2 text-red-500/50 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
