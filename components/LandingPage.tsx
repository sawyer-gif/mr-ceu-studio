
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, X, Sun, Moon } from 'lucide-react';
import { User } from '../types';
import WaitlistModal from './WaitlistModal';
import LegalModals from './LegalModals';
import StudioPreviewModule from './studio/StudioPreviewModule';
import StudioPreviewModule from './studio/StudioPreviewModule';

interface LandingPageProps {
  onLogin: (user: User) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAdminLoginOpen: boolean;
  onAdminLoginToggle: (isOpen: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, theme, toggleTheme, isAdminLoginOpen, onAdminLoginToggle }) => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [legalType, setLegalType] = useState<'compliance' | 'privacy' | 'terms' | null>(null);
  const [adminCreds, setAdminCreds] = useState({ email: '', password: '' });
  const [adminError, setAdminError] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    if (adminCreds.email === 'admin@mrwalls.com' && adminCreds.password === 'admin') {
       onAdminLoginToggle(false);
       console.log("Admin logged in");
    } else {
       setAdminError('Invalid credentials. Use admin@mrwalls.com / admin');
    }
  };

  const firms = ["Gensler", "HOK", "HDR", "Perkins&Will", "HKS", "AECOM", "Corgan", "PGAL", "Populous"];
  const marqueeContent = Array(10).fill(firms).flat();



  return (
    <div className="relative min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)] flex flex-col items-center overflow-x-hidden transition-colors duration-500">
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      <LegalModals type={legalType} onClose={() => setLegalType(null)} />
      
      {/* Admin Auth Overlay */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-6">
          <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] p-10 rounded-[40px] shadow-2xl relative animate-in zoom-in-95">
            <button onClick={() => onAdminLoginToggle(false)} className="absolute top-8 right-8 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
              <X size={24} />
            </button>
            <div className="mb-10 text-center">
              <Lock className="mx-auto mb-4 text-[var(--accent-purple)]" size={32} />
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-[var(--text-primary)]">Admin Access</h3>
              <p className="text-[var(--text-tertiary)] text-xs font-black uppercase tracking-widest">Demo: admin@mrwalls.com / admin</p>
            </div>
            <form onSubmit={handleAdminSubmit} className="space-y-6">
              {adminError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-2xl text-center">
                  {adminError}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] ml-2">Email</label>
                <input required type="email" value={adminCreds.email} onChange={e => setAdminCreds({...adminCreds, email: e.target.value})} className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] p-5 rounded-2xl outline-none focus:border-[var(--accent-purple)] transition-all text-sm" placeholder="admin@mrwalls.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] ml-2">Password</label>
                <input required type="password" value={adminCreds.password} onChange={e => setAdminCreds({...adminCreds, password: e.target.value})} className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] p-5 rounded-2xl outline-none focus:border-[var(--accent-purple)] transition-all text-sm" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full py-5 bg-[var(--text-primary)] text-[var(--bg-dark)] font-black text-xs uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all shadow-2xl mt-4">Access Dashboard</button>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-between items-center animate-fade-in-up">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="w-1.5 h-6 bg-[var(--accent-purple)] rounded-full shadow-[0_0_12px_rgba(111,60,195,0.3)]" />
          <div className="flex flex-col">
            <h2 className="text-xl font-black tracking-tight uppercase italic text-[var(--text-primary)] leading-none">MR CEU Studio</h2>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[var(--text-tertiary)] mt-1">Professional Education</span>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={toggleTheme}
            className="p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-surface)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsWaitlistOpen(true)} className="px-8 py-3 bg-[var(--text-primary)] text-[var(--bg-dark)] rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg flex items-center gap-2">
             Join Waitlist
          </button>
        </div>
      </nav>

{/* HERO WRAPPER */}
<section className="relative w-full min-h-screen overflow-hidden">
  {/* Background Video */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    >
      <source src="/videos/background.mp4" type="video/mp4" />
    </video>
  </div>

  {/* Dark Overlay */}
  <div className="absolute inset-0 z-10 bg-black/60" />

  {/* Hero Content */}
  <div className="relative z-20 min-h-screen flex items-center justify-center px-6 pt-32 pb-12 text-center">
    <div className="w-full max-w-6xl flex flex-col items-center text-center gap-10">
      <div className="flex flex-col items-center gap-6 animate-fade-in-up">
        <div className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-[#EFE8FB] border border-[#6F3CC3]/20 rounded-full dark:bg-[#6F3CC3]/10 dark:border-[#8B5CF6]/30 shadow-sm">
          <ShieldCheck size={14} className="text-[#6F3CC3] dark:text-[#8B5CF6]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6F3CC3] dark:text-[#8B5CF6]">AIA CES Registered Provider</span>
        </div>
        <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.85] text-[var(--text-primary)]">
          Earn Your HSW CEU — <br />
          <span className="text-gradient">Reimagined.</span>
        </h1>
        <p className="text-lg md:text-2xl text-[var(--text-secondary)] max-w-4xl mx-auto leading-relaxed font-medium">
          Immersive, interactive learning designed for commercial architects. Earn AIA-compliant HSW credit through real-world design scenarios and project based-learning.
        </p>
      </div>

      <div className="animate-fade-in-up flex flex-col items-center gap-6">
        <button onClick={() => setIsWaitlistOpen(true)} className="cta-primary relative flex items-center gap-8 px-14 py-8 font-black text-2xl rounded-full transition-all">
          🚀 Join Priority Waitlist
        </button>
        <div className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-[var(--text-tertiary)] flex items-center gap-3">
          AIA Registered <span className="opacity-30">•</span> HSW Credit <span className="opacity-30">•</span> 100% Compliant
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Firm Marquee */}        {/* Firm Marquee */}
        <section className="w-full overflow-hidden py-20 border-t border-[var(--border-color)]">
          <div className="text-center mb-10">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-tertiary)]">Built for the world's leading firms</span>
          </div>
          <div className="flex whitespace-nowrap animate-scroll">
            {marqueeContent.map((firm, i) => (
              <div key={i} className="flex items-center">
                <span className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-[var(--text-primary)] px-8 opacity-40">{firm}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-purple)] opacity-30 mx-4" />
              </div>
            ))}
          </div>
        </section>

        {/* Studio Immersion Reel */}
        <section className="w-full border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 flex flex-col items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-tertiary)]">Studio Immersion</div>
            <div className="w-full rounded-[32px] overflow-hidden border border-[var(--border-color)] shadow-2xl">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/hero-transformation.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="text-sm md:text-base text-[var(--text-secondary)] text-center font-medium max-w-3xl">
              Watch how architects move from brief to build inside the MR CEU Studio — real models, real documentation, real compliance.
            </p>
          </div>
        </section>

        <section className="w-full border-t border-[var(--border-color)] bg-[var(--bg-dark)]/70 py-28 px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-4 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-tertiary)]">Inside the MR CEU Studio Experience</p>
              <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)]">See how architects learn through real project decisions</h2>
              <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-3xl mx-auto">Real scenarios, real decisions, real HSW validation — not passive slides.</p>
            </div>

            <StudioPreviewModule />

            <div className="rounded-[30px] border border-white/10 bg-white/5 px-6 py-4 text-[10px] md:text-xs text-white/80 font-black uppercase tracking-[0.4em] flex flex-wrap items-center justify-center gap-4">
              <span>✓ AIA HSW Mapped Outcomes</span>
              <span className="hidden md:inline">•</span>
              <span>✓ Verified Time-on-Task Tracking</span>
              <span className="hidden md:inline">•</span>
              <span>✓ Instructor Reviewed Transcript</span>
            </div>
          </div>
        </section>

      <footer className="w-full border-t border-[var(--border-color)] py-20 px-12 flex flex-col md:flex-row justify-between items-center gap-10 opacity-70">
        <div className="flex items-center gap-3">
          <div className="w-0.5 h-4 bg-[var(--text-primary)] rounded-full" />
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">MR CEU Studio &copy; 2025</div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)] items-center">
          <button 
            onClick={() => setLegalType('compliance')} 
            className="hover:text-[var(--accent-purple)] transition-colors focus:outline-none focus:text-[var(--accent-purple)]"
            aria-label="View AIA Compliance Disclosure"
          >
            AIA Compliance
          </button>
          <button 
            onClick={() => setLegalType('privacy')} 
            className="hover:text-[var(--accent-purple)] transition-colors focus:outline-none focus:text-[var(--accent-purple)]"
            aria-label="View Privacy Policy"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setLegalType('terms')} 
            className="hover:text-[var(--accent-purple)] transition-colors focus:outline-none focus:text-[var(--accent-purple)]"
            aria-label="View Terms of Service"
          >
            Terms of Service
          </button>
          <div className="hidden md:block w-px h-3 bg-[var(--border-color)]" />
          <button onClick={() => onAdminLoginToggle(true)} className="hover:text-[var(--accent-purple)] transition-colors lowercase opacity-40 hover:opacity-100">admin</button>
        </div>
      </footer>
   </div>   
  );
};

export default LandingPage;
