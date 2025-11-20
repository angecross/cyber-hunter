import React from 'react';
import { Shield, Database, BookOpen, Activity, ArrowRight } from 'lucide-react';
import { COURSES } from '../constants';
import { CourseModule } from '../types';

interface DashboardProps {
  setCurrentView: (view: any) => void;
  onCourseSelect: (course: CourseModule) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setCurrentView, onCourseSelect }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Hero Banner */}
      <div className="relative rounded-xl border border-[#00f3ff]/20 bg-[#0a1020]/80 p-8 md:p-12 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#00f3ff]/5 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4 text-[#00f3ff]">
             <Shield className="animate-pulse" />
             <span className="font-mono text-xs uppercase tracking-[0.3em]">System Online</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-mono glitch-hover">
            CYBER<span className="text-[#00f3ff]">-HUNTER</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl font-light">
            Initialisez votre séquence d'apprentissage. Accédez à 600+ outils OSINT, simulez des attaques et maîtrisez Kali Linux dans un environnement contrôlé.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setCurrentView('tools')} className="bg-[#00f3ff] hover:bg-[#00c2cc] text-black px-8 py-3 rounded-sm font-bold font-mono transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]">
              <Database size={18} /> ACCESS_TOOLS
            </button>
            <button onClick={() => setCurrentView('courses')} className="bg-transparent border border-slate-600 hover:border-white text-white px-8 py-3 rounded-sm font-bold font-mono transition-all flex items-center justify-center gap-2">
              <BookOpen size={18} /> START_MODULES
            </button>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-2">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
            <Activity className="text-[#00ff9d]" size={20} /> 
            ACTIVE_CAMPAIGNS
          </h2>
          <span className="text-xs text-slate-500 font-mono">{COURSES.length} MODULES LOADED</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.slice(0, 3).map((course, idx) => (
            <div key={course.id} className="cyber-panel p-6 rounded-sm hover:bg-[#111827] transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-700 group-hover:bg-[#00f3ff] transition-colors"></div>
              
              <div className="flex justify-between items-start mb-4 pl-2">
                <span className="text-[10px] font-mono text-[#00f3ff] uppercase tracking-wider border border-[#00f3ff]/30 px-2 py-0.5 rounded-full">
                  {course.difficulty}
                </span>
                <span className="text-slate-600 text-xs font-mono">0{idx + 1}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 pl-2 group-hover:text-[#00f3ff] transition-colors font-mono">
                {course.title.split(':')[1] || course.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 pl-2 border-l border-transparent group-hover:border-slate-600 transition-all">{course.description}</p>
              
              <button 
                onClick={() => onCourseSelect(course)}
                className="text-white text-xs font-bold font-mono flex items-center gap-2 hover:gap-3 transition-all pl-2 uppercase tracking-wider"
              >
                Initialize <ArrowRight size={14} className="text-[#00f3ff]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;