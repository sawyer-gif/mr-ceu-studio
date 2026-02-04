
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { AIMessage, StudioSession } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  session: StudioSession;
}

const AIAAdvisor: React.FC<Props> = ({ isOpen, onClose, session }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    { role: 'model', text: `Hello. I am your HSW Compliance Advisor. How can I help you with your ${session.sector} project's technical specifications today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: `
              You are a senior AIA CES compliance expert and AEC Technical Advisor. 
              The student is currently working on a ${session.sector} project in the ${session.zone} zone.
              Current Performance Priorities: ${JSON.stringify(session.performance)}.
              Current Design: ${JSON.stringify(session.design)}.
              
              Answer the user's question with technical accuracy, referencing AIA HSW (Health, Safety, Welfare) definitions and CSI MasterFormat standards where applicable. 
              Keep it professional, concise, and studio-focused.
              
              User Question: ${userMessage}
            ` }]
          }
        ],
        config: {
          thinkingConfig: { thinkingBudget: 2000 }
        }
      });

      const modelText = response.text || "I apologize, I'm having trouble processing that technical query right now. Please try rephrasing.";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Technical error connecting to AIA Compliance Database. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-12 w-96 h-[500px] glass border border-purple-500/30 rounded-[32px] shadow-2xl z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      <div className="p-6 bg-purple-600/10 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles size={18} className="text-purple-500" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)]">AIA Studio Advisor</h4>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full transition-colors">
          <X size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[var(--bg-dark)]/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border ${m.role === 'model' ? 'bg-purple-500/10 border-purple-500/20 text-purple-600' : 'bg-[var(--bg-surface)] border-[var(--border-color)]'}`}>
              {m.role === 'model' ? <Bot size={14} /> : <User size={14} />}
            </div>
            <div className={`p-4 rounded-2xl text-[13px] leading-relaxed font-medium max-w-[80%] ${m.role === 'model' ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm' : 'bg-purple-600 text-white'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 animate-pulse">
              <Bot size={14} />
            </div>
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-purple-500" />
              <span className="text-[11px] font-bold text-purple-500 uppercase tracking-widest">Consulting Standards...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div className="flex gap-2 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-2xl p-2 focus-within:border-purple-500 transition-all">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about HSW compliance..."
            className="flex-1 bg-transparent px-2 py-1 text-sm outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 bg-purple-600 text-white rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAAdvisor;
