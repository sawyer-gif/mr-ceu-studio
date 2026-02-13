import React, { useState } from 'react';

const MATERIALS = [
  {
    id: 'solid-surface',
    label: 'Solid Surface',
    metrics: (cycles: number, highTraffic: boolean) => ({
      cleanability: 90,
      damage: highTraffic ? 20 : 10,
      hygiene: 95,
      explanation:
        'Non-porous, seam-minimized systems maintain a renewable barrier even after repeated disinfectant cycles.',
      hsw: 'Supports Health & Welfare by reducing residue buildup and keeping cleaning crews efficient.',
      bullets: [
        'Surface can be refinished if micro-abrasion occurs.',
        'No grout lines → fewer sanitation shutdowns.',
      ],
    }),
  },
  {
    id: 'metal',
    label: 'Metal Panels',
    metrics: (cycles: number, highTraffic: boolean) => ({
      cleanability: 70,
      damage: highTraffic ? 65 : 50,
      hygiene: 70,
      explanation:
        'Metal resists chemicals initially, but scratches and finish wear become visible, exposing corners to corrosion over time.',
      hsw: 'Requires higher inspection cadence to avoid sharp edges and residue in scratched areas.',
      bullets: [
        'Finish touch-ups add maintenance complexity.',
        'Scratches can trap grime and impact perception.',
      ],
    }),
  },
  {
    id: 'stone',
    label: 'Tile / Stone',
    metrics: (cycles: number, highTraffic: boolean) => ({
      cleanability: 60,
      damage: 40,
      hygiene: highTraffic ? 45 : 55,
      explanation:
        'Stone and tile look premium, but grout joints absorb discoloration and demand aggressive maintenance in this application.',
      hsw: 'Grout lines and joints increase hygiene risk and extend downtime for re-sealing.',
      bullets: [
        'Cleaning labor increases as grout ages.',
        'Strong cleaners may etch the surface or stain grout.',
      ],
    }),
  },
];

interface MaterialStressTestProps {
  initialMaterial?: string;
}

const MaterialStressTest: React.FC<MaterialStressTestProps> = ({ initialMaterial = 'solid-surface' }) => {
  const [material, setMaterial] = useState(initialMaterial);
  const [cycles, setCycles] = useState(4000);
  const [highTraffic, setHighTraffic] = useState(false);

  const activeMaterial = MATERIALS.find((item) => item.id === material) ?? MATERIALS[0];
  const metrics = activeMaterial.metrics(cycles, highTraffic);

  const renderGauge = (label: string, value: number) => (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs uppercase tracking-[0.4em] text-white/60">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-white to-purple-400"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="rounded-[32px] border border-white/15 bg-black/30 p-6 md:p-8 grid gap-8 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6">
        <div className="text-[11px] font-black uppercase tracking-[0.5em] text-white/60">Surface Lab</div>
        <div className="flex flex-wrap gap-3 rounded-[24px] border border-white/10 bg-white/5 p-2">
          {MATERIALS.map((item) => (
            <button
              key={item.id}
              onClick={() => setMaterial(item.id)}
              className={`px-4 py-2 rounded-[18px] text-xs font-semibold tracking-[0.2em] transition-all ${
                material === item.id ? 'bg-white text-black' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs uppercase tracking-[0.4em] text-white/60">
            <span>Cleaning cycles</span>
            <span>{cycles.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={10000}
            value={cycles}
            onChange={(e) => setCycles(Number(e.target.value))}
            className="w-full accent-purple-400"
          />
        </div>

        <label className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/70 cursor-pointer">
          <input
            type="checkbox"
            checked={highTraffic}
            onChange={(e) => setHighTraffic(e.target.checked)}
            className="w-4 h-4 rounded border-white/30 bg-black/30 text-purple-400 focus:ring-purple-400"
          />
          High-traffic abrasion zone
        </label>
      </div>

      <div className="rounded-[26px] border border-white/15 bg-white/5 p-5 space-y-4">
        <div className="text-sm font-semibold text-white">Surface State Preview</div>
        {renderGauge('Cleanability', metrics.cleanability)}
        {renderGauge('Damage Visibility', metrics.damage)}
        {renderGauge('Hygiene Risk', metrics.hygiene)}

        <div className="text-sm text-white/85 leading-relaxed">{metrics.explanation}</div>
        <div className="text-xs uppercase tracking-[0.35em] text-purple-200">HSW impact: {metrics.hsw}</div>
        <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
          {metrics.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaterialStressTest;
