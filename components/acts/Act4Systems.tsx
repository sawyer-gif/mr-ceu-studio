import React, { useState } from 'react';
import { StudioSession } from '../../types';
import { Info, Target, Layers, Maximize2 } from 'lucide-react';

const Act4Systems: React.FC<{ session: StudioSession }> = ({ session }) => {
  const [activeLayer, setActiveLayer] = useState<'Panels' | 'Substrate' | 'Lighting'>('Panels');

  const layers = [
    { id: 'Panels', icon: <Maximize2 size={18} />, desc: 'Surface Interface' },
    { id: 'Substrate', icon: <Layers size={18} />, desc: 'Framing Logic' },
    { id: 'Lighting', icon: <Info size={18} />, desc: 'Cavity Access' },
  ];

  const hotspots = [
    { x: '25%', y: '30%', label: 'Expansion Finger-Joint', note: 'Interlocking geometry ensures continuous pattern flow across panel seams without visible breaks.' },
    { x: '65%', y: '50%', label: 'Attachment Vectors', note: 'Concealed Z-clip hardware supports dynamic loads for interior applications.' },
    { x: '45%', y: '80%', label: 'Recessed Base Condition', note: '1/2" reveal provides a hygienic transition between floor finishes and surface wall panels.' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24">
      <div className="mb-20">
        <h2 className="text-6xl font-bold tracking-[-0.05em] text-[var(--text-primary)] mb-6">Constructability</h2>
        <p className="text-[var(--text-secondary)] text-2xl leading-snug font-medium max-w-2xl">
          Evaluate how the <span className="text-[var(--text-primary)] underline underline-offset-8 decoration-4 decoration-purple-500">{session.design.patternFamily}</span> system interfaces with standard building assemblies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          <div className="relative aspect-[16/10] bg-[var(--bg-dark)] rounded-[48px] overflow-hidden group shadow-xl border border-[var(--border-color)]">
            {/* High Tech CAD Simulation Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full p-20">
                <div className="w-full h-full border-t border-l border-[var(--border-color)] grid grid-cols-12 grid-rows-8 gap-0">
                  {[...Array(96)].map((_, i) => (
                    <div key={i} className="border-r border-b border-[var(--border-color)]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-tertiary)]">
               <div className="mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 opacity-40">Isometric Section A-04</div>
               <div className="w-64 h-px bg-[var(--border-color)]" />
            </div>

            {/* Hotspots */}
            {hotspots.map((h, i) => (
              <div 
                key={i}
                className="absolute group/hotspot transition-all duration-500"
                style={{ left: h.x, top: h.y }}
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center cursor-pointer group-hover/hotspot:bg-purple-500 group-hover/hotspot:scale-125 transition-all shadow-lg group-hover/hotspot:shadow-purple-500/40">
                  <Target size={14} className="text-purple-500 group-hover:text-white transition-colors" />
                </div>
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-64 opacity-0 group-hover/hotspot:opacity-100 transition-all duration-500 glass border border-[var(--border-color)] p-6 rounded-[32px] shadow-2xl pointer-events-none z-30 translate-x-4 group-hover/hotspot:translate-x-0">
                   <div className="text-[10px] font-black text-purple-600 uppercase tracking-[0.3em] mb-3">{h.label}</div>
                   <div className="text-[13px] text-[var(--text-primary)] leading-relaxed font-medium">{h.note}</div>
                </div>
              </div>
            ))}

            <div className="absolute top-8 left-8 glass border border-[var(--border-color)] p-6 rounded-[32px]">
               <div className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.4em] mb-3">Live Layer Analysis</div>
               <div className="text-[var(--text-primary)] font-bold text-lg tracking-tight">{activeLayer} Overlay Active</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {layers.map(l => (
              <button
                key={l.id}
                onClick={() => setActiveLayer(l.id as any)}
                className={`flex flex-col items-center p-8 rounded-[32px] border transition-all duration-500 ${
                  activeLayer === l.id 
                    ? 'border-purple-500 bg-purple-500/10 text-[var(--text-primary)] shadow-lg scale-[1.02]' 
                    : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]'
                }`}
              >
                <div className={`mb-4 ${activeLayer === l.id ? 'text-purple-500' : 'text-[var(--text-tertiary)]'}`}>{l.icon}</div>
                <div className="text-[11px] font-black uppercase tracking-[0.3em] mb-1">{l.id}</div>
                <div className="text-[10px] font-bold opacity-60 tracking-wider uppercase">{l.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <div className="bg-[var(--bg-card)] p-10 rounded-[40px] border border-[var(--border-color)] card-shadow">
             <h4 className="text-[11px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.4em] mb-10">Coordination Protocols</h4>
             <ul className="space-y-10">
               <li className="flex gap-6">
                 <div className="w-10 h-10 rounded-2xl bg-[var(--bg-dark)] flex items-center justify-center shrink-0 border border-[var(--border-color)]">
                   <span className="text-[10px] font-black text-[var(--text-primary)]">01</span>
                 </div>
                 <div>
                   <div className="text-sm font-bold text-[var(--text-primary)] mb-2 tracking-tight">Adjacent Trades</div>
                   <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-medium">Verify millwork interface and ceiling soffit details match the {session.design.depth} in. panel profile.</p>
                 </div>
               </li>
               <li className="flex gap-6">
                 <div className="w-10 h-10 rounded-2xl bg-[var(--bg-dark)] flex items-center justify-center shrink-0 border border-[var(--border-color)]">
                   <span className="text-[10px] font-black text-[var(--text-primary)]">02</span>
                 </div>
                 <div>
                   <div className="text-sm font-bold text-[var(--text-primary)] mb-2 tracking-tight">Substrate Flatness</div>
                   <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-medium">Level 4 finish required per Division 09. Any substrate deviation &gt;1/8" per 10ft will telegraph through joints.</p>
                 </div>
               </li>
               <li className="flex gap-6">
                 <div className="w-10 h-10 rounded-2xl bg-[var(--bg-dark)] flex items-center justify-center shrink-0 border border-[var(--border-color)]">
                   <span className="text-[10px] font-black text-[var(--text-primary)]">03</span>
                 </div>
                 <div>
                   <div className="text-sm font-bold text-[var(--text-primary)] mb-2 tracking-tight">Driver Logic</div>
                   <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-medium">Integrated 12V lighting requires remote placement of transformers within 15ft of the feature wall.</p>
                 </div>
               </li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Act4Systems;