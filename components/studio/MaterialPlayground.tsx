import React, { useState, useMemo, useEffect } from 'react';

const OPTIONS = [
  {
    id: 'solid',
    label: 'Seamless solid surface shell',
    insight: 'Seams are where failure begins. Remove them and maintenance disappears.',
    texture:
      'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2), transparent 55%), linear-gradient(120deg, rgba(247,247,255,0.08), rgba(4,6,9,0.8))'
  },
  {
    id: 'metal',
    label: 'Coated metal panels',
    insight: 'Coatings hide wear until a scratch breaks the finish — then the substrate traps residue.',
    texture:
      'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(0,0,0,0.35)), repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 2px, rgba(0,0,0,0.1) 2px 4px)'
  },
  {
    id: 'tile',
    label: 'Large-format tile with antimicrobial grout',
    insight: 'Antimicrobial additives do not eliminate joints — every grout line is another maintenance seam.',
    texture:
      'linear-gradient(0deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2)), linear-gradient(90deg, rgba(255,255,255,0.02), rgba(0,0,0,0.15))'
  }
];

const BACKGROUND = 'radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 45%), #04060a';

const MaterialPlayground: React.FC = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const [lightAngle, setLightAngle] = useState(0);
  const selectedOption = useMemo(() => OPTIONS.find((opt) => opt.id === selection), [selection]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLightAngle((prev) => (prev + 0.2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center text-white/85" style={{ background: BACKGROUND, borderRadius: '48px', padding: '5rem 2rem' }}>
      <div className="max-w-3xl text-center space-y-4 mb-16">
        <p className="text-[11px] uppercase tracking-[0.5em] text-white/45">Material decision moment</p>
        <h2 className="text-3xl md:text-[3rem] leading-tight font-semibold text-white">
          Which surface actually survives this environment?
        </h2>
        <p className="text-sm uppercase tracking-[0.4em] text-white/50">Make the call architects make in the field.</p>
      </div>

      <div
        className="w-full max-w-4xl h-[320px] md:h-[420px] rounded-[42px] mb-16"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: selectedOption ? selectedOption.texture : OPTIONS[0].texture,
          transition: 'background 500ms ease',
          boxShadow: '0 40px 120px rgba(0,0,0,0.45)'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${30 + Math.sin(lightAngle) * 20}% ${30 + Math.cos(lightAngle) * 20}%, rgba(255,255,255,0.22), transparent 60%)`,
            mixBlendMode: 'screen',
            transition: 'opacity 300ms ease'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              selection === 'metal'
                ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 5px)'
                : selection === 'tile'
                ? 'linear-gradient(0deg, transparent calc(100% - 3px), rgba(0,0,0,0.4) calc(100% - 3px)), linear-gradient(90deg, transparent calc(100% - 3px), rgba(0,0,0,0.4) calc(100% - 3px))'
                : 'transparent',
            opacity: selection ? 0.6 : 0,
            transition: 'opacity 400ms ease'
          }}
        />
      </div>

      <div className="w-full max-w-3xl space-y-12">
        {OPTIONS.map((option) => {
          const isActive = selection === option.id;
          const isDimmed = selection && !isActive;
          return (
            <div key={option.id} className="space-y-4">
              <button
                onClick={() => setSelection(option.id)}
                className="w-full text-left"
                style={{ opacity: isDimmed ? 0.5 : 1, transition: 'opacity 200ms ease' }}
              >
                <span className="text-[2.1rem] md:text-[2.6rem] font-medium leading-tight text-white block">
                  {option.label}
                </span>
              </button>
              {isActive && (
                <span className="block text-xl text-white/75" style={{ animation: 'fadeInUp 0.25s ease both' }}>
                  {option.insight}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {selectedOption && (
        <div className="mt-16 text-center space-y-4" style={{ animation: 'fadeInUp 0.25s ease both' }}>
          <p className="text-lg text-white/75">This is how MR CEU Studio teaches — through decisions, not slides.</p>
          <a
            href="#"
            className="inline-block px-8 py-3 text-black bg-white rounded-full text-sm font-semibold tracking-[0.3em] uppercase"
          >
            Experience the Full Course
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MaterialPlayground;
