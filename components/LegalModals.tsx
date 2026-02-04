
import React from 'react';
import { X, ShieldCheck, Scale, Lock } from 'lucide-react';

interface Props {
  type: 'compliance' | 'privacy' | 'terms' | null;
  onClose: () => void;
}

const LegalModals: React.FC<Props> = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    compliance: {
      title: "AIA CES Compliance Disclosure",
      icon: <ShieldCheck className="text-purple-500" size={24} />,
      lastUpdated: "October 24, 2023",
      body: `
        <div class="space-y-6">
          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">AIA CES Provider Statement</h4>
            <p>MR CEU Studio is a Registered Provider with The American Institute of Architects Continuing Education Systems (AIA/CES). Credit(s) earned on completion of our programs will be reported to AIA/CES for AIA members by the Provider. Certificates of Completion for both AIA members and non-AIA members are available upon request.</p>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">HSW Credit Eligibility</h4>
            <p>Courses labeled "HSW" are developed specifically to meet the AIA CES Health, Safety, and Welfare (HSW) criteria. These programs focus on the technical and professional aspects of architectural practice that protect the public. Our computational design modules are vetted against current AIA HSW definitions.</p>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">Provider Status</h4>
            <p>MR CEU Studio is currently an AIA CES Registered Provider (pending final approval for specific new modules). All courses are submitted for individual HSW qualification prior to general availability.</p>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">Recordkeeping Responsibilities</h4>
            <p>As an AIA CES Registered Provider, MR CEU Studio maintains attendance and completion records for a minimum of six (6) years. It is the responsibility of the individual member to ensure their AIA number is correctly filed in their user profile to facilitate automated reporting.</p>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">No Endorsement Disclaimer</h4>
            <p class="text-xs italic">This program is registered with AIA/CES for continuing professional education. As such, it does not include content that may be deemed or construed to be an approval or endorsement by the AIA of any material of construction or any method or manner of handling, using, distributing, or dealing in any material or product.</p>
          </section>
        </div>
      `
    },
    privacy: {
      title: "Privacy Policy",
      icon: <Lock className="text-purple-500" size={24} />,
      lastUpdated: "October 24, 2023",
      body: `
        <div class="space-y-6">
          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">1. Data Collection</h4>
            <p>MR CEU Studio collects information necessary to provide and verify continuing education credits, including:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Identity Data:</strong> Full name and professional suffixes.</li>
              <li><strong>Contact Data:</strong> Professional email address and firm affiliation.</li>
              <li><strong>Professional Data:</strong> AIA Member Number and state licensure details.</li>
              <li><strong>Usage Analytics:</strong> Time-on-task, quiz scores, and interaction logs required for CEU verification.</li>
            </ul>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">2. Purpose of Collection</h4>
            <p>We use your data strictly for: reporting earned credits to the AIA/CES, issuing Certificates of Completion, managing waitlist priority, and compliance auditing.</p>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">3. Third-Party Services</h4>
            <p>We do not sell professional data. Data is shared only with the American Institute of Architects (for credit reporting), compliance-auditing bodies, and secure sub-processors (hosting and email delivery).</p>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">4. User Rights (CCPA/GDPR)</h4>
            <p>Under CCPA/CPRA and GDPR principles, you have the right to access, correct, or delete your professional profile. Requests can be directed to <strong>compliance@mrwalls.com</strong>.</p>
          </section>
        </div>
      `
    },
    terms: {
      title: "Terms of Service",
      icon: <Scale className="text-purple-500" size={24} />,
      lastUpdated: "October 24, 2023",
      body: `
        <div class="space-y-6">
          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">1. Use of the Website</h4>
            <p>This website provides access to professional education modules. Unauthorized reproduction of course content is strictly prohibited.</p>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">2. Waitlist Participation</h4>
            <p>MR CEU Studio is currently in a waitlist-only phase. Joining the waitlist does not create a contract for services, nor does it guarantee the immediate availability of CEU credits until the platform's full commercial launch.</p>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">3. Intellectual Property</h4>
            <p>All courseware, computational design logic, geometric patterns (including the MR Walls series), and interface designs are the exclusive property of MR CEU Studio and Mario Romano.</p>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">4. Limitation of Liability</h4>
            <p>MR CEU Studio provides educational content "as is." The application of architectural principles to specific building projects remains the sole responsibility of the Architect of Record (AOR).</p>
          </section>

          <section>
            <h4 class="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">5. Governing Law</h4>
            <p>These terms are governed by the laws of the State of California, United States.</p>
          </section>
        </div>
      `
    }
  };

  const active = content[type];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 md:p-10 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-surface)]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl">
              {active.icon}
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-[var(--text-primary)]">{active.title}</h3>
              <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)]">Legal Documentation</div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-[var(--bg-dark)] rounded-full transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            aria-label="Close Modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <div 
            className="text-[var(--text-secondary)] text-[14px] leading-relaxed font-medium"
            dangerouslySetInnerHTML={{ __html: active.body }}
          />
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-dark)]/30 backdrop-blur-sm">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)]">Effective Date</span>
            <span className="text-[11px] font-bold text-[var(--text-primary)]">{active.lastUpdated}</span>
          </div>
          <button 
            onClick={onClose} 
            className="px-10 py-4 bg-[var(--text-primary)] text-[var(--bg-dark)] rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModals;
