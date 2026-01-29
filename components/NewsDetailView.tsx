
import React from 'react';
import { News } from '../types';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';

interface NewsDetailViewProps {
  news: News;
  onBack: () => void;
}

const NewsDetailView: React.FC<NewsDetailViewProps> = ({ news, onBack }) => {
  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10"><ArrowLeft size={16} /></div>
        <span className="font-bold text-[10px] uppercase tracking-widest">Toutes les news</span>
      </button>

      <div className="relative aspect-[4/5] rounded-[56px] overflow-hidden shadow-2xl border border-white/10 mb-8">
        <img src={news.imageUrl} className="w-full h-full object-cover" alt="" />
        <div className="absolute top-8 right-8">
          <button 
            onClick={() => navigator.share?.({ title: news.title, url: window.location.href })}
            className="p-4 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-white"
          >
            <Share2 size={20} />
          </button>
        </div>
        <div className="absolute bottom-8 left-8 right-8">
          <div className="inline-flex items-center gap-2 bg-[#FFB000] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Calendar size={14} /> {new Date(news.createdAt).toLocaleDateString()}
          </div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white leading-tight drop-shadow-lg">
            {news.title}
          </h1>
        </div>
      </div>

      <div className="px-2 space-y-6">
        <div className="glass-card p-8 rounded-[48px] border-white/5">
          <p className="text-gray-200 text-lg leading-relaxed font-medium whitespace-pre-line italic">
            {news.description}
          </p>
        </div>

        <div className="text-center pt-8">
           <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">
            LAYI-CONTACT MAGAZINE • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailView;
