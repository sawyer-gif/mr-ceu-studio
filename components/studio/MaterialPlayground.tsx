import React, { useState } from 'react';

const MATERIALS = {
  solid: {
    label: 'Solid Surface',
    statement: 'Renewable, seam-minimized barrier stays clean after thousands of disinfecting cycles.',
    legend: ['Non-porous core', 'Thermoformed seams', 'Refinish on site'],
    base: 'radial-gradient(circle at 40% 30%, rgba(255,255,255,0.35), rgba(180,180,200,0.05))',
    overlay: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0))',
  },
  metal: {
    label: 'Metal Panels',
    statement: 'Brushed metal reveals scratches and finish wear quickly in public zones.',
    legend: ['Visible scratches', 'Finish touch-ups', 'Potential corrosion'],
    base: 'linear-gradient(90deg, rgba(200,200,210,0.4), rgba(120,120,140,0.2))',
    overlay:
      'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, rgba(0,0,0,0.05) 2px 4px), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 45%)',
  },
  tile: {
    label: 'Tile / Stone',
    statement: 'Imported stone looks premium but grout lines harbor grime between cleanings.',
    legend: ['Grout darkening', 'Sealant cycles', 'Joint cleaning labor'],
    base: 'linear-gradient(120deg, rgba(210,190,170,0.35), rgba(150,130,110,0.15))',
    overlay:
      'linear-gradient(0deg, transparent calc(100% - 4px), rgba(0,0,0,0.25) calc(100% - 4px)), linear-gradient(90deg, transparent calc(100% - 4px), rgba(0,0,0,0.25) calc(100% - 4px))',
  },
} as const;

const outcomeScores = (
  material: keyof typeof MATERIALS,
  cleaning: 'low' | 'high',
  chemicals: boolean,
  abrasion: boolean
) => {
  if (material === 'solid') {
    return {
      cleanability: 95,
      damage: abrasion ? 20 : 10,
      hygiene: chemicals ? 95 : 90,
      summary: 'Maintains a renewable, non-porous barrier with minimal downtime.',
      bullets: ['Surface can be sanded / renewed on site.', 'No grout joints = fewer sanitation shutdowns.'],
      hsw: 'HSW: reduces pathogen retention surfaces and supports efficient disinfection.',
    };
  }
  if (material === 'metal') {
    return {
      cleanability: cleaning === 'high' ? 70 : 75,
      damage: abrasion || chemicals ? 65 : 50,
      hygiene: 70,
      summary: 'Scratches expose raw metal and hold residue — requires careful inspection.',
      bullets: ['Finish wear becomes visible quickly.', 'Touch-up programs add labor + cost.'],
      hsw: 'HSW: monitor for burrs / corrosion that could impact public safety.',
    };
  }
  return {
    cleanability: cleaning === 'high' ? 60 : 65,
    damage: abrasion ? 40 : 30,
    hygiene: chemicals ? 45 : 55,
    summary: 'Grout joints darken and harbor grime despite frequent cleaning.',
    bullets: ['Requires re-sealing + grout replacement.', 'Staining is difficult to remove in public restrooms.'],
    hsw: 'HSW: joints prolong cleaning windows and increase hygiene risk.',
  };
};

const chipClass = (value: number, label: string) => {
  const palette =
    label === 'Hygiene Risk'
      ? value >= 80
        ? 'bg-green-500/20 border-green-400/30 text-green-200'
        : value >= 50
        ? 'bg-yellow-500/15 border-yellow-400/30 text-yellow-100'
        : 'bg-red-500/15 border-red-400/30 text-red-200'
      : value >= 80
      ? 'bg-green-500/20 border-green-400/30 text-green-200'
      : value >= 60
      ? 'bg-yellow-500/15 border-yellow-400/30 text-yellow-100'
      : 'bg-red-500/15 border-red-400/30 text-red-200';
  return palette;
};

const MaterialPlayground: React.FC = () => {
  const [material, setMaterial] = useState<keyof typeof MATERIALS>('solid');
  const [cleaning, setCleaning] = useState<'low' | 'high'>('high');
  const [chemicals, setChemicals] = useState(true);
  const [abrasion, setAbrasion] = useState(true);
  const [tilt, setTilt] = useState({ x: 8, y: -8 });

  const metrics = outcomeScores(material, cleaning, chemicals, abrasion);
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
    setTilt({ x, y });
  };

  const handlePointerLeave = () => setTilt({ x: 8, y: -8 });

  const activeMaterial = MATERIALS[material];

  return (
    <div className="rounded-[36px] border border-white/15 bg-black/30 p-6 md:p-8 space-y-8">
      <div className="flex flex-wrap gap-3 rounded-[26px] border border-white/10 bg-white/5 p-2">
        {Object.entries(MATERIALS).map(([id, data]) => (
          <button
            key={id}
            onClick={() => setMaterial(id as keyof typeof MATERIALS)}
            className={`px-4 py-2 rounded-[18px] text-xs font-semibold tracking-[0.25em] transition-all ${
              material === id ? 'bg-white text-black shadow-[0_10px_25px_rgba(0,0,0,0.25)]' : 'text-white/70 hover:text-white'
            }`}
          >
            {data.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-[20px] px-5 py-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/60">Cleaning</span>
              <div className="flex gap-2">
                {['low', 'high'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCleaning(level as 'low' | 'high')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                      cleaning === level ? 'bg-white text-black' : 'text-white/70'
                    }`}
                  >
                    {level === 'low' ? 'Low' : 'High'}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-white/70 cursor-pointer">
              <input
                type="checkbox"
                checked={chemicals}
                onChange={(e) => setChemicals(e.target.checked)}
                className="w-4 h-4 rounded border-white/30 bg-black/30 text-purple-400 focus:ring-purple-400"
              />
              Aggressive Chemicals
            </label>
            <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-white/70 cursor-pointer">
              <input
                type="checkbox"
                checked={abrasion}
                onChange={(e) => setAbrasion(e.target.checked)}
                className="w-4 h-4 rounded border-white/30 bg-black/30 text-purple-400 focus:ring-purple-400"
              />
              Abrasion Zone
            </label>
          </div>

          <div
            className="relative rounded-[32px] border border-white/15 bg-gradient-to-br from-white/8 to-black/20 h-64 md:h-80 overflow-hidden"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div
              className="absolute inset-4 rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
              style={{
                backgroundImage: `${activeMaterial.base}${chemicals ? ', radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 40%)' : ''}`,
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 120ms ease-out',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: activeMaterial.overlay,
                  opacity: abrasion ? 0.5 : material === 'tile' ? 0.4 : 0.2,
                }}
              />
              {material === 'tile' && (
                <div className="absolute inset-0" style={{ mixBlendMode: 'multiply', backgroundImage: activeMaterial.overlay, opacity: chemicals ? 0.6 : 0.3 }} />
              )}
              {material === 'metal' && abrasion && (
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml;utf8,<svg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'><path d='M5 5 L75 5 L75 75' stroke='rgba(255,255,255,0.25)' stroke-width='1'/></svg>\")",
                  }}
                />
              )}
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white/90">
                <p className="text-sm font-semibold">{activeMaterial.label}</p>
                <p className="text-xs text-white/70">{activeMaterial.statement}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.35em] text-white/60">
            {activeMaterial.legend.map((item) => (
              <span key={item} className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/80">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-3">
            {[
              { label: 'Cleanability', value: metrics.cleanability },
              { label: 'Damage Visibility', value: metrics.damage },
              { label: 'Hygiene Risk', value: metrics.hygiene },
            ].map(({ label, value }) => (
              <div
                key={label}
                className={`rounded-[18px] border px-4 py-3 text-sm font-semibold tracking-tight flex items-center justify-between ${chipClass(value, label)}`}
              >
                <span>{label}</span>
                <span>{value}%</span>
              </div>
            ))}
          </div>

          <div className="rounded-[24px] border border-white/15 bg-white/5 p-5 space-y-3 text-white/90">
            <p className="text-sm font-semibold">{metrics.summary}</p>
            <ul className="text-sm text-white/70 list-disc list-inside space-y-1">
              {metrics.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className="text-xs uppercase tracking-[0.35em] text-purple-200">{metrics.hsw}</p>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-white/60 uppercase tracking-[0.35em]">
        Interaction analytics are opt-in and used to improve learning quality.
      </p>
    </div>
  );
};

export default MaterialPlayground;
