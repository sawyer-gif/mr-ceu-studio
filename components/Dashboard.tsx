import React, { useState } from 'react';
import { User } from '../types';
import { Award, BookOpen, Clock, LogOut, Play, CheckCircle, ShieldCheck, FileText, ChevronRight, Layers, Sun, Moon, Bell, LayoutGrid } from 'lucide-react';
import WaitlistModal from './WaitlistModal';

interface DashboardProps {
  user: User;
  onStartStudio: () => void;
  onLogout: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartStudio, onLogout, theme, toggleTheme }) => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistCourse, setWaitlistCourse] = useState("");
  
  const annualRequirement = 18.0;
  const hswRequirement = 12.0;
  
  const totalPercent = Math.min((user.creditsEarned / annualRequirement) * 100, 100);
  const hswPercent = Math.min((user.hswCredits / hswRequirement) * 100, 100);

  const openWaitlist = (course: string) => {
    setWaitlistCourse(course);
    setIsWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)] flex flex-col transition-colors duration-400">
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
        courseTitle={waitlistCourse}
      />
      
      <header className="h-[100px] border-b border-[var(--border-color)] px-12 flex items-center justify-between bg-[var(--bg-dark)]/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-8 bg-[var(--accent-purple)] rounded-full shadow-[0_0_15px_rgba(111,60,195,0.3)]" />
          <div>
            <h1 className="text-xl font-black italic uppercase tracking-tighter text-[var(--text-primary)]">Architect Dashboard</h1>
            <p className="text-[10px] text-[var(--text-tertiary)] font-black uppercase tracking-[0.4em]">Professional CEU Transcript</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <button 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] rounded-full transition-all"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="text-right">
            <div className="text-sm font-bold text-[var(--text-primary)]">{user.name}</div>
            <div className="text-[10px] text-[var(--text-tertiary)] font-black uppercase tracking-widest">AIA #{user.aiaNumber}</div>
          </div>
          <button 
            onClick={onLogout}
            className="p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] rounded-full transition-all flex items-center gap-2 group"
          >
            <LogOut size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="col-span-1 md:col-span-2 bg-[var(--bg-card)] p-10 rounded-[40px] border border-[var(--border-color)] relative overflow-hidden group shadow-sm transition-colors duration-400">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-purple)]/5 rounded-full -mr-32 -mt-32 blur-[100px]" />
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-[var(--text-primary)]">AIA Annual Progress</h3>
                <p className="text-[var(--text-tertiary)] text-[11px] font-black uppercase tracking-widest">Cycle: 2025 Calendar Year</p>
              </div>
              <Award className="text-[var(--accent-purple)]" size={40} />
            </div>

            <div className="space-y-10 relative z-10">
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span className="text-[var(--text-primary)]">Total Credits Earned</span>
                  <span className="text-[var(--accent-purple)]">{user.creditsEarned.toFixed(1)} / {annualRequirement.toFixed(1)} LU</span>
                </div>
                <div className="h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent-purple)] transition-all duration-1000" style={{ width: `${totalPercent}%` }} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span className="text-[var(--text-primary)]">HSW Specialized Units</span>
                  <span className="text-[var(--accent-purple)]">{user.hswCredits.toFixed(1)} / {hswRequirement.toFixed(1)} HSW</span>
                </div>
                <div className="h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent-purple)] opacity-60 transition-all duration-1000" style={{ width: `${hswPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--accent-purple)] p-10 rounded-[40px] flex flex-col justify-between shadow-[0_20px_60px_-15px_var(--accent-purple-glow)] group hover:scale-[1.02] transition-transform cursor-pointer" onClick={onStartStudio}>
             <div>
               <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                 <Play className="text-white fill-white" size={24} />
               </div>
               <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-4 text-white">Start Studio</h3>
               <p className="text-white/80 text-sm font-medium leading-relaxed">
                 Launch the Applied Studio and earn 1.0 HSW Unit for Computational Surface Systems.
               </p>
             </div>
             <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white">
               Begin Course <ChevronRight size={16} />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--text-tertiary)]">Available Studio Courses</h4>
              <button className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-purple)] hover:text-[var(--text-primary)] transition-colors">View All Catalog</button>
            </div>
            
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[40px] p-8 flex items-center gap-8 group hover:border-[var(--accent-purple)]/50 transition-all cursor-pointer shadow-sm" onClick={onStartStudio}>
              <div className="w-32 h-32 bg-[var(--bg-dark)] rounded-3xl shrink-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purple)]/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck size={40} className="text-[var(--text-tertiary)] group-hover:text-[var(--accent-purple)] transition-colors" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent-purple)] px-2 py-0.5 border border-[var(--accent-purple)]/20 bg-[var(--accent-purple)]/5 rounded">1.0 HSW Credit</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)]">60 Minutes</span>
                </div>
                <h5 className="text-xl font-bold text-[var(--text-primary)] mb-2">Computational Surface Systems 101</h5>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">Applied studio logic for CNC milled solid-surface architectural interiors.</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:bg-[var(--accent-purple)] group-hover:text-white group-hover:border-[var(--accent-purple)] transition-all text-[var(--text-secondary)]">
                <Play size={18} fill="currentColor" />
              </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[40px] p-8 flex items-center gap-8 group hover:border-[var(--accent-purple)]/50 transition-all cursor-pointer shadow-sm" onClick={onStartStudio}>
              <div className="w-32 h-32 bg-[var(--bg-dark)] rounded-3xl shrink-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purple)]/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <LayoutGrid size={40} className="text-[var(--text-tertiary)] group-hover:text-[var(--accent-purple)] transition-colors" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent-purple)] px-2 py-0.5 border border-[var(--accent-purple)]/20 bg-[var(--accent-purple)]/5 rounded">1.0 LU | HSW CREDIT</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)]">60 MINUTES</span>
                </div>
                <h5 className="text-xl font-bold text-[var(--text-primary)] mb-2">Designing Solid Surface Systems Beyond the Countertop</h5>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">An interactive studio-based course exploring solid surface material performance, detailing, and system integration using DuPont™ Corian®. Applied design logic for healthcare, hospitality, workplace, and education environments.</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:bg-[var(--accent-purple)] group-hover:text-white group-hover:border-[var(--accent-purple)] transition-all text-[var(--text-secondary)]">
                <Play size={18} fill="currentColor" />
              </div>
            </div>

            <div 
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[40px] p-8 flex items-center gap-8 shadow-sm group hover:border-[var(--accent-purple)]/30 transition-all cursor-pointer"
              onClick={() => openWaitlist("Advanced Parametric Facades")}
            >
              <div className="w-32 h-32 bg-[var(--bg-dark)] rounded-3xl shrink-0 flex items-center justify-center opacity-40 grayscale group-hover:grayscale-0 transition-all">
                 <Layers size={40} className="text-[var(--text-tertiary)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)] px-2 py-0.5 border border-border bg-white/5 rounded">1.0 LU Credit</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent-purple)] group-hover:text-[var(--accent-purple)] opacity-80">Coming Summer 2025</span>
                </div>
                <h5 className="text-xl font-bold text-[var(--text-primary)] mb-2">Advanced Parametric Facades</h5>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">Exploring complex exterior envelopes through MR Walls system integration.</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                 <button className="px-6 py-3 bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)]/20 rounded-full text-[9px] font-black uppercase tracking-widest text-[var(--accent-purple)] group-hover:bg-[var(--accent-purple)] group-hover:text-white transition-all flex items-center gap-2">
                   <Bell size={12} /> Join Waitlist
                 </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--text-tertiary)]">Recent Activity</h4>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[40px] p-8 space-y-8 shadow-sm">
              {user.completedCourses.length > 0 ? (
                user.completedCourses.map((course, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
                      <CheckCircle size={18} className="text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)] mb-1">{course}</div>
                      <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-widest">Completed Recently</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                   <Clock className="text-[var(--text-tertiary)] mx-auto mb-4" size={32} />
                   <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)]">No Course History</p>
                </div>
              )}

              <div className="pt-8 border-t border-[var(--border-color)]">
                <button className="w-full py-4 bg-[var(--border-color)]/30 border border-[var(--border-color)] text-[var(--text-primary)] font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-[var(--border-color)]/50 transition-all flex items-center justify-center gap-3">
                  <FileText size={14} />
                  Download Full Transcript
                </button>
              </div>
            </div>
            
            <div className="p-8 bg-[var(--accent-purple)]/5 border border-[var(--accent-purple)]/10 rounded-[32px]">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={18} className="text-[var(--accent-purple)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-purple)]">AIA Compliance</span>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-medium">
                All earned credits are automatically reported to your AIA transcript within 7-10 business days of completion.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;