import React, { useState } from 'react';
import { StudioSession, ProjectSector, ApplicationZone, ConstructionType, Environment } from '../../types';
import { SECTORS, ZONES } from '../../constants';
import { Briefcase, Info, BookOpen, Check } from 'lucide-react';

interface Props {
  session: StudioSession;
  setSession: React.Dispatch<React.SetStateAction<StudioSession>>;
}

const Act1Context: React.FC<Props> = ({ session, setSession }) => {
  const [showObjectives, setShowObjectives] = useState(!session.aiaData.objectivesAcknowledged);

  const update = (key: keyof StudioSession, value: any) => {
    setSession(prev => ({ ...prev, [key]: value }));
  };

  const acknowledgeObjectives = () => {
    setSession(prev => ({
      ...prev,
      aiaData: { ...prev.aiaData, objectivesAcknowledged: true }
    }));
    setShowObjectives(false);
  };

  const learningObjectives = [
    { title: "Evaluate Performance Criteria", desc: "Identify and prioritize technical performance requirements (Fire Safety, Cleanability, Durability) for specific commercial occupancy types." },
    { title: "Implement HSW Systems", desc: "Understand the interface between computational surface design and Life Safety compliance in egress corridors and healthcare zones." },
    { title: "Execute Design Logic", desc: "Apply CNC pattern scale and relief depth principles to resolve architectural wayfinding and visual comfort challenges." },
    { title: "Generate CSI Documentation", desc: "Translate active studio design decisions into coordinated CSI MasterFormat Section 06 67 00 project specifications." }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col relative">
      
      {showObjectives && (
        <div className="absolute inset-0 z-50 flex items-center justify-center -mx-12 -my-12 backdrop-blur-xl bg-black/40">
          <div className="max-w-2xl w-full bg-[var(--bg-surface)] border border-purple-500/30 rounded-[48px] p-12 shadow-[0_0_100px_rgba(168,85,247,0.15)] animate-in zoom-in-95">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-500/10 rounded-2xl">
                <BookOpen className="text-purple-500" size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-[var(--text-primary)] uppercase italic tracking-tighter">AIA Course Syllabus</h3>
                <div className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">1.0 LU|HSW Professional Course</div>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <h4 className="text-[11px] font-black text-[var(--text-tertiary)] uppercase tracking-widest border-b border-[var(--border-color)] pb-2">Learning Objectives</h4>
              {learningObjectives.map((obj, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                    <span className="text-[10px] font-black text-purple-500">{i+1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--text-primary)] mb-1">{obj.title}</div>
                    <div className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">{obj.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-8">
              <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed font-bold italic">
                AIA CES Compliance: You must acknowledge the learning objectives to begin the active studio portion of this course.
              </p>
            </div>

            <button 
              onClick={acknowledgeObjectives}
              className="w-full py-5 bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-[0.4em] rounded-full hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-4"
            >
              Accept & Start Studio <Check size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}

      <div className="mb-20">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="text-purple-500" size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500">Project-Based Learning</span>
        </div>
        <h2 className="text-6xl font-bold tracking-[-0.05em] text-[var(--text-primary)] mb-6 text-gradient">Project Context</h2>
        <p className="text-[var(--text-secondary)] text-2xl max-w-3xl leading-snug font-medium transition-colors duration-400">
          Select a current active project. This course uses your <span className="text-[var(--text-primary)]">real project parameters</span> to teach HSW compliance through execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20 pb-24">
        <section>
          <label className="text-[11px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.3em] block mb-8">Active Project Sector</label>
          <div className="grid grid-cols-2 gap-4">
            {SECTORS.map((s) => (
              <button
                key={s.label}
                onClick={() => update('sector', s.label)}
                className={`flex items-center gap-4 p-6 rounded-[24px] border transition-all duration-500 group active:scale-[0.98] ${
                  session.sector === s.label 
                    ? 'border-purple-500/50 bg-purple-500/10 text-[var(--text-primary)] shadow-[0_0_30px_rgba(168,85,247,0.1)] scale-[1.02]' 
                    : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]'
                }`}
              >
                <div className={session.sector === s.label ? 'text-purple-500' : 'text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors'}>{s.icon}</div>
                <span className="text-[13px] font-bold tracking-tight">{s.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="text-[11px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.3em] block mb-8">Application Zone</label>
          <div className="grid grid-cols-2 gap-4">
            {ZONES.map((z) => (
              <button
                key={z.label}
                onClick={() => update('zone', z.label)}
                className={`flex items-center gap-4 p-6 rounded-[24px] border transition-all duration-500 group active:scale-[0.98] ${
                  session.zone === z.label 
                    ? 'border-purple-500/50 bg-purple-500/10 text-[var(--text-primary)] shadow-[0_0_30px_rgba(168,85,247,0.1)] scale-[1.02]' 
                    : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]'
                }`}
              >
                <div className={session.zone === z.label ? 'text-purple-500' : 'text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors'}>{z.icon}</div>
                <span className="text-[13px] font-bold tracking-tight">{z.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="text-[11px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.3em] block mb-8">Site & Construction Scope</label>
          <div className="space-y-4">
            <div className="flex gap-4 p-1.5 bg-[var(--bg-card)] rounded-[20px] border border-[var(--border-color)]">
              {(['New Construction', 'Renovation'] as ConstructionType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => update('constructionType', t)}
                  className={`flex-1 py-4 px-6 rounded-[14px] text-xs font-bold transition-all duration-500 ease-out relative flex items-center justify-center gap-2 active:scale-95 ${
                    session.constructionType === t 
                      ? 'bg-[var(--border-color)] text-[var(--text-primary)] shadow-sm border border-purple-500/30 scale-[1.05] ring-1 ring-purple-500/20' 
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {session.constructionType === t && (
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] animate-pulse" />
                  )}
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-4 p-1.5 bg-[var(--bg-card)] rounded-[20px] border border-[var(--border-color)]">
              {(['Interior', 'Exterior'] as Environment[]).map((e) => (
                <button
                  key={e}
                  onClick={() => update('environment', e)}
                  className={`flex-1 py-4 px-6 rounded-[14px] text-xs font-bold transition-all duration-500 ease-out relative flex items-center justify-center gap-2 active:scale-95 ${
                    session.environment === e 
                      ? 'bg-[var(--border-color)] text-[var(--text-primary)] shadow-sm border border-purple-500/30 scale-[1.05] ring-1 ring-purple-500/20' 
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {session.environment === e && (
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] animate-pulse" />
                  )}
                  {e}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-[var(--bg-card)] rounded-[40px] p-12 flex flex-col justify-center border border-[var(--border-color)] relative overflow-hidden group transition-colors duration-400">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full -mr-32 -mt-32 blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
          <div className="text-[11px] font-bold text-purple-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
             <Info size={14} />
             Studio Methodology
          </div>
          <p className="text-2xl text-[var(--text-primary)] leading-snug font-light tracking-tight transition-colors duration-400">
            Applying <span className="text-purple-600 font-bold">{session.zone}</span> logic to your <span className="text-purple-600 font-bold">{session.sector}</span> project ensures outcomes are practice-relevant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Act1Context;