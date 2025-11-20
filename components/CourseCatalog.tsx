
import React from 'react';
import { Play, CheckCircle, Lock } from 'lucide-react';
import { COURSES } from '../constants';
import { CourseModule, UserProgress } from '../types';

interface CourseCatalogProps {
  onCourseSelect: (course: CourseModule, topic?: string) => void;
  progress: UserProgress;
}

const CourseCatalog: React.FC<CourseCatalogProps> = ({ onCourseSelect, progress }) => {
  
  const calculateCourseProgress = (course: CourseModule) => {
    const completedTopics = progress[course.id] || [];
    const percent = Math.round((completedTopics.length / course.topics.length) * 100);
    return { percent, completedCount: completedTopics.length };
  };

  return (
    <div className="h-full overflow-y-auto pb-20 custom-scrollbar pr-2">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h2 className="text-3xl font-bold text-white mb-2 font-mono">ACADEMY_MODULES</h2>
        <p className="text-slate-400 font-light">Select a training vector to begin your certification path.</p>
      </div>
      <div className="space-y-6 max-w-5xl mx-auto">
        {COURSES.map((course, idx) => {
          const { percent, completedCount } = calculateCourseProgress(course);
          const isComplete = percent === 100;

          return (
            <div key={course.id} className={`bg-[#0a1020]/50 border rounded-sm overflow-hidden transition-colors group ${isComplete ? 'border-[#00ff9d]/30' : 'border-slate-800 hover:border-[#00f3ff]/50'}`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-4 font-mono">
                    <span className="text-slate-700 text-lg">0{idx + 1}</span>
                    <span className="group-hover:text-[#00f3ff] transition-colors">{course.title}</span>
                    {isComplete && <CheckCircle className="text-[#00ff9d]" size={20} />}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-[10px] font-mono uppercase text-slate-500">Completion</div>
                      <div className={`text-sm font-bold font-mono ${isComplete ? 'text-[#00ff9d]' : 'text-[#00f3ff]'}`}>
                        {percent}%
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border ${
                      course.difficulty === 'Débutant' ? 'border-green-500/30 text-green-400 bg-green-500/5' :
                      course.difficulty === 'Intermédiaire' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5' :
                      'border-red-500/30 text-red-400 bg-red-500/5'
                    }`}>
                      {course.difficulty}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-900 mb-6 relative overflow-hidden rounded-full">
                   <div 
                     className={`h-full transition-all duration-500 ease-out ${isComplete ? 'bg-[#00ff9d] shadow-[0_0_10px_#00ff9d]' : 'bg-[#00f3ff]'}`} 
                     style={{ width: `${percent}%` }}
                   ></div>
                </div>

                <p className="text-slate-400 mb-6 pl-10 text-sm leading-relaxed border-l-2 border-slate-800">{course.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-10">
                  {course.topics.map((topic, i) => {
                    const isTopicDone = (progress[course.id] || []).includes(topic);
                    return (
                      <button
                        key={i}
                        onClick={() => onCourseSelect(course, topic)}
                        className={`flex items-center justify-between p-3 rounded-sm transition-all group/btn text-left border ${
                          isTopicDone 
                            ? 'bg-[#00ff9d]/5 border-[#00ff9d]/20 hover:border-[#00ff9d] text-slate-300' 
                            : 'bg-[#111827] border-slate-800 hover:bg-[#00f3ff] hover:text-black hover:border-[#00f3ff] text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isTopicDone ? <CheckCircle size={12} className="text-[#00ff9d]" /> : <Play size={10} className="fill-current" />}
                          <span className={`text-xs font-mono font-bold uppercase tracking-wide ${isTopicDone ? 'text-[#00ff9d] line-through opacity-70' : ''}`}>{topic}</span>
                        </div>
                        {isTopicDone && <span className="text-[9px] text-[#00ff9d] font-mono uppercase tracking-tighter">COMPLETED</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCatalog;
