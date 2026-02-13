import React, { useState } from 'react';
import {
  ShieldCheck,
  Activity,
  FileCheck2,
  Workflow,
  Layers,
  PenTool,
  Timer,
  Sparkles,
  Target,
} from 'lucide-react';

export interface GlassCardProps {
  title: string;
  description: string;
  badge: string;
  details?: string;
  icon?: React.ReactNode;
  variant?: 'compliance' | 'learning' | 'outcome';
}

const variantStyles: Record<NonNullable<GlassCardProps['variant']>, string> = {
  compliance: 'border-[rgba(255,255,255,0.2)] bg-white/5',
  learning: 'border-[var(--border-color)] bg-[var(--bg-surface)]/70',
  outcome: 'border-[rgba(111,60,195,0.25)] bg-[rgba(111,60,195,0.08)]',
};

const GlassCard: React.FC<GlassCardProps> = ({ title, description, badge, details, icon, variant = 'learning' }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`relative rounded-[32px] p-6 md:p-8 backdrop-blur-2xl transition-all duration-200 border ${
        variantStyles[variant]
      } hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center text-[var(--accent-purple)]">
          {icon || <ShieldCheck size={20} />}
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-tertiary)]">{badge}</div>
      </div>
      <h3 className="text-xl font-black text-[var(--text-primary)] mb-3">{title}</h3>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{description}</p>
      {details && (
        <div className="mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] flex items-center gap-2"
          >
            {expanded ? 'Hide details' : 'Learn more'}
            <span className={`transition-transform ${expanded ? 'rotate-45' : ''}`}>+</span>
          </button>
          {expanded && (
            <div className="mt-3 text-sm text-[var(--text-secondary)]/90 border border-white/10 rounded-2xl p-4 bg-black/20">
              {details}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ComplianceCard = GlassCard;
export const LearningSystemCard = GlassCard;
export const OutcomeCard = GlassCard;

export const icons = {
  compliance: <ShieldCheck size={18} />,
  telemetry: <Activity size={18} />,
  instructor: <FileCheck2 size={18} />,
  scenario: <Workflow size={18} />,
  decision: <Layers size={18} />,
  transcript: <PenTool size={18} />,
  speed: <Timer size={18} />,
  apply: <Sparkles size={18} />,
  confidence: <Target size={18} />,
};
