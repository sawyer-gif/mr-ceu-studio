
import React, { useState } from 'react';
import { X, Send, CheckCircle2, Building2, User, Briefcase, Mail, Loader2, AlertCircle } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, courseTitle = "Future Studio Sessions" }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    role: 'Architect',
    email: '',
    honeypot: '' // Hidden field
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) return;
    setStatus('loading');

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        company: formData.company.trim(),
        role: formData.role,
        email: formData.email.trim(),
      };

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ ...formData, firstName: '', lastName: '', company: '', email: '', honeypot: '' });
        setTimeout(() => {
          setStatus('idle');
          onClose();
        }, 2000);
        return;
      }

      if (response.status === 409) {
        setStatus('duplicate');
        return;
      }

      setStatus('error');
    } catch (error) {
      console.error('waitlist submission failed', error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 inset-x-0 h-1 bg-[var(--accent-purple)] opacity-30" />
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors p-2"
        >
          <X size={22} />
        </button>

        <div className="p-10 md:p-14">
          {status === 'success' ? (
            <div className="py-12 text-center animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[var(--text-primary)] mb-3">Priority Confirmed</h3>
              <p className="text-[var(--text-secondary)] font-medium max-w-xs mx-auto text-sm leading-relaxed">
                We've added you to the access list for <span className="text-[var(--text-primary)] font-bold">{courseTitle}</span>.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <div className="text-[10px] font-black text-[var(--accent-purple)] uppercase tracking-[0.5em] mb-4">AIA HSW Enrollment</div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[var(--text-primary)] mb-3">Join the Waitlist</h3>
                <p className="text-[var(--text-secondary)] text-sm font-medium leading-relaxed">
                  Register for priority access to the next <span className="text-[var(--text-primary)] font-bold">{courseTitle}</span> studio.
                </p>
              </div>

              {status === 'duplicate' && (
                <div className="mb-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center gap-3 text-blue-600 text-xs font-bold animate-in slide-in-from-top-2">
                  <AlertCircle size={16} />
                  You're already on the list — we'll be in touch soon.
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold">
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or contact support.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input 
                  type="text" 
                  name="fax_number" 
                  className="hidden" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  onChange={e => setFormData({...formData, honeypot: e.target.value})}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)] ml-3 flex items-center gap-2">
                      <User size={10} /> First Name
                    </label>
                    <input 
                      required
                      type="text"
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      placeholder="Jane"
                      className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] p-4 rounded-2xl outline-none focus:border-[var(--accent-purple)] transition-all text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)] ml-3 flex items-center gap-2">
                      <User size={10} /> Last Name
                    </label>
                    <input 
                      required
                      type="text"
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Doe"
                      className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] p-4 rounded-2xl outline-none focus:border-[var(--accent-purple)] transition-all text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)] ml-3 flex items-center gap-2">
                      <Building2 size={10} /> Firm
                    </label>
                    <input 
                      required
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      placeholder="HKS"
                      className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] p-4 rounded-2xl outline-none focus:border-[var(--accent-purple)] transition-all text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)] ml-3 flex items-center gap-2">
                      <Briefcase size={10} /> Role
                    </label>
                    <select 
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] p-4 rounded-2xl outline-none focus:border-[var(--accent-purple)] transition-all text-sm text-[var(--text-primary)] appearance-none cursor-pointer"
                    >
                      <option value="Architect">Architect</option>
                      <option value="Designer">Designer</option>
                      <option value="Student">Student</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)] ml-3 flex items-center gap-2">
                    <Mail size={10} /> Professional Email
                  </label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="architect@firm.com"
                    className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] p-4 rounded-2xl outline-none focus:border-[var(--accent-purple)] transition-all text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-5 bg-[var(--text-primary)] text-[var(--bg-dark)] font-black text-xs uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3 mt-6"
                >
                  {status === 'loading' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>Request Access <Send size={14} /></>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;
