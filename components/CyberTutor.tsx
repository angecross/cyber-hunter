import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Shield, ArrowRight } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import { askTutor } from '../services/geminiService';

const CyberTutor = () => {
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'model', text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);

    const response = await askTutor(userMsg);
    setChatHistory(prev => [...prev, { role: 'model', text: response }]);
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto bg-[#0a1020] rounded-sm border border-slate-700 shadow-2xl overflow-hidden cyber-panel">
        <div className="bg-[#020617] p-4 border-b border-slate-700 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#00f3ff]/10 border border-[#00f3ff] flex items-center justify-center">
            <MessageSquare size={20} className="text-[#00f3ff]" />
        </div>
        <div>
            <h3 className="font-bold text-white font-mono uppercase tracking-widest">AI_Mentor v2.0</h3>
            <p className="text-[10px] text-[#00ff9d]">ONLINE - ENCRYPTED CHANNEL</p>
        </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/20">
        {chatHistory.length === 0 && (
            <div className="text-center text-slate-600 mt-20 font-mono">
            <p className="mb-2 text-4xl opacity-20"><Shield /></p>
            <p>SECURE CHANNEL ESTABLISHED.</p>
            <p className="text-xs mt-2">Awaiting user query regarding OSINT, Pentesting or Tool usage.</p>
            </div>
        )}
        {chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-sm p-4 border ${
                msg.role === 'user' 
                ? 'bg-[#00f3ff]/10 border-[#00f3ff]/30 text-[#00f3ff]' 
                : 'bg-[#1e293b]/50 border-slate-700 text-slate-200'
            }`}>
                <div className="text-[9px] font-mono opacity-50 mb-2 uppercase">{msg.role === 'user' ? 'YOU' : 'AI_SYSTEM'}</div>
                {msg.role === 'model' ? <MarkdownRenderer content={msg.text} /> : <p className="font-mono text-sm">{msg.text}</p>}
            </div>
            </div>
        ))}
        <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleChatSubmit} className="p-4 bg-[#020617] border-t border-slate-700">
        <div className="relative">
            <input 
            className="w-full bg-black border border-slate-600 rounded-sm py-3 pl-4 pr-12 text-white focus:outline-none focus:border-[#00f3ff] font-mono text-sm placeholder-slate-700"
            placeholder="INPUT_QUERY..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#00f3ff] rounded-sm text-black hover:bg-white transition-colors">
            <ArrowRight size={16} />
            </button>
        </div>
        </form>
    </div>
  );
};

export default CyberTutor;