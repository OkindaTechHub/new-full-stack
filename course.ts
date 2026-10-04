export interface LearningObjective {
  id: string;
  text: string;
}

export interface ConceptItem {
  name: string;
  description: string;
  comparison?: {
    itemA: string;
    itemB: string;
    distinction: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  diagram?: string;
}

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
  explanation?: string;
  runnable?: boolean;
}

export interface PracticalExercise {
  title: string;
  objective: string;
  requirements: string[];
  steps: string[];
  expectedResult: string;
  challengeExtension?: string;
  starterCode?: string;
  solutionCode?: string;
}

export interface CommonMistake {
  mistake: string;
  whyItHappens: string;
  badCode?: string;
  goodCode?: string;
  howToFix: string;
}

export interface KnowledgeCheckQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'code-analysis';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ResourceLink {
  name: string;
  description: string;
  url: string;
  usefulFor: string;
  category?: 'official' | 'docs' | 'specification' | 'tool';
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  durationMinutes: number;
  learningObjectives: string[];
  introduction: string;
  detailedNotes: string;
  concepts: ConceptItem[];
  codeExamples: CodeSnippet[];
  realWorldExample: {
    scenario: string;
    industryApplication: string;
    takeaway: string;
  };
  practicalExercise: PracticalExercise;
  commonMistakes: CommonMistake[];
  knowledgeCheck: KnowledgeCheckQuestion[];
  summary: string[];
  additionalResources: ResourceLink[];
}

export interface PracticalLab {
  id: string;
  title: string;
  durationMinutes: number;
  objective: string;
  prerequisites: string[];
  stepByStepGuide: {
    stepNumber: number;
    title: string;
    instructions: string;
    code?: string;
    notes?: string;
  }[];
  verificationChecklist: string[];
  deliverables: string[];
}

export interface ModuleProject {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Beginner → Intermediate' | 'Intermediate' | 'Intermediate → Advanced' | 'Advanced' | 'Capstone';
  estimatedHours: number;
  overview: string;
  architectureDiagram?: string;
  requirements: string[];
  milestones: {
    milestone: number;
    title: string;
    tasks: string[];
  }[];
  starterCodeStructure: {
    path: string;
    description: string;
    sampleContent?: string;
  }[];
  acceptanceCriteria: string[];
  rubric: {
    criteria: string;
    points: number;
    description: string;
  }[];
}

export interface ModuleQuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ModuleAssignment {
  id: string;
  title: string;
  problemStatement: string;
  specifications: string[];
  deliverables: string[];
  evaluationRubric: {
    category: string;
    weight: string;
    description: string;
  }[];
  submissionFormat: string;
}

export interface Module {
  id: string;
  moduleNumber: number;
  title: string;
  slug: string;
  durationWeeks: string;
  level: 'Beginner' | 'Beginner → Intermediate' | 'Intermediate' | 'Intermediate → Advanced' | 'Advanced';
  phase: 'Phase 1: Web Foundations' | 'Phase 2: Modern Frontend' | 'Phase 3: Full-Stack & APIs' | 'Phase 4: Production & Scale';
  overview: {
    whatItTeaches: string;
    whyItMatters: string;
    prerequisites: string[];
    estimatedHours: number;
    skillsAcquired: string[];
  };
  lessons: Lesson[];
  practicalLabs: PracticalLab[];
  moduleProject: ModuleProject;
  quiz: ModuleQuizQuestion[];
  assignment: ModuleAssignment;
  resources: ResourceLink[];
  summary: string;
}

export interface CourseOverview {
  title: string;
  subtitle: string;
  duration: string;
  difficulty: string;
  totalModules: number;
  totalProjects: number;
  description: string;
  stack: {
    category: string;
    technologies: string[];
  }[];
  learningOutcomes: string[];
  curriculumPhases: {
    phase: string;
    weeks: string;
    description: string;
    modules: number[];
  }[];
}
