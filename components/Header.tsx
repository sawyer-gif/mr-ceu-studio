import React from 'react';
import { ACT_CONFIGS } from '../constants';
import { Activity, ShieldCheck, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  actNumber: number;
  engagementProgress: number;
  onLogout: () => void;
  userName: string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ actNumber, engagementProgress, onLogout, userName, theme, toggleTheme }) => {
  const currentAct = ACT_CONFIGS.find(a => a.id === actNumber);

  return (
    <header className="h-[80px] bg-[var(--bg-dark)]/60 backdrop-blur-3xl border-b border-[var(--border-color)] px-12 flex items-center justify-between shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-5">
        <div className="text-purple-500 p-2.5 bg-purple-500/10 rounded-2xl border border-purple-500/20">
          {currentAct?.icon}
        </div>
        <div>
          <h1 className="text-base font-bold text-[var(--text-primary)] tracking-tight leading-none mb-1">
            {currentAct?.title}
          </h1>
          <div className="text-[10px] text-purple-500/60 font-black uppercase tracking-[0.3em]">Studio Module {actNumber}</div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-3">
            <ShieldCheck size={14} className={engagementProgress >= 100 ? "text-green-500" : "text-[var(--text-tertiary)]"} />
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${engagementProgress >= 100 ? "text-green-500" : "text-[var(--text-secondary)]"}`}>
              {engagementProgress >= 100 ? "Time-on-Task Validated" : "Studio Engagement Progress"}
            </span>
          </div>
          <div className="w-48 h-1 bg-[var(--border-color)] rounded-full overflow-hidden">
             <div 
              className={`h-full transition-all duration-1000 ${engagementProgress >= 100 ? "bg-green-500" : "bg-purple-500"}`}
              style={{ width: `${engagementProgress}%` }} 
            />
          </div>
        </div>
        
        <div className="h-6 w-px bg-[var(--border-color)]" />
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] rounded-full transition-all"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="hidden md:flex flex-col items-end mr-4">
             <div className="text-[10px] font-bold text-[var(--text-primary)] uppercase">{userName}</div>
             <div className="text-[8px] font-black text-[var(--text-tertiary)] uppercase tracking-widest">Architect Learner</div>
          </div>
          
          <button 
            onClick={onLogout}
            title="Dashboard"
            className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] rounded-full transition-all flex items-center gap-2 group border border-transparent hover:border-[var(--border-color)]"
          >
            <LayoutDashboard size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Dashboard</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;