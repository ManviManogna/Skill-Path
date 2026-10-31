export interface ProjectGuide {
  id: string;
  title: string;
  domain: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  technologies: string[];
  featuresToBuild: string[];
  implementationSteps: string[];
  expectedOutput: string;
  githubPublishingTips: string[];
}

export interface VerifiedCertification {
  id: string;
  title: string;
  issuer: string;
  isFree: boolean;
  cost: string;
  officialUrl: string;
  domain: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  badgeUrl: string;
  keySkills: string[];
}

export const VERIFIED_CERTIFICATIONS: VerifiedCertification[] = [
  {
    id: 'cert-1',
    title: 'CS50x: Introduction to Computer Science',
    issuer: 'Harvard University',
    isFree: true,
    cost: '100% Free Certificate',
    officialUrl: 'https://cs50.harvard.edu/x/',
    domain: 'Computer Science',
    difficulty: 'Beginner',
    duration: '10-12 weeks',
    badgeUrl: '🎓',
    keySkills: ['C', 'Python', 'SQL', 'Algorithms', 'Memory Management']
  },
  {
    id: 'cert-2',
    title: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services',
    isFree: false,
    cost: '$100 (~₹8,300) / Free preparation',
    officialUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    domain: 'Cloud Computing',
    difficulty: 'Beginner',
    duration: '4-6 weeks',
    badgeUrl: '☁️',
    keySkills: ['AWS Cloud', 'Security & Compliance', 'EC2 & S3', 'Pricing Models']
  },
  {
    id: 'cert-3',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta / Coursera',
    isFree: false,
    cost: 'Free Audit / Financial Aid available',
    officialUrl: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
    domain: 'Full Stack',
    difficulty: 'Intermediate',
    duration: '7 months (flexible)',
    badgeUrl: '🌐',
    keySkills: ['React.js', 'JavaScript', 'HTML/CSS', 'UI/UX Basics', 'Version Control']
  },
  {
    id: 'cert-4',
    title: 'freeCodeCamp Full Stack Developer Certification',
    issuer: 'freeCodeCamp.org',
    isFree: true,
    cost: '100% Free & Open Source',
    officialUrl: 'https://www.freecodecamp.org/learn/',
    domain: 'Full Stack',
    difficulty: 'Beginner',
    duration: '300 hours self-paced',
    badgeUrl: '🔥',
    keySkills: ['Responsive Web Design', 'JavaScript Algorithms', 'Front End Libraries', 'Back End & APIs']
  },
  {
    id: 'cert-5',
    title: 'Google Cloud Associate Cloud Engineer',
    issuer: 'Google Cloud',
    isFree: false,
    cost: '$125 / Student discounts via Google Cloud Innovators',
    officialUrl: 'https://cloud.google.com/learn/certification/cloud-engineer',
    domain: 'Cloud Computing',
    difficulty: 'Intermediate',
    duration: '6-8 weeks',
    badgeUrl: '🛡️',
    keySkills: ['Google Cloud Platform', 'GKE Kubernetes', 'IAM', 'Cloud Storage']
  },
  {
    id: 'cert-6',
    title: 'DeepLearning.AI Machine Learning Specialization',
    issuer: 'DeepLearning.AI & Stanford Online',
    isFree: false,
    cost: 'Free Audit / Coursera Financial Aid Available',
    officialUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
    domain: 'AI / ML',
    difficulty: 'Intermediate',
    duration: '3 months',
    badgeUrl: '🧠',
    keySkills: ['Supervised Learning', 'Neural Networks', 'Decision Trees', 'Unsupervised Learning']
  },
  {
    id: 'cert-7',
    title: 'HackerRank Problem Solving (Intermediate) Certificate',
    issuer: 'HackerRank',
    isFree: true,
    cost: '100% Free Online Assessment',
    officialUrl: 'https://www.hackerrank.com/skills-verification',
    domain: 'Data Structures & Algorithms',
    difficulty: 'Intermediate',
    duration: '90-minute assessment',
    badgeUrl: '⚡',
    keySkills: ['Data Structures', 'Algorithmic Efficiency', 'Problem Solving']
  },
  {
    id: 'cert-8',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    isFree: false,
    cost: 'Free Audit / Financial Aid available',
    officialUrl: 'https://grow.google/certificates/ux-design/',
    domain: 'UI/UX',
    difficulty: 'Beginner',
    duration: '6 months',
    badgeUrl: '🎨',
    keySkills: ['Figma', 'Wireframing', 'User Research', 'Usability Testing', 'Prototypes']
  }
];

export const CURATED_PROJECTS: ProjectGuide[] = [
  {
    id: 'proj-1',
    title: 'Campus Placement & Alumni Referral Network',
    domain: 'Full Stack',
    level: 'Advanced',
    description: 'A complete role-based web portal connecting college seniors and alumni for job referrals, mock interview bookings, and resume reviews.',
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'FastAPI / Node.js', 'PostgreSQL / Supabase', 'WebSockets'],
    featuresToBuild: [
      'Authentication with role management (Student, Alumnus, Admin).',
      'Referral board where alumni post verified internal openings.',
      '1-on-1 slot scheduling calendar for mock interviews.',
      'Real-time peer chat with message read receipts.',
      'Automated email notifications when referral requests are accepted.'
    ],
    implementationSteps: [
      'Design relational schema (users, referral_posts, applications, interview_slots).',
      'Implement JWT token auth and profile setup endpoints.',
      'Build frontend dashboard with responsive filterable tables.',
      'Integrate Supabase real-time channels or WebSocket server for instant notifications.',
      'Deploy frontend on Vercel and backend on Render with PostgreSQL.'
    ],
    expectedOutput: 'A responsive, deployed full-stack platform with test credentials, interactive tables, and live demo capability.',
    githubPublishingTips: [
      'Include a clear system architecture diagram (use Mermaid or Excalidraw).',
      'Provide `.env.example` and step-by-step local setup with Docker compose.',
      'Add a video demo GIF at the top of the README.'
    ]
  },
  {
    id: 'proj-2',
    title: 'AI Resume Analyzer & ATS Score Simulator',
    domain: 'AI / ML',
    level: 'Intermediate',
    description: 'An AI-driven application that extracts text from student PDF resumes, matches them against target job descriptions, and calculates missing competencies.',
    technologies: ['Python', 'FastAPI', 'Gemini API', 'PyPDF2 / pdfplumber', 'React.js', 'Tailwind CSS'],
    featuresToBuild: [
      'Drag-and-drop PDF resume upload with client-side preview.',
      'Keyword extraction and semantic matching against job requirements.',
      'Interactive radar chart displaying match percentage across categories.',
      'AI-generated suggestions on phrasing bullet points with action verbs.'
    ],
    implementationSteps: [
      'Create PDF text extraction pipeline in Python using pdfplumber.',
      'Build keyword tokenizer comparing against common tech dictionaries.',
      'Call Gemini API prompt for qualitative feedback and bullet enhancement.',
      'Connect to a sleek React dashboard with animated score meters.'
    ],
    expectedOutput: 'Interactive web app that parses real resumes in <3 seconds and returns an actionable report.',
    githubPublishingTips: [
      'Do not commit test resumes with sensitive real contact info.',
      'Add sample test PDFs in a `sample_resumes/` folder for recruiters to test instantly.'
    ]
  },
  {
    id: 'proj-3',
    title: 'Pathfinding & Algorithm Visualizer',
    domain: 'Software Developer',
    level: 'Beginner',
    description: 'An interactive web app that visualizes classic graph traversal and pathfinding algorithms on an editable 2D grid.',
    technologies: ['TypeScript', 'React.js / Canvas', 'Tailwind CSS'],
    featuresToBuild: [
      'Interactive grid where users can draw obstacles and set start/end nodes.',
      'Step-by-step animation for Dijkstra\'s Algorithm, A* Search, BFS, and DFS.',
      'Speed slider (fast, normal, slow) and real-time step counter.',
      'Maze generation algorithm (Recursive Division or Kruskal\'s).'
    ],
    implementationSteps: [
      'Represent the grid as a 2D matrix of node state objects.',
      'Implement BFS and Dijkstra with a priority queue data structure.',
      'Use async timeouts or requestAnimationFrame to animate visited and shortest path nodes.',
      'Implement maze generation algorithms.'
    ],
    expectedOutput: 'A smooth 60fps algorithm visualizer hosted on GitHub Pages or Vercel.',
    githubPublishingTips: [
      'Explain the algorithmic time and space complexity of each algorithm in the README.',
      'Include mobile touch interaction support.'
    ]
  },
  {
    id: 'proj-4',
    title: 'Serverless Real-Time Code Execution Engine',
    domain: 'Cloud Engineer',
    level: 'Advanced',
    description: 'A sandbox microservice that accepts Python/C++/JavaScript code snippets and executes them securely inside isolated Docker containers.',
    technologies: ['Docker', 'AWS Lambda / ECS', 'Node.js / Go', 'Redis', 'RabbitMQ'],
    featuresToBuild: [
      'Sandboxed execution environment with restricted CPU, memory, and networking.',
      'Execution timeout watchdog to prevent infinite loops (e.g., 5 seconds cap).',
      'Async message queue for handling peak concurrent execution requests.',
      'Output capturing for stdout, stderr, execution time, and memory usage.'
    ],
    implementationSteps: [
      'Set up Docker isolation flags (--memory, --cpus, --network none).',
      'Create worker daemon consuming execution tasks from Redis queue.',
      'Implement security filters to prevent privilege escalation or fork bombs.',
      'Expose REST endpoint for frontend code playgrounds.'
    ],
    expectedOutput: 'Secure backend microservice processing code runs in sub-second latency.',
    githubPublishingTips: [
      'Detail the security containment threat model and sandbox isolation in the documentation.',
      'Provide performance benchmarks (executions per second).'
    ]
  },
  {
    id: 'proj-5',
    title: 'Interactive Personal Finance & Expense Tracker',
    domain: 'Full Stack',
    level: 'Beginner',
    description: 'A clean, modern financial tracking dashboard with expense categorization, monthly budgets, and chart analytics.',
    technologies: ['React.js', 'Recharts', 'Tailwind CSS', 'LocalStorage / Supabase'],
    featuresToBuild: [
      'Add, edit, and delete transactions with tags (Food, Tech, Tuition, Rent).',
      'Monthly spending limit with warning indicators when approaching 80%.',
      'Interactive pie and bar charts showing spending trends over time.',
      'CSV export of monthly transactions.'
    ],
    implementationSteps: [
      'Design clean UI with modal dialogs for transaction entry.',
      'Implement category aggregation math and date filters.',
      'Render responsive Recharts graphs with custom tooltips.',
      'Persist data in localStorage or Supabase database.'
    ],
    expectedOutput: 'A snappy, visually appealing budgeting app that solves everyday college student spending tracking.',
    githubPublishingTips: [
      'Include a 1-click live demo link.',
      'Ensure 100% Lighthouse accessibility score.'
    ]
  }
];
