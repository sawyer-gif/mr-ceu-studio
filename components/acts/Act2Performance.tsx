import React, { useState } from 'react';
import { StudioSession, PerformancePriorities } from '../../types';
import { ShieldAlert, BookOpen, Info, CheckCircle2, ListChecks } from 'lucide-react';

interface Props {
  session: StudioSession;
  setSession: React.Dispatch<React.SetStateAction<StudioSession>>;
}

const Act2Performance: React.FC<Props> = ({ session, setSession }) => {
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  const updatePerformance = (key: keyof PerformancePriorities, val: string) => {
    setSession(prev => ({
      ...prev,
      performance: { ...prev.performance, [key]: parseInt(val) }
    }));
  };

  const sliders = [
    { 
      key: 'cleanability', 
      label: 'Biocontainment Logic', 
      hsw: 'Health',
      desc: 'Non-porous surface requirements for infection control.',
      learning: 'AIA HSW Definition: Health refers to the physical, mental, and social well-being of occupants. In healthcare, non-porous solid surfaces prevent the harbor of pathogens, directly impacting clinical outcomes.'
    },
    { 
      key: 'durability', 
      label: 'Material Resilience', 
      hsw: 'Welfare',
      desc: 'Long-term lifecycle and impact on occupant welfare.',
      learning: 'AIA HSW Definition: Welfare includes aspects of professional practice that provide equitable access, elevate the human experience, and conserve resources. Durable materials reduce the carbon footprint of frequent replacements.'
    },
    { 
      key: 'fireSafety', 
      label: 'Thermal Response', 
      hsw: 'Safety',
      desc: 'ASTM E84 Class A certification for egress corridors.',
      learning: 'AIA HSW Definition: Safety refers to the protection of occupants from harm. Class A fire ratings ensure that in an emergency, wall surfaces do not contribute significantly to flame spread in critical egress paths.'
    },
    { 
      key: 'lighting', 
      label: 'LRV Calibration', 
      hsw: 'Welfare',
      desc: 'Light Reflectance Values affecting visual comfort.',
      learning: 'Visual comfort is a key Welfare metric. High LRV surfaces reduce the need for artificial lighting, mitigating glare and supporting circadian health in workplace and educational environments.'
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col lg:flex-row gap-16 pb-24">
      <div className="flex-1">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-[var(--accent-purple)]" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent-purple)]">Educational Module: HSW Criteria</span>
          </div>
          <h2 className="text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6 text-gradient">Performance Standards</h2>
          <p className="text-[var(--text-secondary)] text-xl leading-relaxed font-medium max-w-2xl">
            AIA CEU Requirement: Understanding the relationship between <span className="text-[var(--text-primary)]">technical performance</span> and <span className="text-[var(--text-primary)]">occupant safety</span>. Calibrate your project-specific priorities below.
          </p>
        </div>

        <div className="space-y-8">
          {sliders.map((s) => (
            <div 
              key={s.key} 
              className={`p-8 rounded-[32px] border transition-all duration-500 cursor-pointer group card-shadow ${
                activeInfo === s.key ? 'bg-[var(--accent-purple-glow)] border-[var(--accent-purple)]/30' : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--text-tertiary)]'
              }`}
              onClick={() => setActiveInfo(s.key)}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                      s.hsw === 'Safety' ? 'text-red-500 border-red-500/30 bg-red-500/5' : 
                      s.hsw === 'Health' ? 'text-green-500 border-green-500/30 bg-green-500/5' : 'text-blue-500 border-blue-500/30 bg-blue-500/5'
                    }`}>
                      {s.hsw}
                    </span>
                    <h4 className="text-[16px] font-bold text-[var(--text-primary)] tracking-tight">{s.label}</h4>
                  </div>
                  <p className="text-[12px] text-[var(--text-tertiary)] font-medium">{s.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="mono text-[14px] font-bold text-[var(--text-primary)] bg-[var(--bg-dark)]/40 px-4 py-1.5 rounded-full border border-[var(--border-color)]">
                    {(session.performance as any)[s.key]}%
                  </span>
                </div>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={(session.performance as any)[s.key]}
                onChange={(e) => updatePerformance(s.key as any, e.target.value)}
                className="w-full accent-purple-500 mb-2 h-1 bg-[var(--border-color)] rounded-full appearance-none"
              />
              <div className="flex justify-between text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">
                <span>Standard Code</span>
                <span>High Performance Studio</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-[400px] shrink-0">
        <div className="sticky top-12 space-y-8">
          <div className="bg-[var(--bg-card)] rounded-[40px] p-10 border border-[var(--border-color)] card-shadow relative overflow-hidden group min-h-[450px] flex flex-col">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent-purple)]/5 rounded-full -mr-16 -mt-16 blur-[60px]" />
            <div className="flex items-center gap-3 mb-10 border-b border-[var(--border-color)] pb-6">
              <Info className="text-[var(--accent-purple)]" size={18} />
              <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-tertiary)]">AIA Technical Brief</h5>
            </div>
            
            {activeInfo ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1 flex flex-col">
                <h6 className="text-[var(--text-primary)] font-bold text-lg mb-4">{sliders.find(s => s.key === activeInfo)?.label}</h6>
                <div className="p-6 bg-[var(--bg-dark)]/10 rounded-3xl border border-[var(--border-color)] mb-8 flex-1">
                  <p className="text-[var(--text-secondary)] leading-relaxed text-[15px] font-medium italic">
                    {sliders.find(s => s.key === activeInfo)?.learning}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-widest">
                    <CheckCircle2 size={14} className="text-[var(--accent-purple)]" />
                    CSI Div 06 Interface
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-widest">
                    <CheckCircle2 size={14} className="text-[var(--accent-purple)]" />
                    Life Safety Compliance
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-[var(--bg-dark)]/5 rounded-3xl flex items-center justify-center mb-6 border border-[var(--border-color)]">
                  <ListChecks className="text-[var(--text-tertiary)]/30" size={28} />
                </div>
                <p className="text-[12px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.4em] leading-loose max-w-[200px]">
                  Select a category <br/> for standard <br/> learning insights.
                </p>
              </div>
            )}
          </div>
          
          <div className="p-8 bg-[var(--accent-purple-glow)] border border-[var(--accent-purple)]/20 rounded-[32px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldAlert size={40} className="text-[var(--accent-purple)]" />
            </div>
            <h5 className="text-[11px] font-black uppercase tracking-widest text-[var(--accent-purple)] mb-3">HSW Applied Context</h5>
            <p className="text-[var(--text-secondary)] text-[13px] font-medium leading-relaxed">
              Applying these values will automatically populate the <span className="text-[var(--text-primary)]">CSI Specification Part 2</span> in Act 5.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Act2Performance;