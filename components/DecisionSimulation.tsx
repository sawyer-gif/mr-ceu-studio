import React, { useMemo, useState } from 'react';

const ENVIRONMENT = {
  title: 'Airport Restroom Core (High Traffic + Daily Cleaning)',
  chips: [
    'Heavy daily sanitizing (chemicals)',
    'High-touch / high humidity',
    'Long-term maintenance risk'
  ],
  subtext: 'Choose the surface that minimizes failure points over time.'
};

const MATERIALS = {
  solid: {
    label: 'Solid Surface Walls',
    verdict: 'Best Fit',
    tone: 'positive',
    why: [
      'Field-welded seams remove joint infiltration.',
      'Non-porous skin endures aggressive chemical cycles.'
    ],
    watch: 'Schedule light micro-sanding to keep finish uniform.',
    diagram: {
      seamLabel: 'Seamless shell',
      seamState: 'hidden',
      callout: 'Surface and substrate cure as one continuous unit.'
    }
  },
  perforated: {
    label: 'Perforated Metal Panels',
    verdict: 'Depends',
    tone: 'neutral',
    why: [
      'Open perforations demand acoustic backing + cleaning access.',
      'Chemical cycles can corrode edges of perforations.'
    ],
    watch: 'Specify removable backing panels to inspect residue.',
    diagram: {
      seamLabel: 'Perforations',
      seamState: 'perforated',
      callout: 'Requires cavity + acoustic infill that traps humidity.'
    }
  },
  tile: {
    label: 'Large Format Tile with Grout',
    verdict: 'Risk',
    tone: 'negative',
    why: [
      'Grout lines absorb residue and discolor quickly.',
      'Joint maintenance extends cleaning windows and labor.'
    ],
    watch: 'Expect recurring re-grout cycles and chemical-sensitive sealers.',
    diagram: {
      seamLabel: 'Grout joints',
      seamState: 'highlighted',
      callout: 'Every joint is a potential contamination seam.'
    }
  },
  coated: {
    label: 'Coated Metal Panels',
    verdict: 'Depends',
    tone: 'neutral',
    why: [
      'Topcoat hides wear until a scratch exposes substrate.',
      'Requires careful cleaning protocols to avoid micro-abrasion.'
    ],
    watch: 'Plan for touch-up program; chips create localized failure points.',
    diagram: {
      seamLabel: 'Coating layer',
      seamState: 'coated',
      callout: 'Once coating fails, corrosion accelerates beneath.'
    }
  }
} as const;

type MaterialKey = keyof typeof MATERIALS;

type DecisionSimulationProps = {
  onOpenWaitlist: () => void;
};

const decisionKeys: MaterialKey[] = ['solid', 'perforated', 'tile', 'coated'];

const DecisionSimulation: React.FC<DecisionSimulationProps> = ({ onOpenWaitlist }) => {
  const [selection, setSelection] = useState<MaterialKey>('solid');
  const material = useMemo(() => MATERIALS[selection], [selection]);

  return (
    <div className="w-full max-w-6xl mx-auto rounded-[42px] border border-white/15 bg-white/5/30 backdrop-blur-2xl px-6 py-10 md:p-12 space-y-10">
      {/* Environment Definition */}
      <div className="space-y-4 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">Material Decision Simulation</p>
        <h3 className="text-3xl md:text-[3.2rem] font-black leading-tight text-white">
          For an Airport Restroom <span className="text-gradient">specify</span> with intention.
        </h3>
        <p className="text-white/70 text-base">Select a system to see performance tradeoffs.</p>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 pt-7 pb-6 space-y-4 text-left">
        <div className="flex items-center gap-4">
          <span className="w-1.5 h-10 rounded-full bg-gradient-to-b from-emerald-300 to-cyan-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
          <h4 className="text-xl font-semibold text-white">{ENVIRONMENT.title}</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {ENVIRONMENT.chips.map((chip) => (
            <span
              key={chip}
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-emerald-300/10 border border-emerald-200/20 text-emerald-100"
            >
              {chip}
            </span>
          ))}
        </div>
        <p className="text-sm text-white/70">{ENVIRONMENT.subtext}</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 items-stretch">
        {/* Diagram */}
        <div className="flex-1 space-y-6">
          <div
            className="relative h-[320px] md:h-[360px] rounded-[36px] border border-white/15 overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(6,14,22,0.95), rgba(4,6,11,1))'
            }}
          >
            <div className="absolute inset-0 opacity-60" style={{
              background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 55%)'
            }} />
            <div className="absolute inset-0 animate-[pulseLight_6s_linear_infinite] opacity-40" style={{
              background: 'linear-gradient(120deg, rgba(90,255,199,0.25), transparent 60%)'
            }} />

            <div className="absolute inset-x-8 bottom-12 space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.3em] text-white/60">Surface</label>
                <div className="h-10 rounded-[18px] border border-white/20 bg-gradient-to-r from-slate-100/20 to-slate-200/5 relative overflow-hidden">
                  {selection === 'coated' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-300/20" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.3em] text-white/60">Seam / Joint</label>
                <div className="h-6 rounded-full border border-white/15 bg-black/40 relative overflow-hidden">
                  {material.diagram.seamState === 'hidden' && (
                    <span className="absolute inset-0 bg-emerald-400/30 blur-sm" style={{ opacity: 0.2 }} />
                  )}
                  {material.diagram.seamState === 'highlighted' && (
                    <span className="absolute inset-0 bg-red-400/40" />
                  )}
                  {material.diagram.seamState === 'perforated' && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_15%,_transparent_18%)] bg-[length:16px_16px] opacity-60" />
                  )}
                  {material.diagram.seamState === 'coated' && (
                    <span className="absolute inset-0 bg-yellow-400/30" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.3em] text-white/60">Substrate</label>
                <div className="h-16 rounded-[20px] border border-white/10 bg-gradient-to-t from-slate-900 to-slate-800" />
              </div>
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>{material.diagram.seamLabel}</span>
                <span>{material.diagram.callout}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Choices */}
        <div className="flex-1 space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">For an Airport Restroom Core, what would you specify?</p>
          <div className="grid grid-cols-1 gap-4">
            {decisionKeys.map((key) => {
              const info = MATERIALS[key];
              const isActive = selection === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelection(key)}
                  className={`text-left px-6 py-5 rounded-[26px] border transition-all duration-200 backdrop-blur-sm ${
                    isActive
                      ? 'border-emerald-300/70 bg-emerald-300/10 text-white shadow-[0_0_35px_rgba(16,185,129,0.2)]'
                      : 'border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:text-white'
                  }`}
                >
                  <p className="text-lg font-semibold tracking-tight">{info.label}</p>
                </button>
              );
            })}
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/5 p-6 space-y-4 text-white/85 min-h-[180px]">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 text-[11px] font-black uppercase tracking-[0.35em] rounded-full ${
                  material.tone === 'positive'
                    ? 'bg-emerald-400/15 text-emerald-200 border border-emerald-300/30'
                    : material.tone === 'negative'
                    ? 'bg-red-400/15 text-red-200 border border-red-300/30'
                    : 'bg-yellow-300/15 text-yellow-100 border border-yellow-200/30'
                }`}
              >
                {material.verdict}
              </span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-white/80">
              {material.why.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="text-xs uppercase tracking-[0.4em] text-white/55">Watch-out — {material.watch}</p>
          </div>

          <div className="pt-4 space-y-4 text-center">
            <p className="text-white/75 text-base">This is how MR CEU Studio teaches — through decisions, not slides.</p>
            <button
              onClick={onOpenWaitlist}
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-black text-sm font-black uppercase tracking-[0.4em] hover:opacity-90 transition"
            >
              Experience the Full Course
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseLight {
          0% { transform: translateX(-30%); }
          100% { transform: translateX(80%); }
        }
      `}</style>
    </div>
  );
};

export default DecisionSimulation;
