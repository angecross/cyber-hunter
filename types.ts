
export enum KaliCategory {
  INFO_GATHERING = "Information Gathering",
  VULN_ANALYSIS = "Vulnerability Analysis",
  WEB_APP = "Web Application Analysis",
  DATABASE = "Database Assessment",
  PASSWORD = "Password Attacks",
  WIRELESS = "Wireless Attacks",
  REVERSE_ENG = "Reverse Engineering",
  EXPLOITATION = "Exploitation Tools",
  SNIFFING = "Sniffing & Spoofing",
  POST_EXPLOITATION = "Post Exploitation",
  FORENSICS = "Forensics",
  REPORTING = "Reporting Tools",
  SOCIAL_ENG = "Social Engineering",
  STRESS_TESTING = "Stress Testing",
  HARDWARE = "Hardware & Architecture", // Renommé pour inclure l'architecture PC
  SYSTEM = "System Administration", // Pour Linux SysAdmin
  PROGRAMMING = "Programming & Scripting", // Nouvelle catégorie Python/Bash
  OTHER = "Autres Outils"
}

export interface Tool {
  name: string;
  category: KaliCategory;
  description: string;
  popular?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  description: string;
  topics: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isLoading?: boolean;
}

export interface ExerciseScenario {
  context: string;
  task: string;
  target: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ExerciseFeedback {
  correct: boolean;
  message: string;
  tips?: string;
}

export interface VideoResource {
  title: string;
  description: string;
  searchQuery: string;
  duration?: string;
}

export interface GeneratedContent {
  title: string;
  content: string; // Markdown format
  type: 'tool_guide' | 'course_lesson' | 'general_help';
  scenario?: ExerciseScenario;
}

// Nouveau type pour la progression
export interface UserProgress {
  [courseId: string]: string[]; // Liste des topics terminés par ID de cours
}
