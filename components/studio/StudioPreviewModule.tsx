import React, { useState } from 'react';

interface ScenarioOption {
  id: string;
  label: string;
  reasoning: string;
  hswImpact: string;
  recommended?: boolean;
}

export interface StudioScenario {
  title: string;
  scenario: string;
  question: string;
  tag: string;
  options: ScenarioOption[];
}

const defaultScenario: StudioScenario = {
  title: 'Airport Restroom Wall System',
  scenario: 'Public concourse restrooms are sanitized every hour with aggressive ammonium-based cleaners. Panels must resist chemicals and repeated abrasion.',
  question: 'Which surface strategy protects long-term durability?',
  tag: 'HSW · Health & Welfare',
  options: [
    {
      id: 'standard',
      label: 'Standard solid surface finish',
      reasoning: 'Initial install cost is lowest, but chemical attack quickly dulls the finish and creates micro fissures that trap bacteria.',
      hswImpact: 'Compromises cleanability and increases maintenance shutdowns.',
    },
    {
      id: 'chem-resistant',
      label: 'Chemical-resistant enhanced finish',
      reasoning:
        'Maintains the non-porous barrier after thousands of cleaning cycles and prevents discoloration or chalking in high-traffic zones.',
      hswImpact: 'Protects occupant health by keeping surfaces sealed and easy to disinfect.',
      recommended: true,
    },
    {
      id: 'deep-cnc',
      label: 'Deep CNC textured surface',
      reasoning:
        'Adds dramatic wayfinding texture, but grooves capture residue and require specialty cleaning equipment that airports rarely budget for.',
      hswImpact: 'Visual impact is high, but welfare risk increases because residue builds up in recesses.',
    },
  ],
};

interface StudioPreviewModuleProps {
  scenario?: StudioScenario;
}

const StudioPreviewModule: React.FC<StudioPreviewModuleProps> = ({ scenario = defaultScenario }) => {
  const [selection, setSelection] = useState<string | null>(null);
  const chosen = scenario.options.find((opt) => opt.id === selection);

  return (
    <div className="relative rounded-[40px] border border-white/10 bg-gradient-to-br from-white/5 via-white/2 to-transparent p-6 md:p-10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1F2233,transparent_60%)] opacity-60 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/50">Live Studio Scenario</p>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">{scenario.title}</h3>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.45em] px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/80">
            {scenario.tag}
          </span>
        </div>

        <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-4xl">{scenario.scenario}</p>
        <p className="text-xl font-semibold text-white">{scenario.question}</p>

        <div className="grid gap-4">
          {scenario.options.map((option) => {
            const active = option.id === selection;
            const correct = option.recommended;
            return (
              <button
                key={option.id}
                onClick={() => setSelection(option.id)}
                className={`text-left rounded-[28px] border px-6 py-5 transition-all duration-150 flex items-center justify-between gap-4 ${
                  active
                    ? correct
                      ? 'border-green-400/50 bg-green-500/10 text-white'
                      : 'border-red-400/40 bg-red-500/5 text-white'
                    : 'border-white/15 bg-white/5 text-white/80 hover:border-white/40'
                }`}
              >
                <span className="font-semibold tracking-tight">{option.label}</span>
                {active && (
                  <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${correct ? 'text-green-300' : 'text-red-300'}`}>
                    {correct ? 'Recommended' : 'Consider impact'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {chosen && (
          <div className="rounded-[28px] border border-white/15 bg-black/30 p-6 space-y-4 text-white/90">
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60">Result</div>
            <p className="text-base font-semibold">{chosen.reasoning}</p>
            <p className="text-sm text-white/70">HSW Impact: {chosen.hswImpact}</p>
            {chosen.recommended ? (
              <div className="text-xs uppercase tracking-[0.35em] text-green-300">Maintains long-term health & welfare compliance</div>
            ) : (
              <div className="text-xs uppercase tracking-[0.35em] text-yellow-300/80">Flag for VE review before spec</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioPreviewModule;
