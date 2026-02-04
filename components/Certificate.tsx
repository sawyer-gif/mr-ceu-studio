
import React from 'react';
import { Award, ShieldCheck, Download, Printer, X } from 'lucide-react';
import { StudioSession } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  session: StudioSession;
}

const Certificate: React.FC<Props> = ({ isOpen, onClose, session }) => {
  if (!isOpen) return null;

  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-white p-12 md:p-20 shadow-2xl rounded-sm border-[12px] border-double border-gray-100 animate-in zoom-in-95 duration-500 overflow-hidden">
        
        {/* Architectural Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-gray-400 hover:text-black transition-colors print:hidden">
          <X size={24} />
        </button>

        <div className="relative flex flex-col items-center text-center">
          <div className="mb-12">
            <Award size={64} className="text-purple-600 mx-auto mb-6" />
            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-purple-600 mb-2">AIA Continuing Education Systems</div>
            <h1 className="text-4xl md:text-5xl font-serif italic text-gray-900 mb-4">Certificate of Completion</h1>
            <div className="h-0.5 w-32 bg-gray-200 mx-auto" />
          </div>

          <div className="mb-12 space-y-4">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">This certifies that</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight underline decoration-gray-200 underline-offset-8">
              {session.aiaData.learnerName || 'Learner Name Not Provided'}
            </h2>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest pt-4">Has successfully completed the studio session</p>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              Computational Surface Systems 101: {session.sector} Optimization
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-16 pt-8 border-t border-gray-100">
            <div className="text-center">
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Credit Earned</div>
              <div className="text-lg font-bold text-gray-900">1.0 LU | HSW</div>
            </div>
            <div className="text-center">
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Completion Date</div>
              <div className="text-lg font-bold text-gray-900">{date}</div>
            </div>
            <div className="text-center">
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">AIA Number</div>
              <div className="text-lg font-bold text-gray-900">{session.aiaData.aiaNumber || 'N/A'}</div>
            </div>
          </div>

          <div className="flex justify-between w-full items-end">
            <div className="text-left">
              <div className="w-48 border-b-2 border-gray-900 mb-2 h-12 flex items-end justify-center">
                 <span className="font-serif italic text-xl text-gray-400">Mario Romano</span>
              </div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Studio Director | MR Walls</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="text-green-600" size={32} />
              <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Verified AIA CES Provider</div>
              <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Provider Number: #4012435</div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-6 print:hidden">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            <Printer size={16} /> Print Certificate
          </button>
          <button className="flex items-center gap-2 px-8 py-3 border border-gray-200 text-gray-600 rounded-full text-xs font-black uppercase tracking-widest hover:border-black hover:text-black transition-all">
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
