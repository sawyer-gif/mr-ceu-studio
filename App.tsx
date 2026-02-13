
import React, { useState, useEffect } from 'react';
import { StudioSession, ActID, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Act1Context from './components/acts/Act1Context';
import Act2Performance from './components/acts/Act2Performance';
import Act3Customization from './components/acts/Act3Customization';
import Act4Systems from './components/acts/Act4Systems';
import Act5Spec from './components/acts/Act5Spec';
import Act6Quiz from './components/acts/Act6Quiz';
import AIAAdvisor from './components/AIAAdvisor';
import { ChevronRight, ChevronLeft, ShieldCheck, Sparkles } from 'lucide-react';

const MIN_ENGAGEMENT_SECONDS = 15;

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'dashboard' | 'studio' | 'admin'>('landing');
  const [session, setSession] = useState<StudioSession | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);

  // Persistence and Theme initialization
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setView('admin');
    }

    const savedUser = localStorage.getItem('mr_ceu_user');
    if (savedUser && window.location.pathname !== '/admin') {
      setUser(JSON.parse(savedUser));
      setView('dashboard');
    }
    const savedTheme = localStorage.getItem('mr_ceu_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mr_ceu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mr_ceu_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mr_ceu_theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [theme]);

  useEffect(() => {
    if (view === 'landing' && theme !== 'dark') {
      setTheme('dark');
    }
  }, [view, theme]);

  // Time-on-task tracker
  useEffect(() => {
    if (view !== 'studio' || !session) return;
    const interval = setInterval(() => {
      setSession(s => s ? ({ ...s, engagementSeconds: s.engagementSeconds + 1 }) : null);
    }, 1000);
    return () => clearInterval(interval);
  }, [view, session]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSession(null);
    setView('landing');
  };

  const startStudio = () => {
    setSession({
      currentAct: 1,
      sector: 'Workplace',
      zone: 'Lobby',
      constructionType: 'New Construction',
      environment: 'Interior',
      performance: {
        cleanability: 50,
        durability: 50,
        impactResistance: 50,
        fireSafety: 50,
        maintenance: 50,
        lighting: 50,
      },
      design: {
        patternFamily: 'Bio-Organic',
        scale: 1,
        depth: 0.5,
        orientation: 'Vertical',
        density: 1,
        backlighting: false,
      },
      quizPassed: false,
      startTime: Date.now(),
      engagementSeconds: 0,
      actProgress: [1],
      aiaData: {
        learnerName: user?.name || '',
        learnerEmail: user?.email || '',
        aiaNumber: user?.aiaNumber || '',
        objectivesAcknowledged: false
      }
    });
    setView('studio');
  };

  const markActComplete = (actId: number) => {
    if (session && !session.actProgress.includes(actId)) {
      setSession(s => s ? ({ ...s, actProgress: [...s.actProgress, actId] }) : null);
    }
  };

  const nextAct = () => {
    if (!session) return;
    markActComplete(session.currentAct);
    if (session.currentAct === 6 && session.quizPassed) {
      if (user) {
        setUser({
          ...user,
          creditsEarned: user.creditsEarned + 1,
          hswCredits: user.hswCredits + 1,
          completedCourses: [...user.completedCourses, 'Computational Surface Systems 101']
        });
      }
      setView('dashboard');
      return;
    }
    setSession(prev => prev ? ({ ...prev, currentAct: Math.min(prev.currentAct + 1, 6) }) : null);
  };

  const prevAct = () => setSession(prev => prev ? ({ ...prev, currentAct: Math.max(prev.currentAct - 1, 1) }) : null);

  if (view === 'admin') {
    return <AdminDashboard />;
  }

  if (view === 'landing') {
    return (
      <LandingPage 
        onLogin={handleLogin} 
        isAdminLoginOpen={isAdminLoginOpen}
        onAdminLoginToggle={setIsAdminLoginOpen}
      />
    );
  }

  if (view === 'dashboard' && user) {
    return <Dashboard user={user} onStartStudio={startStudio} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />;
  }

  if (view === 'studio' && session && user) {
    const isActEngagementValid = () => {
      if (session.currentAct === 1 && !session.aiaData.objectivesAcknowledged) return false;
      return true;
    };

    const timeProgress = Math.min((session.engagementSeconds / MIN_ENGAGEMENT_SECONDS) * 100, 100);

    return (
      <div className="flex h-screen overflow-hidden bg-[var(--bg-dark)] text-[var(--text-primary)]">
        <Sidebar 
          currentAct={session.currentAct} 
          actProgress={session.actProgress}
          setAct={(act) => {
            if (session.actProgress.includes(act) || act <= Math.max(...session.actProgress) + 1) {
               setSession(s => s ? ({ ...s, currentAct: act }) : null);
            }
          }} 
        />
        
        <main className="flex-1 flex flex-col relative overflow-hidden bg-[var(--bg-surface)]">
          <Header 
            actNumber={session.currentAct} 
            engagementProgress={timeProgress} 
            onLogout={() => setView('dashboard')}
            userName={user.name}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          
          <div className="flex-1 overflow-y-auto px-8 md:px-12 py-12 relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] pointer-events-none" />
            <div className="max-w-6xl mx-auto h-full relative z-10">
              {session.currentAct === ActID.PROJECT_CONTEXT && <Act1Context session={session} setSession={setSession as any} />}
              {session.currentAct === ActID.PERFORMANCE_DECISION && <Act2Performance session={session} setSession={setSession as any} />}
              {session.currentAct === ActID.SURFACE_CUSTOMIZATION && <Act3Customization session={session} setSession={setSession as any} />}
              {session.currentAct === ActID.SYSTEM_CONSTRUCTABILITY && <Act4Systems session={session} />}
              {session.currentAct === ActID.DOCUMENTATION_SPEC && <Act5Spec session={session} />}
              {session.currentAct === ActID.KNOWLEDGE_CHECK && <Act6Quiz session={session} setSession={setSession as any} />}
            </div>
          </div>

          <AIAAdvisor 
            isOpen={isAIAdvisorOpen} 
            onClose={() => setIsAIAdvisorOpen(false)} 
            session={session} 
          />

          <footer className="border-t border-[var(--border-color)] bg-[var(--bg-dark)] backdrop-blur-xl p-6 flex justify-between items-center px-12 z-20">
            <div className="flex items-center gap-6">
              <button 
                onClick={prevAct}
                disabled={session.currentAct === 1}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full transition-all ${
                  session.currentAct === 1 ? 'text-[var(--text-tertiary)] cursor-not-allowed' : 'text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <ChevronLeft size={20} strokeWidth={3} />
                Back
              </button>
              
              {session.engagementSeconds < MIN_ENGAGEMENT_SECONDS && session.currentAct === 6 && (
                <div className="flex items-center gap-3 text-[10px] font-black text-yellow-500 uppercase tracking-widest px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                  <ShieldCheck size={14} />
                  AIA Time-On-Task Required: {Math.max(0, MIN_ENGAGEMENT_SECONDS - session.engagementSeconds)}s remaining
                </div>
              )}
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsAIAdvisorOpen(!isAIAdvisorOpen)}
                className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-full border border-purple-500/30 transition-all ${isAIAdvisorOpen ? 'bg-purple-600 text-white' : 'text-purple-500 hover:bg-purple-500/10'}`}
              >
                <Sparkles size={14} /> AIA Advisor
              </button>
              
              <button 
                onClick={nextAct}
                disabled={!isActEngagementValid() || (session.currentAct === 6 && session.engagementSeconds < MIN_ENGAGEMENT_SECONDS && !session.quizPassed)}
                className={`group flex items-center gap-3 px-10 py-4 text-sm font-black rounded-full transition-all uppercase tracking-widest ${
                  !isActEngagementValid() || (session.currentAct === 6 && session.engagementSeconds < MIN_ENGAGEMENT_SECONDS && !session.quizPassed)
                    ? 'bg-[var(--border-color)] text-[var(--text-secondary)] cursor-not-allowed opacity-50' 
                    : session.currentAct === 6 && session.quizPassed ? 'bg-green-600 text-white' : 'bg-black dark:bg-white text-white dark:text-black hover:bg-purple-50 hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.2)]'
                }`}
              >
                {session.currentAct === 6 ? (session.quizPassed ? 'Return to Dashboard' : 'Begin Assessment') : 'Continue'}
                {session.currentAct < 6 && <ChevronRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </footer>
        </main>
      </div>
    );
  }

  return null;
};

export default App;
