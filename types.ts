
export type ProjectSector = 'Healthcare' | 'Hospitality' | 'Workplace' | 'Multifamily' | 'Education';
export type ApplicationZone = 'Lobby' | 'Corridor' | 'Feature Wall' | 'Ceiling' | 'Facade';
export type ConstructionType = 'New Construction' | 'Renovation';
export type Environment = 'Interior' | 'Exterior';

export interface PerformancePriorities {
  cleanability: number;
  durability: number;
  impactResistance: number;
  fireSafety: number;
  maintenance: number;
  lighting: number;
}

export interface DesignState {
  patternFamily: string;
  scale: number;
  depth: number;
  orientation: 'Vertical' | 'Horizontal';
  density: number;
  backlighting: boolean;
}

export interface AIAData {
  learnerName: string;
  learnerEmail: string;
  aiaNumber: string;
  objectivesAcknowledged: boolean;
}

export interface StudioSession {
  currentAct: number;
  sector: ProjectSector;
  zone: ApplicationZone;
  constructionType: ConstructionType;
  environment: Environment;
  performance: PerformancePriorities;
  design: DesignState;
  quizPassed: boolean;
  startTime: number;
  engagementSeconds: number;
  actProgress: number[];
  aiaData: AIAData;
}

export interface User {
  id: string;
  name: string;
  email: string;
  aiaNumber: string;
  creditsEarned: number;
  hswCredits: number;
  completedCourses: string[];
  inProgressCourses: {
    id: string;
    progress: number;
    lastAccessed: number;
  }[];
}

export interface AIMessage {
  role: 'user' | 'model';
  text: string;
}

export enum ActID {
  PROJECT_CONTEXT = 1,
  PERFORMANCE_DECISION = 2,
  SURFACE_CUSTOMIZATION = 3,
  SYSTEM_CONSTRUCTABILITY = 4,
  DOCUMENTATION_SPEC = 5,
  KNOWLEDGE_CHECK = 6
}
