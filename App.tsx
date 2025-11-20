
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Tool, CourseModule, ExerciseScenario, VideoResource, UserProgress } from './types';
import { generateToolGuide, generateLesson, generateExercise, generateVideoResources } from './services/geminiService';

// Layout Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Views
import Dashboard from './components/Dashboard';
import ToolsLibrary from './components/ToolsLibrary';
import CourseCatalog from './components/CourseCatalog';
import CyberTutor from './components/CyberTutor';
import ActiveSession from './components/ActiveSession';

type View = 'dashboard' | 'tools' | 'courses' | 'tutor';

type ContentState = {
  isLoading: boolean;
  data: string | null;
  error: string | null;
  currentTitle: string | null;
  scenario: ExerciseScenario | null;
  currentTool?: Tool;
  videos?: VideoResource[];
  // Context for progress tracking
  activeCourseId?: string;
  activeTopic?: string;
};

const App = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Progress State
  const [progress, setProgress] = useState<UserProgress>({});

  // Load progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('cyber_hunter_progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  // Save progress handler
  const handleMarkComplete = (courseId: string, topic: string) => {
    setProgress(prev => {
      const courseProgress = prev[courseId] || [];
      if (courseProgress.includes(topic)) return prev;

      const newProgress = {
        ...prev,
        [courseId]: [...courseProgress, topic]
      };
      
      localStorage.setItem('cyber_hunter_progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };
  
  // Content Generation State
  const [generatedContent, setGeneratedContent] = useState<ContentState>({
    isLoading: false,
    data: null,
    error: null,
    currentTitle: null,
    scenario: null,
    videos: []
  });

  // --- Handlers ---

  const handleToolClick = async (tool: Tool) => {
    setGeneratedContent({ 
      isLoading: true, 
      data: null, 
      error: null, 
      currentTitle: tool.name,
      scenario: null,
      currentTool: tool,
      videos: []
    });
    setCurrentView('tools');
    setSidebarOpen(false);
    
    const [guide, scenario, videos] = await Promise.all([
      generateToolGuide(tool.name),
      generateExercise(tool.name),
      generateVideoResources(tool.name + " tutorial security")
    ]);

    setGeneratedContent({
      isLoading: false,
      data: guide,
      error: null,
      currentTitle: tool.name,
      scenario: scenario,
      currentTool: tool,
      videos: videos
    });
  };

  const handleCourseClick = async (course: CourseModule, topic?: string) => {
    const targetTopic = topic || course.topics[0];
    const title = `${course.title} : ${targetTopic}`;
    
    setGeneratedContent({ 
      isLoading: true, 
      data: null, 
      error: null, 
      currentTitle: title,
      scenario: null,
      videos: [],
      activeCourseId: course.id,
      activeTopic: targetTopic
    });
    setCurrentView('courses');
    
    const [content, videos] = await Promise.all([
      generateLesson(targetTopic, course.description),
      generateVideoResources(targetTopic + " course")
    ]);

    setGeneratedContent({
      isLoading: false,
      data: content,
      error: null,
      currentTitle: title,
      scenario: null,
      videos: videos,
      activeCourseId: course.id,
      activeTopic: targetTopic
    });
  };

  const closeActiveSession = () => {
    setGeneratedContent({
      isLoading: false,
      data: null,
      error: null,
      currentTitle: null,
      scenario: null,
      currentTool: undefined,
      videos: [],
      activeCourseId: undefined,
      activeTopic: undefined
    });
  };

  // --- View Routing Logic ---

  const renderMainContent = () => {
    if (generatedContent.isLoading) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-2 border-t-[#00f3ff] border-r-transparent border-b-[#00f3ff] border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-2 border-t-transparent border-r-[#00ff9d] border-b-transparent border-l-[#00ff9d] rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="text-slate-700 animate-pulse" size={32} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white font-mono tracking-widest animate-pulse">DECRYPTING_DATA...</h3>
          <div className="mt-4 font-mono text-xs text-[#00f3ff]/70 space-y-1 text-center w-64">
            <p className="typing-effect overflow-hidden whitespace-nowrap border-r border-[#00f3ff] animate-type">[+] Establish secure link...</p>
            <p className="typing-effect delay-100">[+] Handshake accepted.</p>
          </div>
        </div>
      );
    }

    // If content is generated (Guide/Exercise), show ActiveSession regardless of view
    if (generatedContent.data) {
      const isTopicCompleted = 
        generatedContent.activeCourseId && generatedContent.activeTopic 
        ? progress[generatedContent.activeCourseId]?.includes(generatedContent.activeTopic)
        : false;

      return (
        <ActiveSession 
          title={generatedContent.currentTitle || ''}
          content={generatedContent.data}
          tool={generatedContent.currentTool}
          scenario={generatedContent.scenario}
          videos={generatedContent.videos || []}
          onClose={closeActiveSession}
          // Progress Props
          isCompleted={isTopicCompleted}
          onComplete={() => {
            if (generatedContent.activeCourseId && generatedContent.activeTopic) {
              handleMarkComplete(generatedContent.activeCourseId, generatedContent.activeTopic);
            }
          }}
          showCompleteBtn={!!generatedContent.activeCourseId}
        />
      );
    }

    // Standard View Routing
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} onCourseSelect={handleCourseClick} />;
      case 'tools':
        return <ToolsLibrary onToolSelect={handleToolClick} />;
      case 'courses':
        return <CourseCatalog onCourseSelect={handleCourseClick} progress={progress} />;
      case 'tutor':
        return <CyberTutor />;
      default:
        return <Dashboard setCurrentView={setCurrentView} onCourseSelect={handleCourseClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200 flex overflow-hidden font-sans selection:bg-[#00f3ff] selection:text-black">
      
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        progress={progress}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-radial-gradient">
        
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Content Viewport */}
        <div className="flex-1 overflow-hidden p-4 md:p-8 relative">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none cyber-grid opacity-20 z-0"></div>

          <div className="relative z-10 h-full">
            {renderMainContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
