export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  collegeName: string;
  degree: string;
  branch: string;
  currentYear: number;
  graduationYear: number;
  currentSkills: string[];
  preferredLanguage: string;
  careerInterest: string;
  currentLearningLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  dailyStudyHours: number;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  type: 'video' | 'documentation' | 'course' | 'github' | 'practice';
  isFree: boolean;
  platform: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  order: number;
  estimatedWeeks: number;
  description: string;
  skills: string[];
  resources: ResourceLink[];
  practiceExercises: string[];
  recommendedProjects: string[];
  certifications?: string[];
  interviewTopics: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  iconName: string;
  demandLevel: 'Very High' | 'High' | 'Moderate';
  avgSalaryIndia: string;
  avgSalaryGlobal: string;
  primarySkills: string[];
  milestones: RoadmapMilestone[];
}

export interface StudySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  category: 'College' | 'Self-Study' | 'Coding Practice' | 'Project Work' | 'Revision' | 'Break' | 'Placement Prep';
  completed: boolean;
  notes?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  category: 'Exam' | 'Coding' | 'Project' | 'Assignment' | 'General';
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'pending' | 'in-progress' | 'completed';
}

export interface ReminderNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'study' | 'exam' | 'deadline' | 'interview' | 'coding';
  read: boolean;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio?: string;
  };
  summary: string;
  targetRole: string;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    score: string;
  }>;
  experience: Array<{
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    bullets: string[];
  }>;
  projects: Array<{
    id: string;
    title: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    bullets: string[];
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
  };
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    credentialUrl?: string;
  }>;
}

export interface PlatformGuideItem {
  platformId: string;
  platformName: string;
  tagline: string;
  officialUrl: string;
  logoBadge: string;
  whyNeeded: string;
  primaryUse: string;
  accountCreationSteps: string[];
  profileSetupSteps: string[];
  infoToAdd: string[];
  projectsAndAchievementsToUpload: string[];
  maintenanceBestPractices: string[];
  commonMistakesToAvoid: string[];
  checklist: Array<{
    id: string;
    task: string;
    done: boolean;
  }>;
}

export interface MockQuestion {
  id: string;
  track: 'Technical' | 'HR' | 'Coding' | 'Aptitude';
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hints: string[];
}

export interface MockInterviewResult {
  questionId: string;
  questionText: string;
  studentAnswer: string;
  score: number;
  strengths: string[];
  missingAspects: string[];
  modelAnswer: string;
  actionableTips: string[];
  date: string;
}

export interface JobListing {
  id: string;
  companyName: string;
  companyLogo: string;
  roleTitle: string;
  location: string;
  type: 'Internship' | 'Full-time' | 'Apprenticeship';
  stipendOrSalary: string;
  batchEligible: string[];
  deadline: string;
  skillsRequired: string[];
  applyUrl: string;
  preparationGuide: string;
  status?: 'Saved' | 'Applied' | 'Assessment' | 'Interview' | 'Selected' | 'Rejected';
  interviewDate?: string;
  notes?: string;
}

export interface DailyCodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  problemStatement: string;
  exampleInput: string;
  exampleOutput: string;
  hints: string[];
  practiceUrl: string;
  solutionSnippet: string;
  completed: boolean;
}

export interface ScholarshipItem {
  id: string;
  title: string;
  provider: string;
  awardAmount: string;
  eligibility: string;
  deadline: string;
  officialUrl: string;
  category: 'Merit' | 'Women in Tech' | 'Financial Need' | 'Higher Education';
}
