import React, { useState } from 'react';
import { StudioSession } from '../../types';
import { Copy, Download, Terminal, Check } from 'lucide-react';

const Act5Spec: React.FC<{ session: StudioSession }> = ({ session }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('spec-output')?.innerText || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const specContent = `
SECTION 06 67 00 - ARCHITECTURAL SURFACE SYSTEMS

PART 1 - GENERAL
1.1 SUMMARY
  A. Section includes: Carved architectural solid-surface wall panels.
  B. Application: ${session.zone} within ${session.sector} facility.

1.2 SUBMITTALS
  A. Product Data: For specified pattern: ${session.design.patternFamily}.
  B. Shop Drawings: Showing interlocking finger-joint layout.

PART 2 - PRODUCTS
2.1 BASIS OF DESIGN
  A. Manufacturer: MR Walls.
  B. Custom Geometry Profile:
     - Pattern: ${session.design.patternFamily}
     - Scale Factor: ${session.design.scale}
     - Depth Profile: ${session.design.depth} inches
     - Orientation: ${session.design.orientation}
     ${session.design.backlighting ? '- Illumination: Integrated LED cavity' : ''}

2.2 PERFORMANCE REQUIREMENTS
  - Impact Resistance: Level ${Math.round(session.performance.impactResistance / 10)} (ASTM D256).
  - Fire Rating: Class A (ASTM E84).
  `.trim();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24">
      <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div>
          <h2 className="text-6xl font-bold tracking-[-0.05em] text-[var(--text-primary)] mb-6">Documentation</h2>
          <p className="text-[var(--text-secondary)] text-2xl leading-snug font-medium max-w-2xl">
            Translation of studio decisions into project specifications.
          </p>
        </div>
        <div className="flex gap-4">
           <button 
            onClick={handleCopy}
            className={`flex items-center gap-3 px-8 py-3.5 text-xs font-black uppercase tracking-widest border rounded-full transition-all duration-300 ${
              copied ? 'bg-green-600 border-green-600 text-white' : 'border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--text-primary)]'
            }`}
           >
             {copied ? <Check size={16} strokeWidth={3} /> : <Copy size={16} />}
             {copied ? 'Copied' : 'Copy Spec'}
           </button>
           <button className="flex items-center gap-3 px-8 py-3.5 text-xs font-black uppercase tracking-widest bg-[var(--text-primary)] text-[var(--bg-dark)] rounded-full hover:opacity-90 transition-all shadow-xl">
             <Download size={16} />
             Export PDF
           </button>
        </div>
      </div>

      <div className="bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-[48px] shadow-2xl overflow-hidden flex flex-col h-[600px] relative group">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-600 to-green-600 opacity-40" />
        <div className="bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[var(--text-tertiary)]">
            <Terminal size={18} />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">CSI MASTERFORMAT | 06 67 00</span>
          </div>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80" />
          </div>
        </div>
        <div 
          id="spec-output"
          className="flex-1 p-16 overflow-y-auto mono text-[14px] text-[var(--text-secondary)] leading-[1.8] bg-[var(--bg-dark)] selection:bg-purple-600 selection:text-white"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {specContent}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Basis of Design', val: session.sector, icon: 'BOD' },
          { label: 'Geometry Profile', val: `${session.design.scale}x Scale`, icon: 'CNC' },
          { label: 'System Class', val: 'HSW Certified', icon: 'AIA' }
        ].map(card => (
          <div key={card.label} className="p-8 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[32px] hover:border-[var(--text-tertiary)] transition-all card-shadow">
             <div className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-4">{card.icon}</div>
             <div className="text-[var(--text-primary)] font-bold text-sm mb-2">{card.label}</div>
             <p className="text-xs text-[var(--text-tertiary)] leading-relaxed font-bold uppercase">{card.val} requirements applied.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Act5Spec;