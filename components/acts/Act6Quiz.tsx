
import React, { useState } from 'react';
import { StudioSession } from '../../types';
import { Target, AlertCircle, Award, Check, ChevronRight, ChevronLeft, GraduationCap, BookOpen, Rotate3d, XCircle, UserCheck, Mail, FileText } from 'lucide-react';
import Certificate from '../Certificate';

interface Props {
  session: StudioSession;
  setSession: React.Dispatch<React.SetStateAction<StudioSession>>;
}

const Act6Quiz: React.FC<Props> = ({ session, setSession }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({ 1: null, 2: null, 3: null });
  const [submitted, setSubmitted] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [showLearnerForm, setShowLearnerForm] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const questions = [
    {
      id: 1,
      q: `Technical Coordination: How does your selected CNC carving depth of ${session.design.depth} in. affect substrate coordination?`,
      options: [
        "It determines the required blocking thickness for structural support and electrical setback.",
        "It renders the fire-rating of the underlying substrate irrelevant (Class C permitted).",
        "It standardizes all field measurements, removing the need for shop drawings.",
        "It increases the acoustic NRC rating of the assembly by exactly 0.85."
      ],
      correct: 0,
      rationale: "Correct. In architectural millwork, carving depth directly impacts the 'clear zone' behind the face. A depth of " + session.design.depth + " in. requires specific coordination with substrate blocking to ensure hardware attachment and electrical safety."
    },
    {
      id: 2,
      q: `System Geometry: Why is the 'finger-joint' interlocking strategy preferred for the ${session.design.patternFamily} family?`,
      options: [
        "To allow for visual pattern continuity across panels while concealing vertical expansion joints.",
        "To provide a point for high-pressure ventilation directly through the surface geometry.",
        "To reduce the overall weight of the solid-surface panel by 40%.",
        "To facilitate field-cutting of panels using standard wood-working tools."
      ],
      correct: 0,
      rationale: "Correct. High-performance surface systems like MR Walls use interlocking geometry to hide the transition between panels, ensuring that the " + session.design.patternFamily + " design remains visually continuous without the disruption of traditional flat-edge seams."
    },
    {
      id: 3,
      q: `HSW/Welfare Compliance: Given the ${session.sector} context, which maintenance protocol supports long-term occupant welfare?`,
      options: [
        "The ability to field-refinish the non-porous surface to restore original conditions without replacement.",
        "The complete elimination of cleaning requirements due to the geometric pattern self-shedding dust.",
        "The mandatory replacement of panels every 5 years to maintain the AIA HSW certification.",
        "The use of high-VOC sealants to preserve the gloss level of the carved toolpaths."
      ],
      correct: 0,
      rationale: "Correct. Welfare in AIA HSW terms includes resource conservation. Solid surfaces are uniquely sustainable because they can be buffed and refinished in-situ, extending the building's lifecycle and reducing landfill waste."
    }
  ];

  const handleSelect = (idx: number) => {
    if (submitted && !isReviewing) return;
    if (isReviewing) return;
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: idx }));
  };

  const score = Object.entries(answers).filter(([id, ans]) => 
    ans === questions.find(q => q.id === parseInt(id))?.correct
  ).length;

  const passed = score === questions.length;

  const handleAssessmentSubmit = () => {
    setSubmitted(true);
    if (score === questions.length) {
      setShowLearnerForm(true);
      setSession(s => ({ ...s, quizPassed: true }));
    }
  };

  const handleLearnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLearnerForm(false);
  };

  const retry = () => {
    setAnswers({ 1: null, 2: null, 3: null });
    setSubmitted(false);
    setIsReviewing(false);
    setCurrentStep(0);
  };

  if (submitted && passed && !isReviewing) {
    if (showLearnerForm) {
      return (
        <div className="animate-in zoom-in-95 fade-in duration-1000 max-w-2xl mx-auto py-12">
          <div className="bg-[var(--bg-card)] border border-purple-500/30 p-12 rounded-[48px] shadow-2xl relative">
            <div className="flex items-center gap-4 mb-10">
              <UserCheck className="text-purple-500" size={32} />
              <h3 className="text-3xl font-black text-[var(--text-primary)] uppercase italic tracking-tighter">Learner Verification</h3>
            </div>
            
            <form onSubmit={handleLearnerSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-widest">Full Professional Name</label>
                <input 
                  required 
                  type="text" 
                  value={session.aiaData.learnerName}
                  onChange={e => setSession(s => ({ ...s, aiaData: { ...s.aiaData, learnerName: e.target.value }}))}
                  placeholder="Architect Name, AIA"
                  className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-2xl p-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-purple-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-widest">AIA Member Number (Optional)</label>
                <input 
                  type="text" 
                  value={session.aiaData.aiaNumber}
                  onChange={e => setSession(s => ({ ...s, aiaData: { ...s.aiaData, aiaNumber: e.target.value }}))}
                  placeholder="12345678"
                  className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-2xl p-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-purple-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-widest">Email for Certificate</label>
                <input 
                  required 
                  type="email" 
                  value={session.aiaData.learnerEmail}
                  onChange={e => setSession(s => ({ ...s, aiaData: { ...s.aiaData, learnerEmail: e.target.value }}))}
                  placeholder="architect@firm.com"
                  className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-2xl p-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-purple-500 transition-all"
                />
              </div>
              
              <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium mb-8 italic">
                Your data is used solely for AIA CES credit reporting and certificate issuance. No pricing or sales follow-up is required for credit.
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-[var(--text-primary)] text-[var(--bg-dark)] font-black text-xs uppercase tracking-[0.4em] rounded-full hover:scale-[1.02] transition-all shadow-2xl"
              >
                Finalize Credit Recording
              </button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in zoom-in-95 fade-in duration-1000 max-w-4xl mx-auto py-12">
        <Certificate isOpen={showCertificate} onClose={() => setShowCertificate(false)} session={session} />
        <div className="bg-[var(--bg-card)] border border-purple-500/30 p-16 rounded-[64px] shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
          <div className="w-24 h-24 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-full flex items-center justify-center mx-auto mb-8">
            <Award size={48} className="text-purple-500" />
          </div>
          <h3 className="text-5xl font-black text-[var(--text-primary)] mb-6 tracking-tighter italic uppercase">Certification Achieved</h3>
          <p className="text-[var(--text-secondary)] text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">
            Professional mastery demonstrated. Your <span className="text-[var(--text-primary)] font-bold">1.0 HSW Credit</span> for the <span className="text-[var(--text-primary)] font-bold">{session.sector} Studio Session</span> has been recorded.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
             <div className="px-10 py-5 bg-green-500/10 border border-green-500/30 text-green-600 text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-3">
               <Check size={18} /> AIA Transcript synced
             </div>
             <button onClick={() => setShowCertificate(true)} className="px-10 py-5 bg-purple-600 text-white text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl flex items-center gap-3">
               <FileText size={18} /> View Certificate
             </button>
             <button onClick={() => setIsReviewing(true)} className="px-10 py-5 bg-[var(--bg-dark)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-black uppercase tracking-widest rounded-full hover:bg-[var(--bg-surface)] transition-all">
               Review Rationales
             </button>
          </div>

          <div className="pt-12 border-t border-[var(--border-color)]">
            <div className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.6em] mb-8">Post-Course Professional Resources (Optional)</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Request Samples', 'Spec Sheet', 'Technical Review', 'Download BIM'].map(a => (
                <button key={a} className="p-4 bg-[var(--bg-dark)] rounded-2xl border border-[var(--border-color)] text-[9px] font-black text-[var(--text-tertiary)] uppercase tracking-widest hover:border-purple-500 hover:text-[var(--text-primary)] transition-all">
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentStep];
  const userAns = answers[q.id];
  const isCorrect = userAns === q.correct;
  const showFeedback = submitted || isReviewing;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col lg:flex-row gap-12 pb-24">
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="text-purple-500" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500">
              {isReviewing ? 'Post-Session Review' : 'Final HSW Assessment'}
            </span>
          </div>
          <h2 className="text-5xl font-black tracking-tight text-[var(--text-primary)] mb-4">
            {isReviewing ? 'Assessment Review' : 'Logic Verification'}
          </h2>
          <div className="flex items-center gap-4">
             <div className="flex-1 h-1 bg-[var(--border-color)] rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${((currentStep + 1) / 3) * 100}%` }} />
             </div>
             <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">Question {currentStep + 1}/3</span>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-10 rounded-[40px] shadow-2xl min-h-[500px] flex flex-col">
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight leading-snug">{q.q}</h4>
          </div>

          <div className="space-y-3 flex-1">
            {q.options.map((opt, idx) => {
              const selected = userAns === idx;
              const correct = q.correct === idx;
              
              let styles = "border-[var(--border-color)] bg-[var(--bg-dark)]/40 text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]";
              if (showFeedback) {
                if (correct) styles = "!border-green-500 !bg-green-500/10 !text-green-600";
                else if (selected && !correct) styles = "!border-red-500 !bg-red-500/10 !text-red-500";
                else styles = "opacity-30 border-[var(--border-color)] bg-[var(--bg-dark)]/40 text-[var(--text-secondary)]";
              } else if (selected) {
                styles = "border-purple-500 bg-purple-500/10 text-[var(--text-primary)] shadow-lg";
              }

              return (
                <button
                  key={idx}
                  disabled={showFeedback && !isReviewing}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-5 text-left text-sm font-bold rounded-2xl border transition-all duration-300 flex items-center justify-between group ${styles}`}
                >
                  <span className="flex-1 pr-6">{opt}</span>
                  <div className={`w-6 h-6 rounded-full border border-current flex items-center justify-center transition-all ${selected || (showFeedback && correct) ? 'scale-110' : 'opacity-0 group-hover:opacity-100'}`}>
                    {showFeedback && correct ? <Check size={14} /> : showFeedback && selected ? <XCircle size={14} /> : <Target size={12} />}
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`mt-8 p-6 rounded-2xl border animate-in slide-in-from-top-2 ${isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen size={16} className={isCorrect ? 'text-green-600' : 'text-red-500'} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                  Rationale & Technical Context
                </span>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-medium">
                {q.rationale}
              </p>
            </div>
          )}

          <div className="mt-10 flex justify-between items-center border-t border-[var(--border-color)] pt-8">
            <button 
              onClick={() => setCurrentStep(s => s - 1)}
              disabled={currentStep === 0}
              className="flex items-center gap-2 text-xs font-black text-[var(--text-tertiary)] hover:text-[var(--text-primary)] disabled:opacity-0 transition-all uppercase tracking-widest"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            
            {currentStep < 2 ? (
              <button 
                disabled={userAns === null && !isReviewing}
                onClick={() => setCurrentStep(s => s + 1)}
                className="px-10 py-4 bg-[var(--text-primary)] text-[var(--bg-dark)] text-xs font-black rounded-full hover:scale-105 disabled:opacity-20 transition-all uppercase tracking-widest shadow-xl"
              >
                Next Question <ChevronRight size={16} />
              </button>
            ) : (
              <div className="flex gap-4">
                {submitted && !passed && !isReviewing && (
                  <button 
                    onClick={retry}
                    className="px-8 py-4 bg-red-600 text-white text-xs font-black rounded-full hover:bg-red-700 transition-all uppercase tracking-widest shadow-2xl"
                  >
                    Retry Logic
                  </button>
                )}
                {isReviewing ? (
                  <button 
                    onClick={() => setIsReviewing(false)}
                    className="px-8 py-4 bg-purple-600 text-white text-xs font-black rounded-full hover:bg-purple-700 transition-all uppercase tracking-widest shadow-2xl"
                  >
                    Back to Results
                  </button>
                ) : (
                  <button 
                    disabled={!Object.values(answers).every(v => v !== null) || (submitted && passed)}
                    onClick={handleAssessmentSubmit}
                    className="px-10 py-4 bg-purple-600 text-white text-xs font-black rounded-full hover:scale-105 disabled:opacity-20 transition-all uppercase tracking-widest shadow-2xl"
                  >
                    Complete Assessment
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:w-[320px] shrink-0 pt-24">
        <div className="sticky top-12 space-y-6">
          <div className="bg-[var(--bg-card)] rounded-[32px] p-8 border border-[var(--border-color)] card-shadow relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
              <Rotate3d size={16} className="text-purple-500" />
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Studio Reference</h5>
            </div>
            
            <div className="aspect-square w-full rounded-2xl overflow-hidden mb-6 border border-[var(--border-color)] relative bg-[var(--bg-dark)]">
               <div 
                className="absolute inset-0 opacity-10" 
                style={{ 
                  backgroundImage: `linear-gradient(${session.design.orientation === 'Vertical' ? '90deg' : '0deg'}, var(--text-primary) 1px, transparent 1px)`,
                  backgroundSize: `${40 / session.design.scale}px ${40 / session.design.scale}px`
                }} 
              />
               <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-dark)] via-transparent to-[var(--text-primary)]/5" />
            </div>

            <div className="space-y-4">
               <div>
                 <div className="text-[9px] font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-1">Active Sector</div>
                 <div className="text-xs font-bold text-[var(--text-primary)] uppercase">{session.sector}</div>
               </div>
               <div>
                 <div className="text-[9px] font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-1">Milled Profile</div>
                 <div className="text-xs font-bold text-[var(--text-primary)] uppercase">{session.design.depth}" Relief</div>
               </div>
            </div>
          </div>

          <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
             <div className="flex items-center gap-3 mb-3">
               <BookOpen size={14} className="text-purple-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-purple-500">CEU Requirement</span>
             </div>
             <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium italic">
               AIA compliance requires an 80-100% passing score on the assessment. Questions reference the HSW criteria selected during your Studio Session.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Act6Quiz;
