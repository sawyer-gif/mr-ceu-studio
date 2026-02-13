import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Grid, Layers } from 'lucide-react';
import MaterialPlayground from './MaterialPlayground';

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
  scenario:
    'Public concourse restrooms are sanitized every hour with aggressive ammonium-based cleaners. Panels must resist chemicals and repeated abrasion.',
  question: 'Which wall surface strategy best supports long-term durability + hygiene in high-frequency disinfecting?',
  tag: 'HSW · Health & Welfare',
  options: [
    {
      id: 'solid',
      label: 'Solid surface panels with welded/seam-minimized joints',
      reasoning: 'Non-porous barrier stays intact during repeated disinfecting cycles and can be renewed if micro-abrasion appears.',
      hswImpact: 'Keeps maintenance predictable and surfaces hygienic without heavy downtime.',
      recommended: true,
    },
    {
      id: 'metal',
      label: 'Metal panels (scratches/scuffs show; finish wear)',
      reasoning: 'Scratches expose raw metal and hold residue, demanding periodic refinishing and inspections in public zones.',
      hswImpact: 'Adds operational risk because cleaning staff must avoid abrasive tools and monitor corrosion.',
    },
    {
      id: 'tile',
      label: 'Stone / tile with grout lines (grout maintenance)',
      reasoning: 'Grout absorbs stains and requires aggressive maintenance; joints harbor grime between cleanings.',
      hswImpact: 'Increases hygiene risk and extends cleaning labor windows.',
    },
  ],
};

const iconMap: Record<string, JSX.Element> = {
  solid: <ShieldCheck size={20} className="text-green-300" />,
  metal: <Sparkles size={20} className="text-yellow-200" />,
  tile: <Grid size={20} className="text-red-200" />,
};

const snippetMap: Record<string, string> = {
  solid: 'Seam-minimized, renewable surface keeps harsh cleaners out.',
  metal: 'Visible scratches + finish wear become hygiene hotspots.',
  tile: 'Grout joints absorb residue and extend cleaning downtime.',
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

        <MaterialPlayground />

        <p className="text-xl font-semibold text-white">{scenario.question}</p>

        <div className="grid gap-4">
          {scenario.options.map((option) => {
            const active = option.id === selection;
            const correct = option.recommended;
            return (
              <div
                key={option.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelection(option.id)}
                onKeyDown={(e) => e.key === 'Enter' && setSelection(option.id)}
                className={`rounded-[28px] border px-5 py-4 flex flex-col gap-3 bg-white/5 text-white/85 transition-all ${
                  active
                    ? correct
                      ? 'border-green-400/60 bg-green-500/10'
                      : 'border-red-400/50 bg-red-500/10'
                    : 'border-white/15 hover:border-white/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center">
                    {iconMap[option.id] ?? <Layers size={18} className="text-white/60" />}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold leading-tight">{option.label}</p>
                    <p className="text-sm text-white/70">{snippetMap[option.id]}</p>
                  </div>
                </div>
                {active && (
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.35em] ${
                      correct ? 'text-green-300' : 'text-yellow-200'
                    }`}
                  >
                    {correct ? 'Recommended' : 'Tradeoff — review impact'}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {chosen && (
          <div className="rounded-[28px] border border-white/15 bg-black/30 p-6 space-y-4 text-white/90">
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60">Result</div>
            <p className="text-base font-semibold">{chosen.reasoning}</p>
            <p className="text-sm text-white/70">HSW Impact: {chosen.hswImpact}</p>
            <p className="text-xs text-white/60 uppercase tracking-[0.35em]">Try toggling stressors above to see how each material responds.</p>
            {chosen.recommended ? (
              <div className="text-xs uppercase tracking-[0.35em] text-green-300">Maintains long-term health & welfare compliance</div>
            ) : (
              <div className="text-xs uppercase tracking-[0.35em] text-yellow-300/80">Requires additional maintenance + VE consideration</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioPreviewModule;
