import React from 'react';
import { ACT_CONFIGS } from '../constants';
import { Lock } from 'lucide-react';

interface SidebarProps {
  currentAct: number;
  actProgress: number[];
  setAct: (act: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentAct, actProgress, setAct }) => {
  return (
    <aside className="w-[320px] bg-[var(--bg-dark)] border-r border-[var(--border-color)] flex flex-col shrink-0 z-20">
      <div className="p-10 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1.5 h-8 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
          <div className="text-[var(--text-primary)] font-bold text-2xl tracking-[-0.04em]">MR CEU Studio</div>
        </div>
        <div className="text-[10px] text-purple-500 font-bold uppercase tracking-[0.3em] pl-4">AIA HSW Certification</div>
      </div>

      <nav className="flex-1 mt-12 px-6 space-y-2">
        {ACT_CONFIGS.map((act) => {
          const isActive = currentAct === act.id;
          const isUnlocked = actProgress.includes(act.id) || act.id <= Math.max(...actProgress) + 1;
          const isCompleted = actProgress.includes(act.id) && currentAct !== act.id;

          return (
            <button
              key={act.id}
              disabled={!isUnlocked}
              onClick={() => setAct(act.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 text-sm font-medium rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-purple-500/10 text-[var(--text-primary)] shadow-lg border border-purple-500/20' 
                  : isUnlocked 
                    ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)]/40'
                    : 'text-[var(--text-tertiary)] cursor-not-allowed'
              }`}
            >
              <span className={`flex items-center justify-center w-6 h-6 text-[10px] font-bold shrink-0 transition-colors ${
                isActive ? 'text-purple-500' : isUnlocked ? 'text-[var(--text-tertiary)]' : 'text-[var(--text-tertiary)] opacity-30'
              }`}>
                {!isUnlocked ? <Lock size={12} /> : act.id.toString().padStart(2, '0')}
              </span>
              <span className={`tracking-tight ${isActive ? 'font-bold' : 'font-semibold'}`}>{act.title}</span>
              {isCompleted && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-10 border-t border-[var(--border-color)] mt-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl border border-[var(--border-color)] flex items-center justify-center bg-[var(--bg-dark)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[11px] font-black text-[var(--text-primary)] relative z-10">AIA</span>
          </div>
          <div>
            <div className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">HSW Provider</div>
            <div className="text-[10px] text-[var(--text-tertiary)]">MR Walls | #4012435</div>
          </div>
        </div>
        <div className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-medium">
          Professional development for computational surface systems.
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;