
import React, { useState } from 'react';
import { Profile, Task, Client } from '../types';
import { X, Trash2, Folder, Lock, ArrowRight, ChevronRight, ListTodo, Calendar, Clock, CheckCircle2, User, Phone, FileText, Plus, ArrowLeft } from 'lucide-react';

interface AdminPanelProps {
  profiles: Profile[];
  tasks: Task[];
  clients: Client[];
  formationImage: string;
  onUpdateFormationImage: (img: string) => void;
  onAddProfile: (p: Profile) => void;
  onDeleteProfile: (id: string) => void;
  onAddClient: (c: Client) => void;
  onDeleteClient: (id: string) => void;
  onAddTask: (t: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
  onExportData: () => void;
  onImportData: (json: string) => void;
}

interface AdminFolder {
  id: string;
  name: string;
  code: string;
  icon: React.ReactNode;
}

const ADMIN_FOLDERS: AdminFolder[] = [
  { id: 'layi', name: 'LAYI', code: 'Layi', icon: <Folder className="text-[#FFB000]" /> },
  { id: 'hajar', name: 'HAJAR', code: 'mellina77', icon: <Folder className="text-pink-500" /> },
  { id: 'rabab', name: 'RABAB', code: 'rabab', icon: <Folder className="text-purple-500" /> },
  { id: 'djo', name: 'DJO', code: 'enmode', icon: <Folder className="text-yellow-500" /> },
  { id: 'saida', name: 'SAIDA', code: 'saida', icon: <Folder className="text-orange-500" /> },
  { id: 'sami', name: 'SAMI', code: 'sami76', icon: <Folder className="text-blue-500" /> },
];

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  tasks, clients, 
  onAddClient, onDeleteClient,
  onAddTask, onDeleteTask, onToggleTask,
}) => {
  const [unlockedFolderId, setUnlockedFolderId] = useState<string | null>(null);
  const [folderLoginId, setFolderLoginId] = useState<string | null>(null);
  const [folderInputCode, setFolderInputCode] = useState('');
  
  const [viewState, setViewState] = useState<'main' | 'clients_list' | 'client_detail'>('main');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const [newClient, setNewClient] = useState({ name: '', phone: '', description: '' });
  const [newTask, setNewTask] = useState({ content: '', startDate: '', endDate: '' });

  const handleFolderLogin = () => {
    const folder = ADMIN_FOLDERS.find(f => f.id === folderLoginId);
    if (folder && folderInputCode === folder.code) {
      setUnlockedFolderId(folder.id);
      setFolderLoginId(null);
      setFolderInputCode('');
      setViewState('main');
    } else {
      alert("Code dossier incorrect");
      setFolderInputCode('');
    }
  };

  const submitClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.phone) return alert("Nom et téléphone requis");
    onAddClient({
      id: Math.random().toString(36).substr(2, 9),
      folderId: unlockedFolderId!,
      name: newClient.name,
      phone: newClient.phone,
      description: newClient.description,
      createdAt: Date.now()
    });
    setNewClient({ name: '', phone: '', description: '' });
    setShowAddClientForm(false);
  };

  const submitTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.content || !selectedClientId) return alert("Contenu requis");
    onAddTask({
      id: Math.random().toString(36).substr(2, 9),
      folderId: unlockedFolderId!,
      clientId: selectedClientId,
      content: newTask.content,
      startDate: newTask.startDate || new Date().toISOString().split('T')[0],
      endDate: newTask.endDate || new Date().toISOString().split('T')[0],
      completed: false
    });
    setNewTask({ content: '', startDate: '', endDate: '' });
    setShowAddTaskForm(false);
  };

  // Liste des dossiers si aucun n'est déverrouillé
  if (!unlockedFolderId) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700 pb-12">
        <div className="space-y-1 px-1">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Espace Admin</h2>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sélectionnez un dossier</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {ADMIN_FOLDERS.map((folder) => (
            <div key={folder.id} onClick={() => setFolderLoginId(folder.id)} className="glass-card p-6 rounded-[32px] border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shadow-inner">{folder.icon}</div>
                <div>
                  <h3 className="font-black text-lg italic uppercase tracking-tighter">Dossier {folder.name}</h3>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Accès restreint</p>
                </div>
              </div>
              <Lock size={20} className="text-gray-600" />
            </div>
          ))}
        </div>
        {folderLoginId && (
          <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="glass-card p-10 rounded-[40px] w-full max-w-sm space-y-8 text-center border-[#FFB000]/20 animate-in zoom-in-95 duration-300">
               <div className="flex justify-between items-center mb-2">
                 <button onClick={() => setFolderLoginId(null)} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
               </div>
               <div className="mx-auto w-20 h-20 bg-[#FFB000]/10 rounded-3xl flex items-center justify-center text-[#FFB000]"><Lock size={36} /></div>
               <h2 className="text-xl font-black uppercase italic text-white tracking-tighter">Code Dossier {ADMIN_FOLDERS.find(f => f.id === folderLoginId)?.name}</h2>
               <div className="space-y-4">
                  <input type="password" placeholder="Saisir le code" value={folderInputCode} onChange={(e) => setFolderInputCode(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-4 text-center text-white focus:ring-2 focus:ring-[#FFB000] outline-none transition-all font-mono" onKeyDown={(e) => e.key === 'Enter' && handleFolderLogin()} autoFocus />
                  <button onClick={handleFolderLogin} className="w-full orange-gradient py-5 rounded-2xl font-black text-black uppercase text-xs tracking-widest flex items-center justify-center gap-2">Ouvrir le dossier <ArrowRight size={18} /></button>
               </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const folderClients = clients.filter(c => c.folderId === unlockedFolderId);
  const currentClient = folderClients.find(c => c.id === selectedClientId);
  const clientTasks = tasks.filter(t => t.clientId === selectedClientId);

  // Vue principale du dossier : "Clients Site"
  if (viewState === 'main') {
    return (
      <div className="space-y-6 pb-12 animate-in fade-in">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFB000]/10 rounded-xl flex items-center justify-center">{ADMIN_FOLDERS.find(f => f.id === unlockedFolderId)?.icon}</div>
            <h2 className="font-black text-lg uppercase italic tracking-tighter">Dossier {ADMIN_FOLDERS.find(f => f.id === unlockedFolderId)?.name}</h2>
          </div>
          <button onClick={() => setUnlockedFolderId(null)} className="text-[9px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">Fermer</button>
        </div>

        <div className="pt-4">
          <div 
            onClick={() => setViewState('clients_list')}
            className="glass-card p-8 rounded-[40px] border-[#FFB000]/20 bg-gradient-to-br from-[#FFB000]/10 to-transparent flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:bg-[#FFB000]/20"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-2xl border border-white/5 text-[#FFB000]">
                <Folder size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Clients Site</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{folderClients.length} Projets en cours</p>
              </div>
            </div>
            <ChevronRight className="text-[#FFB000]" size={24} />
          </div>
        </div>
      </div>
    );
  }

  // Liste des clients
  if (viewState === 'clients_list') {
    return (
      <div className="space-y-6 pb-12 animate-in slide-in-from-right duration-500">
        <div className="flex items-center gap-4 px-1">
          <button onClick={() => setViewState('main')} className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-colors"><ArrowLeft size={20} /></button>
          <h2 className="text-xl font-black uppercase italic tracking-tighter">Clients Site</h2>
        </div>

        <button onClick={() => setShowAddClientForm(!showAddClientForm)} className="w-full bg-[#FFB000] text-black py-4 rounded-3xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
          <Plus size={18} /> Nouveau Client
        </button>

        {showAddClientForm && (
          <form onSubmit={submitClient} className="glass-card p-6 rounded-[32px] space-y-4 animate-in slide-in-from-top-4 border-[#FFB000]/30">
            <input required placeholder="Nom du client (ex: Djo)" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm" />
            <input required placeholder="Numéro de téléphone (ex: 0761771520)" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm" />
            <textarea placeholder="Description du projet (ex: Site vitrine)" value={newClient.description} onChange={e => setNewClient({...newClient, description: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm min-h-[80px]" />
            <button type="submit" className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs">Enregistrer</button>
          </form>
        )}

        <div className="space-y-4">
          {folderClients.map(client => (
            <div key={client.id} onClick={() => { setSelectedClientId(client.id); setViewState('client_detail'); }} className="glass-card p-6 rounded-[32px] border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#FFB000]"><User size={24} /></div>
                <div>
                  <h4 className="font-black text-base uppercase italic text-white tracking-tight">{client.name}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{client.phone}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-600" />
            </div>
          ))}
          {folderClients.length === 0 && <div className="text-center py-12 opacity-30 font-black uppercase text-[10px] tracking-widest">Aucun client enregistré</div>}
        </div>
      </div>
    );
  }

  // Détails d'un client (Infos + Tâches)
  if (viewState === 'client_detail' && currentClient) {
    return (
      <div className="space-y-6 pb-12 animate-in slide-in-from-right duration-500">
        <div className="flex items-center gap-4 px-1">
          <button onClick={() => setViewState('clients_list')} className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-colors"><ArrowLeft size={20} /></button>
          <h2 className="text-xl font-black uppercase italic tracking-tighter">Fiche Client</h2>
        </div>

        {/* Informations Client */}
        <div className="glass-card p-8 rounded-[40px] border-[#FFB000]/20 bg-gradient-to-b from-[#FFB000]/5 to-transparent space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{currentClient.name}</h3>
            <button onClick={() => onDeleteClient(currentClient.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={20} /></button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-black uppercase text-[#FFB000]">
              <Phone size={18} /> {currentClient.phone}
            </div>
            <div className="flex items-start gap-3 bg-black/40 p-4 rounded-3xl border border-white/5">
              <FileText size={18} className="text-gray-500 mt-1 shrink-0" />
              <p className="text-xs text-gray-300 font-medium italic leading-relaxed">{currentClient.description || "Pas de description"}</p>
            </div>
          </div>
        </div>

        {/* Section Tâches */}
        <div className="space-y-4 px-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase italic tracking-widest text-white">Tâches Client</h3>
            <button onClick={() => setShowAddTaskForm(!showAddTaskForm)} className="bg-white/5 p-2 rounded-xl text-[#FFB000] border border-white/10"><Plus size={18} /></button>
          </div>

          {showAddTaskForm && (
            <form onSubmit={submitTask} className="glass-card p-6 rounded-[32px] space-y-4 animate-in slide-in-from-top-4 border-white/10">
              <textarea required placeholder="Nouvelle tâche..." value={newTask.content} onChange={e => setNewTask({...newTask, content: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={newTask.startDate} onChange={e => setNewTask({...newTask, startDate: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-[10px] text-white" />
                <input type="date" value={newTask.endDate} onChange={e => setNewTask({...newTask, endDate: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-[10px] text-white" />
              </div>
              <button type="submit" className="w-full bg-[#FFB000] text-black py-4 rounded-2xl font-black uppercase text-xs">Ajouter la tâche</button>
            </form>
          )}

          <div className="space-y-3">
            {clientTasks.map(task => (
              <div key={task.id} className={`glass-card p-5 rounded-[32px] border border-white/5 flex items-center justify-between gap-4 transition-all ${task.completed ? 'opacity-40' : 'opacity-100'}`}>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold leading-relaxed ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.content}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-[8px] font-black uppercase text-gray-600 flex items-center gap-1"><Calendar size={10} /> {task.startDate}</span>
                    <span className="text-[8px] font-black uppercase text-red-500/70 flex items-center gap-1"><Clock size={10} /> {task.endDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onToggleTask(task.id)} className={`p-2 rounded-full border transition-all ${task.completed ? 'bg-green-500/20 border-green-500/50 text-green-500' : 'bg-white/5 border-white/10 text-gray-500'}`}><CheckCircle2 size={20} /></button>
                  <button onClick={() => onDeleteTask(task.id)} className="p-2 text-red-500/50 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
            {clientTasks.length === 0 && <div className="text-center py-12 opacity-30 font-black uppercase text-[10px] tracking-widest bg-white/5 rounded-[32px] border-dashed border-white/10">Aucune tâche pour ce client</div>}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AdminPanel;
