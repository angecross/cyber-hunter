
import React from 'react';
import { Shield, X, Activity, Database, BookOpen, MessageSquare } from 'lucide-react';
import { UserProgress } from '../types';
import { COURSES } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentView: string;
  setCurrentView: (view: any) => void;
  progress?: UserProgress;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentView, setCurrentView, progress = {} }) => {
  
  // Calculate Logic for XP
  const totalTopics = COURSES.reduce((acc, course) => acc + course.topics.length, 0);
  const completedTopics = Object.values(progress).reduce((acc, topics) => acc + topics.length, 0);
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  
  // Simple Level Logic: 1 Level per 5 topics
  const level = Math.floor(completedTopics / 5) + 1;

  const SidebarItem = ({ view, icon: Icon, label }: { view: string; icon: any; label: string }) => (
    <button
      onClick={() => { setCurrentView(view); setIsOpen(false); }}
      className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 group overflow-hidden ${
        currentView === view 
          ? 'text-[#00f3ff] bg-[#00f3ff]/10 border-r-2 border-[#00f3ff]' 
          : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#00f3ff] transform transition-transform duration-300 ${currentView === view ? 'translate-x-0' : '-translate-x-full'}`}></div>
      <Icon size={18} className="z-10" />
      <span className="font-mono tracking-wider text-sm uppercase z-10">{label}</span>
    </button>
  );

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#020617] border-r border-slate-800
      transform transition-transform duration-300 ease-in-out flex flex-col
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Sidebar Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-black/20">
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tighter font-mono">
          <Shield className="text-[#00f3ff]" size={24} />
          <span>CYBER<span className="text-slate-600">HUNTER</span></span>
        </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden ml-auto text-slate-400">
          <X size={24} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1 mt-6">
        <div className="px-4 mb-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest">Mainframe Access</div>
        <SidebarItem view="dashboard" icon={Activity} label="Ops_Center" />
        <SidebarItem view="tools" icon={Database} label="Tool_Db" />
        <SidebarItem view="courses" icon={BookOpen} label="Academy" />
        <SidebarItem view="tutor" icon={MessageSquare} label="AI_Mentor" />
      </nav>
      
      {/* Sidebar Footer */}
      <div className="p-6 bg-black/40 border-t border-slate-900">
         <div className="bg-[#0f172a] rounded-sm p-4 border border-slate-800 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent animate-pulse"></div>
           <h5 className="text-[10px] font-bold font-mono text-[#00f3ff] uppercase mb-2 flex justify-between">
              <span>User Rank</span>
              <span>Lvl {level}</span>
           </h5>
           <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
             <span>XP Progress</span>
             <span>{progressPercent}%</span>
           </div>
           <div className="h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
             <div 
               className="h-full bg-[#00f3ff] shadow-[0_0_10px_#00f3ff] transition-all duration-1000 ease-out"
               style={{ width: `${progressPercent}%` }}
             ></div>
           </div>
           <div className="mt-2 text-[9px] text-slate-500 text-right font-mono">
             {completedTopics} / {totalTopics} MODULES
           </div>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
