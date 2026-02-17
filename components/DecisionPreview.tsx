import React, { useState } from 'react';

const OPTIONS = [
  {
    id: 'solid',
    label: 'Solid Surface Walls',
    response: 'Correct for high-sanitation environments. Eliminates failure points caused by seams.'
  },
  {
    id: 'perforated',
    label: 'Perforated Metal Panels',
    response: 'Acoustic value, but openings turn into residue traps during aggressive cleaning cycles.'
  },
  {
    id: 'tile',
    label: 'Large Format Tile with Grout',
    response: 'Grout introduces recurring maintenance cycles and long-term contamination risk.'
  },
  {
    id: 'coated',
    label: 'Coated Metal Panels',
    response: 'Coatings hide wear briefly—once breached, the substrate captures residue and oxidizes.'
  }
];

const DecisionPreview: React.FC = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const activeOption = selection ? OPTIONS.find((option) => option.id === selection) : null;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-[36px] border border-white/10 bg-white/5/40 backdrop-blur-xl px-10 py-12 space-y-10 text-center">
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">Material Decision Simulation</p>
        <h3 className="text-3xl md:text-4xl font-black text-white">
          Which surface would you specify in this environment?
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OPTIONS.map((option) => {
          const isActive = selection === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setSelection(option.id)}
              className={`px-6 py-5 rounded-[24px] border transition-all text-left text-lg font-semibold tracking-tight text-white/80 hover:text-white hover:border-white/40 ${
                isActive ? 'border-white text-white bg-white/5' : 'border-white/15'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {activeOption && (
        <p className="text-xl text-white/80" aria-live="polite">
          {activeOption.response}
        </p>
      )}

      <div>
        <a
          href="/waitlist"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-black text-sm font-black uppercase tracking-[0.4em] hover:opacity-90 transition"
        >
          Experience the Full Course
        </a>
      </div>
    </div>
  );
};

export default DecisionPreview;
