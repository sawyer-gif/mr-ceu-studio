import React, { useState, useMemo } from 'react';

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
      explanation:
        'Solid surface minimizes joints, so maintenance teams sand and renew the skin without removing assemblies. Hygiene follows the absence of failure points, not higher hardness ratings.',
      correct: true
    },
    {
      id: 'coatings',
      label: 'Hard coat on metal panels to resist scratching',
      explanation:
        'Coatings delay visible wear, but once a gouge appears the substrate traps residue. Repairs create patchwork and require scheduled shutdowns — the surface is no longer seamless.'
    },
    {
      id: 'tile',
      label: 'Large-format tile with antimicrobial grout',
      explanation:
        'Antimicrobial additives slow growth, yet every grout joint still needs re-sealing. Each joint is another maintenance seam and another edge for residue to settle into.'
    }
  ]
};

const fadeMotion = 'transition duration-200 ease-out';

const MaterialPlayground: React.FC = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const selectedOption = useMemo(() => QUESTION.options.find((o) => o.id === selection), [selection]);

  return (
    <div className="rounded-[48px] bg-[#05070c] p-10 md:p-16 xl:p-20 space-y-16 text-white/85">
      <section className="space-y-6 max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.5em] text-white/45">Case Insight</p>
        <h2 className="text-3xl md:text-[2.8rem] leading-tight font-semibold text-white">
          High-frequency cleaning environments demand surfaces that don’t trap failure.
        </h2>
        <p className="text-lg md:text-xl text-white/70">
          In transportation and healthcare programs, longevity comes from renewability and seamless construction — not hardness scores. Material logic should feel architectural, not mechanical.
        </p>
      </section>

      <section className="space-y-8">
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.5em] text-white/45">Why solid surface behaves differently</p>
          <div className="space-y-6">
            {COMPARISON_POINTS.map((point, index) => (
              <p
                key={point}
                className="text-lg md:text-xl text-white/75"
                style={{
                  opacity: 0.92,
                  animation: `fadeInUp 0.4s ease ${index * 0.08}s both`
                }}
              >
                {point}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.5em] text-white/45">Design Prompt</p>
          <h3 className="text-2xl md:text-3xl text-white max-w-4xl">{QUESTION.prompt}</h3>
        </div>
        <div className="space-y-12">
          {QUESTION.options.map((option) => {
            const isActive = selection === option.id;
            const isDimmed = selection && selection !== option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelection(option.id)}
                className={`block w-full text-left focus:outline-none ${fadeMotion}`}
                style={{ opacity: isDimmed ? 0.6 : 1 }}
              >
                <span
                  className={`text-[1.8rem] md:text-[2.4rem] leading-snug font-medium ${fadeMotion}`}
                >
                  {option.label}
                </span>
                {isActive && (
                  <span
                    className="mt-4 block text-lg md:text-xl text-white/70"
                    style={{ animation: 'fadeInUp 0.2s ease both' }}
                  >
                    {option.explanation}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MaterialPlayground;
