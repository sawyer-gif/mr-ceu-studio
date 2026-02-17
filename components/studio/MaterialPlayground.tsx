import React, { useState, useMemo } from 'react';

const HERO_LAYERS = [
  'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35), transparent 45%)',
  'linear-gradient(120deg, rgba(15,21,35,0.85), rgba(5,7,12,0.95))',
  'url("data:image/svg+xml,%3Csvg width=\'400\' height=\'400\' viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 200 L400 200 M200 0 L200 400\' stroke=\'%23FFFFFF0D\' stroke-width=\'1\'/%3E%3C/svg%3E")'
];

const COMPARISON_POINTS = [
  'Seam-minimized construction reduces contamination points.',
  'Renewable surface can be restored instead of replaced.',
  'Non-porous composition withstands aggressive sanitation cycles.'
];

const QUESTION = {
  prompt: 'Which strategy best supports long-term hygiene in high-use environments?',
  options: [
    {
      id: 'seamless',
      label: 'Continuous solid surface with field-renewable finish',
      explanation: 'Solid surface minimizes joints, allowing teams to sand and renew the skin without removing walls. Hygiene relies on removing failure points, not just specifying harder materials.',
      correct: true
    },
    {
      id: 'coatings',
      label: 'Hard coat on metal panels to resist scratching',
      explanation: 'Protective coatings delay damage but once breached, the substrate traps residue. Repairs require downtime and localized patching that rarely matches adjacent panels.'
    },
    {
      id: 'tile',
      label: 'Large-format tile with antimicrobial grout',
      explanation: 'Antimicrobial additives slow growth but grout joints still require constant re-sealing. Every joint reintroduces a maintenance seam.'
    }
  ]
};

const MaterialPlayground: React.FC = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const selectedOption = useMemo(() => QUESTION.options.find((o) => o.id === selection), [selection]);

  return (
    <div className="rounded-[42px] border border-white/10 bg-black/25 p-8 md:p-12 space-y-12 text-white/90">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Case Insight</p>
          <h2 className="text-3xl md:text-[2.6rem] leading-tight font-semibold text-white">
            High-frequency cleaning environments demand surfaces that don’t trap failure.
          </h2>
          <p className="text-lg text-white/70 max-w-2xl">
            In transportation and healthcare spaces, durability isn’t about hardness — it’s about renewability and seamlessness. The construction logic matters more than the coating.
          </p>
        </div>

        <div className="relative h-[360px] md:h-[420px] rounded-[36px] overflow-hidden border border-white/10 shadow-[0_35px_120px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0" style={{ backgroundImage: HERO_LAYERS.join(',') }} />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/60" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 space-y-3">
            <p className="text-sm uppercase tracking-[0.5em] text-white/60">Observation</p>
            <p className="text-2xl font-semibold text-white">
              Seamless wall shells tolerate thousands of cleanings without exposing substrate.
            </p>
            <p className="text-sm text-white/70 max-w-lg">
              When maintenance teams sand and renew the surface, the assembly returns to a uniform state — no patchwork, no grout lines reintroduced.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Why solid surface behaves differently</p>
        <div className="space-y-4">
          {COMPARISON_POINTS.map((point, index) => (
            <div
              key={point}
              className="text-lg md:text-xl text-white/75 border border-white/10 rounded-[28px] px-8 py-6 backdrop-blur-sm"
              style={{ transition: 'opacity 400ms ease, transform 400ms ease', transitionDelay: `${index * 90}ms` }}
            >
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Design prompt</p>
        <h3 className="text-2xl font-semibold text-white">{QUESTION.prompt}</h3>
        <div className="space-y-3">
          {QUESTION.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelection(option.id)}
              className={`w-full text-left px-6 py-5 rounded-[26px] border transition-colors duration-200 font-medium text-lg tracking-tight
                ${selection === option.id ? 'border-white text-white bg-white/5' : 'border-white/10 text-white/80 hover:border-white/30'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {selectedOption && (
          <div className="rounded-[28px] border border-white/10 bg-white/5 px-8 py-6 space-y-2">
            <p className="text-sm uppercase tracking-[0.4em] text-white/50">Explanation</p>
            <p className="text-lg text-white/85">{selectedOption.explanation}</p>
            {selectedOption.correct && (
              <p className="text-sm text-emerald-300/80 font-semibold">This is the strategy aligned with long-term hygiene planning.</p>
            )}
          </div>
        )}
      </section>

      <p className="text-[11px] text-white/50 uppercase tracking-[0.4em]">Learning interaction — no metrics, just reasoning.</p>
    </div>
  );
};

export default MaterialPlayground;
