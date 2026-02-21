
import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import { View, Profile, ProfileStatus, Gender, Introducer } from './types';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import SplashScreen from './components/SplashScreen';
import MemberAccessView from './components/MemberAccessView';
import MemberSpaceView from './components/MemberSpaceView';
import PresentationView from './components/PresentationView';
import IndividualAdminView from './components/IndividualAdminView';
import RegisterIntroducerView from './components/RegisterIntroducerView';
import IntroducerDetailsView from './components/IntroducerDetailsView';
import TrainingLivesView from './components/TrainingLivesView';
import MembershipOfferView from './components/MembershipOfferView';
import AllFormationsView from './components/AllFormationsView';
import TrustUsView from './components/TrustUsView';

const SESSION_KEY = 'layi_member_session';
const SESSION_DURATION = 60 * 60 * 1000; // 1 heure en millisecondes

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [pendingView, setPendingView] = useState<View | null>(null);
  const [isAppReady, setIsAppReady] = useState(false);
  const [memberUser, setMemberUser] = useState<string | null>(null);
  const [authenticatedAdminName, setAuthenticatedAdminName] = useState<string | null>(null);
  const [selectedIntroducer, setSelectedIntroducer] = useState<Introducer | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check for existing valid session
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        const { name, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < SESSION_DURATION) {
          setMemberUser(name);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch (e) {
        localStorage.removeItem(SESSION_KEY);
      }
    }

    const timer = setTimeout(() => setIsAppReady(true), 2500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Instructions pour installation manuelle (iOS ou déjà installé)
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        alert("Pour installer LAYi sur votre iPhone :\n\n1. Appuyez sur le bouton 'Partager' en bas de votre écran (le carré avec une flèche).\n2. Faites défiler vers le bas et appuyez sur 'Sur l'écran d'accueil'.\n3. Appuyez sur 'Ajouter' en haut à droite.");
      } else {
        alert("L'application est déjà installée ou votre navigateur ne supporte pas l'installation automatique.\n\nVous pouvez l'ajouter manuellement via le menu de votre navigateur (Paramètres > Installer l'application ou Ajouter à l'écran d'accueil).");
      }
    }
  };

  const handleIntroducerSelect = (intro: Introducer) => {
    setSelectedIntroducer(intro);
    setView('introducer_details');
  };

  const handleTrainingLivesClick = () => {
    setView('training_lives');
  };

  const handleLoginRequired = (targetView: View) => {
    setPendingView(targetView);
    setView('member_access');
  };

  const handleMemberValidated = (name: string) => {
    setMemberUser(name);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name, timestamp: Date.now() }));
    if (pendingView) {
      setView(pendingView);
      setPendingView(null);
    } else {
      setView('member_space');
    }
  };

  const handleLogout = () => {
    setAuthenticatedAdminName(null);
    setMemberUser(null);
    localStorage.removeItem(SESSION_KEY);
    setView('home');
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView 
          onRegisterIntroducer={() => setView('register_introducer')}
          onTrainingLivesClick={handleTrainingLivesClick}
          onMemberAccessClick={() => setView('member_access')}
          onIntroducerDetails={handleIntroducerSelect}
          onPresentationClick={() => setView('presentation')}
          onMembershipOfferClick={() => setView('presentation')}
          onAllFormationsClick={() => setView('trust_us')}
          isMember={!!memberUser}
          onInstallApp={handleInstallApp}
        />;
      case 'register_introducer':
        return <RegisterIntroducerView onBack={() => setView('home')} />;
      case 'introducer_details':
        return selectedIntroducer ? 
          <IntroducerDetailsView introducer={selectedIntroducer} onBack={() => setView('home')} /> : 
          null;
      case 'training_lives':
        return <TrainingLivesView 
          onBack={() => setView('home')} 
          isMember={!!memberUser} 
          onLoginRequired={() => handleLoginRequired('training_lives')}
        />;
      case 'member_access':
        return <MemberAccessView onValidated={handleMemberValidated} />;
      case 'member_space':
        return memberUser ? <MemberSpaceView memberName={memberUser} /> : null;
      case 'admin':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="glass-card p-10 rounded-[40px] w-full max-sm space-y-6 text-center border-[#FFB000]/20">
               <h2 className="text-2xl font-black uppercase italic text-white tracking-tighter">Accès ADMIN</h2>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-relaxed italic">Espace restreint aux administrateurs LAYI</p>
               <button onClick={() => setView('home')} className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl text-[10px] font-black uppercase">Retour Accueil</button>
             </div>
          </div>
        );
      case 'admin_individual':
        return authenticatedAdminName ? <IndividualAdminView adminName={authenticatedAdminName} onLogout={handleLogout} /> : null;
      case 'presentation':
        return <PresentationView 
          onBack={() => setView('home')} 
        />;
      case 'membership_offer':
        return <MembershipOfferView 
          onBack={() => setView('presentation')} 
          onViewFormations={() => setView('all_formations')}
        />;
      case 'all_formations':
        return <AllFormationsView onBack={() => setView('membership_offer')} />;
      case 'trust_us':
        return <TrustUsView onBack={() => setView('home')} />;
      default:
        return <HomeView 
          onRegisterIntroducer={() => setView('register_introducer')} 
          onTrainingLivesClick={handleTrainingLivesClick} 
          onMemberAccessClick={() => setView('member_access')} 
          onIntroducerDetails={handleIntroducerSelect} 
          onPresentationClick={() => setView('presentation')}
          onMembershipOfferClick={() => setView('presentation')}
          onAllFormationsClick={() => setView('trust_us')}
          isMember={!!memberUser} 
          onInstallApp={handleInstallApp}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFB000] selection:text-black pb-10">
      <SplashScreen />
      {isAppReady && (
        <>
          <Navbar 
            currentView={view} 
            setView={setView} 
            isAdmin={!!authenticatedAdminName || !!memberUser}
            onLogout={handleLogout}
          />
          <main className="max-w-md mx-auto pt-6 px-4">
            {renderView()}
          </main>
        </>
      )}
    </div>
  );
};

export default App;
