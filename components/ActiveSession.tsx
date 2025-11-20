import React, { useState } from 'react';
import { ArrowRight, BookOpen, Terminal, Crosshair, Shield, Activity, CheckCircle, AlertCircle, RotateCcw, Youtube, ExternalLink, Save } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import { Tool, ExerciseScenario, ExerciseFeedback, VideoResource } from '../types';
import { verifyExerciseAnswer } from '../services/geminiService';

interface ActiveSessionProps {
  title: string;
  content: string;
  tool?: Tool;
  scenario: ExerciseScenario | null;
  videos: VideoResource[];
  onClose: () => void;
  // Progress Props
  isCompleted?: boolean;
  onComplete?: () => void;
  showCompleteBtn?: boolean;
}

const ActiveSession: React.FC<ActiveSessionProps> = ({ 
  title, content, tool, scenario, videos, onClose,
  isCompleted = false, onComplete, showCompleteBtn = false
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'practice' | 'video'>('guide');
  const [exerciseInput, setExerciseInput] = useState('');
  const [exerciseFeedback, setExerciseFeedback] = useState<ExerciseFeedback | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleExerciseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseInput.trim() || !tool || !scenario) return;

    setIsVerifying(true);
    const feedback = await verifyExerciseAnswer(tool.name, scenario, exerciseInput);
    setExerciseFeedback(feedback);
    setIsVerifying(false);
  };

  const renderTerminal = () => {
    if (!scenario) return <div className="p-8 text-center font-mono text-[#00f3ff] animate-pulse">INITIALIZING SIMULATION...</div>;

    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-20">
        {/* Scenario Panel - Fond opaque sans flou */}
        <div className="bg-[#0a1020] border border-slate-800 p-6 relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Crosshair size={150} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
               <div className={`px-2 py-1 border text-xs font-mono font-bold uppercase tracking-widest ${
                 scenario.difficulty === 'Easy' ? 'border-green-500 text-green-500 bg-green-500/10' :
                 scenario.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' :
                 'border-red-500 text-red-500 bg-red-500/10'
               }`}>
                 Level: {scenario.difficulty}
               </div>
               <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                 <Shield size={18} className="text-[#00f3ff]" />
                 MISSION BRIEFING
               </h3>
            </div>
            
            <p className="text-slate-300 mb-6 text-lg font-light">{scenario.context}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-950/30 border-l-2 border-[#00f3ff] p-4">
                <h4 className="text-[#00f3ff] text-xs font-mono font-bold uppercase mb-2">OBJECTIVE</h4>
                <p className="text-white font-medium">{scenario.task}</p>
              </div>
              <div className="bg-red-950/20 border-l-2 border-red-500 p-4">
                <h4 className="text-red-500 text-xs font-mono font-bold uppercase mb-2">TARGET</h4>
                <div className="flex items-center gap-2 font-mono text-white">
                  <Crosshair size={14} className="animate-spin-slow" />
                  {scenario.target}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Interface */}
        <div className="bg-black rounded-t-lg border border-slate-700 border-b-0 overflow-hidden shadow-2xl mt-8">
          <div className="bg-[#1a1b26] px-4 py-2 flex items-center justify-between border-b border-slate-800">
            <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-xs text-slate-500 font-mono">root@cyber-hunter:~</span>
            <div className="w-10"></div>
          </div>
          
          <div className="p-6 font-mono text-sm bg-black/90 crt-screen min-h-[200px] relative">
             <div className="text-slate-500 mb-4">
               Cyber-Hunter OS [Version 2.0.4]<br/>
               (c) 2025 Cyber-Hunter Corp. All rights reserved.<br/>
               <br/>
               Type your command to execute the mission objective.
             </div>
             
             <form onSubmit={handleExerciseSubmit} className="space-y-4 relative z-20">
               <div className="flex items-center gap-2 text-base">
                 <span className="text-green-500 font-bold">root@kali</span>
                 <span className="text-slate-500">:</span>
                 <span className="text-blue-500 font-bold">~</span>
                 <span className="text-slate-500">$</span>
                 <input 
                   type="text" 
                   value={exerciseInput}
                   onChange={(e) => setExerciseInput(e.target.value)}
                   placeholder={`Enter command for ${tool?.name || 'mission'}...`}
                   className="flex-1 bg-transparent border-none focus:ring-0 text-[#00f3ff] placeholder-slate-800 focus:outline-none w-full caret-[#00f3ff]"
                   autoComplete="off"
                   autoFocus
                   spellCheck={false}
                 />
               </div>
             </form>
          </div>
        </div>

        {/* Feedback Output */}
        {isVerifying && (
          <div className="border border-t-0 border-slate-700 bg-black/50 p-4 font-mono text-sm text-yellow-500 flex items-center gap-2">
             <Activity size={14} className="animate-spin" /> ANALYZING PAYLOAD...
          </div>
        )}

        {exerciseFeedback && (
          <div className={`border border-t-0 p-6 relative overflow-hidden ${
            exerciseFeedback.correct 
              ? 'border-green-500/30 bg-green-950/20' 
              : 'border-red-500/30 bg-red-950/20'
          }`}>
             <div className="flex items-start gap-4 relative z-10">
               {exerciseFeedback.correct ? (
                 <div className="bg-green-500/20 p-2 rounded-full">
                   <CheckCircle className="text-green-400" size={24} />
                 </div>
               ) : (
                 <div className="bg-red-500/20 p-2 rounded-full">
                   <AlertCircle className="text-red-400" size={24} />
                 </div>
               )}
               <div>
                 <h4 className={`text-lg font-bold font-mono mb-2 ${
                   exerciseFeedback.correct ? 'text-green-400' : 'text-red-400'
                 }`}>
                   {exerciseFeedback.message.toUpperCase()}
                 </h4>
                 <p className="text-slate-300 leading-relaxed font-sans">
                   {exerciseFeedback.tips}
                 </p>
               </div>
             </div>
             
             {!exerciseFeedback.correct && (
               <button 
                 onClick={() => { setExerciseInput(''); setExerciseFeedback(null); }}
                 className="mt-4 ml-14 flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#00f3ff] transition-colors uppercase tracking-wider"
               >
                 <RotateCcw size={12} /> Reset Terminal
               </button>
             )}
             
             {/* Decorator Line */}
             <div className={`absolute bottom-0 left-0 h-1 w-full ${exerciseFeedback.correct ? 'bg-green-500/50' : 'bg-red-500/50'}`}></div>
          </div>
        )}
      </div>
    );
  };

  const renderVideos = () => {
    if (!videos || videos.length === 0) return (
      <div className="p-20 text-center border border-dashed border-slate-700 rounded-lg">
        <Youtube size={48} className="mx-auto text-slate-600 mb-4" />
        <h3 className="text-xl text-slate-400 font-mono">NO_VIDEO_ARCHIVES_FOUND</h3>
        <p className="text-slate-600 mt-2">Les archives vidéo pour ce module sont corrompues ou inaccessibles.</p>
      </div>
    );

    return (
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {videos.map((vid, idx) => (
          // Fond opaque sans flou pour les cartes vidéo
          <div key={idx} className="group bg-[#0a1020] border border-slate-800 p-6 rounded-sm hover:border-[#00f3ff]/50 transition-all relative overflow-hidden">
             {/* Holographic Edge */}
             <div className="absolute top-0 left-0 w-1 h-full bg-slate-700 group-hover:bg-red-500 transition-colors"></div>
             
             <div className="flex items-start justify-between mb-4 pl-2">
               <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Youtube size={12} /> EXTERNAL_SOURCE
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00f3ff] transition-colors leading-tight">
                    {vid.title}
                  </h3>
               </div>
               {vid.duration && (
                 <span className="text-xs font-mono bg-black/40 px-2 py-1 rounded text-slate-400 border border-slate-800">
                   {vid.duration}
                 </span>
               )}
             </div>
             
             <p className="text-sm text-slate-400 mb-6 pl-2 border-l border-transparent group-hover:border-slate-600 transition-all">
               {vid.description}
             </p>
             
             <a 
               href={`https://www.youtube.com/results?search_query=${encodeURIComponent(vid.searchQuery)}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-between bg-[#1f2937] hover:bg-red-600 hover:text-white p-3 rounded-sm text-xs font-mono font-bold text-slate-300 transition-all group/btn ml-2"
             >
               <span>INITIATE_PLAYBACK_SEQUENCE</span>
               <ExternalLink size={14} />
             </a>
          </div>
        ))}
        
        <div className="col-span-full mt-8 p-4 border border-[#00f3ff]/20 bg-[#00f3ff]/5 rounded-sm flex items-center gap-4 text-sm text-[#00f3ff] font-mono">
          <Activity className="animate-pulse" size={18} />
          <span>NOTE: Les flux vidéo sont redirigés via des protocoles externes (YouTube) pour contourner les pare-feu locaux.</span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right-10 duration-300">
      {/* Generated Header */}
      <div className="flex flex-col gap-4 mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-[#00f3ff]/10 border border-slate-700 hover:border-[#00f3ff] rounded-sm text-slate-400 hover:text-[#00f3ff] transition-colors"
            >
              <ArrowRight className="rotate-180" />
            </button>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Current Operation</div>
              <h2 className="text-2xl font-bold text-white font-mono truncate">{title}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Complete Button */}
             {showCompleteBtn && (
               <button
                 onClick={onComplete}
                 disabled={isCompleted}
                 className={`flex items-center gap-2 px-4 py-2 rounded-sm font-mono font-bold text-xs transition-all uppercase tracking-wider ${
                   isCompleted 
                     ? 'bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d] cursor-default'
                     : 'bg-[#00f3ff] text-black hover:bg-white hover:shadow-[0_0_15px_#00f3ff]'
                 }`}
               >
                 {isCompleted ? (
                   <>
                     <CheckCircle size={16} />
                     MODULE_COMPLETE
                   </>
                 ) : (
                   <>
                     <Save size={16} />
                     MARK_COMPLETE
                   </>
                 )}
               </button>
             )}

            <div className="hidden md:block">
              <div className="flex gap-1">
                 {[1,2,3].map(i => <div key={i} className="w-2 h-2 bg-[#00f3ff]/30 rounded-full animate-pulse" style={{animationDelay: `${i*0.2}s`}}></div>)}
              </div>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex border-b border-slate-800 w-full mt-2">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 pb-3 text-xs font-bold font-mono uppercase tracking-widest transition-colors border-b-2 ${
              activeTab === 'guide' 
                ? 'border-[#00f3ff] text-[#00f3ff] bg-[#00f3ff]/5' 
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <BookOpen size={14} /> Manual_Override
            </div>
          </button>
          
          {/* Video Tab is always available now */}
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 pb-3 text-xs font-bold font-mono uppercase tracking-widest transition-colors border-b-2 ${
              activeTab === 'video' 
                ? 'border-red-500 text-red-400 bg-red-500/5' 
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Youtube size={14} /> Archives_Vidéo
            </div>
          </button>

          {tool && (
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex-1 pb-3 text-xs font-bold font-mono uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === 'practice' 
                  ? 'border-[#00ff9d] text-[#00ff9d] bg-[#00ff9d]/5' 
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Terminal size={14} /> Combat_Sim
              </div>
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {activeTab === 'guide' && (
          // Fond opaque, sans opacité, sans cyber-grid pour éliminer le flou et l'atténuation
          <div className="max-w-5xl mx-auto bg-[#0a1020] border border-slate-800 rounded-sm p-8 md:p-12 shadow-2xl mb-20">
             <MarkdownRenderer content={content || ''} />
          </div>
        )}
        
        {activeTab === 'video' && renderVideos()}

        {activeTab === 'practice' && renderTerminal()}
      </div>
    </div>
  );
};

export default ActiveSession;