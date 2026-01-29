
import React from 'react';
import { News } from '../types';
import { ArrowLeft, ChevronRight, Calendar } from 'lucide-react';

interface NewsListViewProps {
  news: News[];
  onNewsSelect: (id: string) => void;
  onBack: () => void;
}

const NewsListView: React.FC<NewsListViewProps> = ({ news, onNewsSelect, onBack }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-12">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-[#FFB000]"><ArrowLeft size={20} /></button>
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Actualités</h2>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Toutes nos annonces</p>
        </div>
      </div>

      <div className="grid gap-6">
        {news.map(item => (
          <div 
            key={item.id}
            onClick={() => onNewsSelect(item.id)}
            className="glass-card rounded-[40px] overflow-hidden group cursor-pointer border-white/5"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase text-[#FFB000] tracking-widest">
                <Calendar size={12} /> {new Date(item.createdAt).toLocaleDateString()}
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-tighter">{item.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed font-medium">{item.description}</p>
              <div className="pt-2 flex justify-end">
                <div className="bg-[#FFB000]/10 text-[#FFB000] p-3 rounded-full group-hover:bg-[#FFB000] group-hover:text-black transition-all">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {news.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-black uppercase text-xs">Aucune annonce disponible</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsListView;
