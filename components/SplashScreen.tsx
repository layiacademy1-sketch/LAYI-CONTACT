
import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    const removeTimer = setTimeout(() => setShouldRender(false), 2600);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative flex items-center justify-center animate-in zoom-in-75 duration-1000">
        {/* Conteneur Pillule */}
        <div className="bg-black px-12 py-5 rounded-full border border-white/10 flex items-center justify-center relative shadow-2xl">
          {/* Arcs décoratifs extérieurs (comme sur le logo uploadé) */}
          <div className="absolute -top-3 -right-4 w-28 h-10 border-t-4 border-[#FFB000] rounded-t-full opacity-90 rotate-12"></div>
          <div className="absolute -bottom-3 -left-4 w-28 h-10 border-b-4 border-[#FFB000] rounded-b-full opacity-90 rotate-12"></div>
          
          {/* Texte LAYI */}
          <h1 className="text-7xl font-black italic tracking-tighter flex items-center z-10">
            <span className="text-[#FFB000]">LA</span>
            <span className="text-white">YI</span>
          </h1>
        </div>
      </div>
      
      <div className="absolute bottom-16 flex flex-col items-center gap-4">
        <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#FFB000] animate-[shimmer_2s_infinite_linear] w-1/2 rounded-full"></div>
        </div>
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.5em] animate-pulse">
          Chargement
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
