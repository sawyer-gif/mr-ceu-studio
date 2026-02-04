import React, { useState, useRef, useEffect } from 'react';
import { StudioSession, DesignState } from '../../types';
import { Box, MousePointer2, RotateCcw } from 'lucide-react';

interface Props {
  session: StudioSession;
  setSession: React.Dispatch<React.SetStateAction<StudioSession>>;
}

const Act3Customization: React.FC<Props> = ({ session, setSession }) => {
  const [rotation, setRotation] = useState({ x: -10, y: 15 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateDesign = (key: keyof DesignState, value: any) => {
    setSession(prev => ({
      ...prev,
      design: { ...prev.design, [key]: value }
    }));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -40;
    setRotation({ x: y - 10, y: x + 15 });
  };

  const patternStyles: React.CSSProperties = {
    background: `linear-gradient(${session.design.orientation === 'Vertical' ? '90deg' : '0deg'}, 
      rgba(168, 85, 247, ${0.1 * session.design.depth}) 1px, 
      transparent 1px),
      linear-gradient(${session.design.orientation === 'Vertical' ? '0deg' : '90deg'}, 
      rgba(168, 85, 247, ${0.05 * session.design.depth}) 1px, 
      transparent 1px)`,
    backgroundSize: `${60 / session.design.scale}px ${60 / session.design.scale}px`,
    backgroundColor: session.design.backlighting ? 'var(--bg-dark)' : 'var(--bg-card)',
    boxShadow: session.design.backlighting ? 'inset 0 0 100px rgba(168, 85, 247, 0.2)' : 'none',
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col lg:flex-row gap-20 pb-24">
      <div className="flex-1 space-y-20">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Box className="text-purple-600" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-600">Computational Studio</span>
          </div>
          <h2 className="text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6">Geometric Manipulation</h2>
          <p className="text-[var(--text-secondary)] text-xl leading-relaxed font-medium max-w-lg transition-colors duration-400">
            AIA Learning Objective: Understand how <span className="text-[var(--text-primary)]">milled geometry</span> affects visual weight and performance.
          </p>
        </div>

        <section className="space-y-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <label className="text-[11px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.3em] block">Pattern Family</label>
              <select 
                value={session.design.patternFamily}
                onChange={e => updateDesign('patternFamily', e.target.value)}
                className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-[20px] p-4 font-bold text-sm focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer shadow-sm"
              >
                {['Bio-Organic', 'Geometric', 'Tectonic', 'Fluid', 'Radial'].map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="space-y-6">
              <label className="text-[11px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.3em] block">Orientation</label>
              <div className="flex bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-1.5 gap-2 shadow-sm">
                {(['Vertical', 'Horizontal'] as const).map(o => (
                  <button 
                    key={o}
                    onClick={() => updateDesign('orientation', o)}
                    className={`flex-1 py-2.5 text-[10px] font-black rounded-[14px] transition-all uppercase tracking-widest ${session.design.orientation === o ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8 bg-[var(--bg-card)] p-8 rounded-[32px] border border-[var(--border-color)] shadow-sm">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-black text-[var(--text-tertiary)] uppercase tracking-widest">CNC Pattern Scale</label>
                <span className="mono text-[11px] font-bold text-purple-600 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">{session.design.scale.toFixed(1)}x</span>
              </div>
              <input 
                type="range" min="0.5" max="3" step="0.1"
                value={session.design.scale}
                onChange={e => updateDesign('scale', parseFloat(e.target.value))}
                className="w-full" 
              />
            </div>
            
            <div className="space-y-8 bg-[var(--bg-card)] p-8 rounded-[32px] border border-[var(--border-color)] shadow-sm">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-black text-[var(--text-tertiary)] uppercase tracking-widest">Milled Relief Depth</label>
                <span className="mono text-[11px] font-bold text-purple-600 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">{session.design.depth.toFixed(2)} in</span>
              </div>
              <input 
                type="range" min="0.1" max="1.5" step="0.05"
                value={session.design.depth}
                onChange={e => updateDesign('depth', parseFloat(e.target.value))}
                className="w-full" 
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-8 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[40px] shadow-sm">
            <div className="flex items-center gap-8">
               <label className="text-[11px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.4em]">Integrated Backlighting</label>
               <button 
                onClick={() => updateDesign('backlighting', !session.design.backlighting)}
                className={`w-16 h-8 rounded-full transition-all duration-500 relative ${session.design.backlighting ? 'bg-purple-600' : 'bg-[var(--border-color)]'}`}
               >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white dark:bg-black rounded-full shadow-lg transition-transform duration-500 ${session.design.backlighting ? 'translate-x-8' : ''}`} />
               </button>
            </div>
            <div className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest max-w-[200px] text-right">
              Required for translucent solid-surface applications.
            </div>
          </div>
        </section>
      </div>

      <div className="lg:w-[500px] shrink-0 flex flex-col gap-6">
        <div className="flex items-center justify-between pl-4">
          <div className="flex items-center gap-3">
            <MousePointer2 size={14} className="text-purple-600" />
            <label className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.4em]">Interactive 3D Viewer</label>
          </div>
          <button 
            onClick={() => setRotation({ x: -10, y: 15 })}
            className="text-[10px] font-black text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2 transition-colors"
          >
            <RotateCcw size={12} />
            Reset View
          </button>
        </div>
        
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-1 rounded-[48px] border border-[var(--border-color)] bg-[var(--bg-dark)] shadow-xl relative overflow-hidden flex items-center justify-center cursor-move p-20 perspective-[1000px] transition-colors duration-400"
          style={{ minHeight: '600px' }}
        >
          <div 
            className="w-full h-full relative transition-transform duration-300 ease-out preserve-3d"
            style={{ 
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="absolute inset-0 bg-[var(--border-color)] rounded-xl shadow-2xl border border-white/5" style={{ transform: 'translateZ(-20px)' }} />
            <div 
              className="absolute inset-0 rounded-xl transition-all duration-700 overflow-hidden" 
              style={{ ...patternStyles, transform: 'translateZ(10px)' }}
            >
              <div 
                className="absolute inset-0 opacity-40 bg-gradient-to-br from-purple-500/20 via-transparent to-black/40"
                style={{ transform: `translateX(${rotation.y * -0.5}%) translateY(${rotation.x * -0.5}%)` }}
              />
            </div>
            
            <div className="absolute top-0 bottom-0 left-0 w-[20px] bg-[var(--bg-card)] brightness-75" style={{ transform: 'rotateY(-90deg) translateZ(10px)' }} />
            <div className="absolute top-0 left-0 right-0 h-[20px] bg-[var(--bg-card)] brightness-90" style={{ transform: 'rotateX(90deg) translateZ(10px)' }} />
          </div>

          <div className="absolute bottom-12 inset-x-12 glass p-8 rounded-[40px] shadow-2xl transition-colors duration-400">
             <div className="flex justify-between items-center mb-4">
               <div className="text-[10px] font-black text-purple-600 uppercase tracking-[0.3em]">Studio Analytics</div>
               <div className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">FPS: 60</div>
             </div>
             <div className="text-[15px] text-[var(--text-primary)] font-medium leading-relaxed">
               <span className="font-bold">{session.design.patternFamily}</span> system at <span className="font-bold">{session.design.depth}" relief</span>. 
               Observe highlight separation across {session.design.orientation.toLowerCase()} axes.
             </div>
          </div>
          
          {!isHovered && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse">
              <div className="bg-[var(--text-primary)]/10 backdrop-blur-md px-6 py-3 rounded-full border border-[var(--text-primary)]/20 text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">
                Move Mouse to Rotate
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Act3Customization;