import { CareerPath } from '../types';

export const CAREER_PATHS_DATA: CareerPath[] = [
  {
    id: 'software-developer',
    title: 'Software Developer',
    description: 'Master core CS fundamentals, algorithms, clean code architecture, and software engineering design patterns for top tech placements.',
    iconName: 'Code2',
    demandLevel: 'Very High',
    avgSalaryIndia: '₹8 - 24 LPA',
    avgSalaryGlobal: '$95,000 - $145,000',
    primarySkills: ['Python', 'C++', 'Data Structures & Algorithms', 'System Design', 'Git', 'SQL', 'OS & Networks'],
    milestones: [
      {
        id: 'sd-m1',
        title: 'Programming Foundations & Logic Building',
        order: 1,
        estimatedWeeks: 4,
        description: 'Choose a primary language (C++ or Java for placements, or Python) and master syntax, memory models, and standard libraries.',
        skills: ['Variables & Types', 'Loops & Conditionals', 'Functions & Recursion', 'Pointers / References', 'Standard Library / STL / Collections'],
        resources: [
          { title: "CS50x: Introduction to Computer Science", url: "https://cs50.harvard.edu/x/", type: "course", isFree: true, platform: "Harvard University" },
          { title: "C++ STL Tutorial Series", url: "https://www.youtube.com/watch?v=0bK_Qnpq46U", type: "video", isFree: true, platform: "YouTube" },
          { title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/", type: "documentation", isFree: true, platform: "Python.org" }
        ],
        practiceExercises: [
          'Implement basic math algorithms (GCD, Prime Sieve, Matrix Multiplication)',
          'Solve 25 Easy logic puzzles on HackerRank'
        ],
        recommendedProjects: ['CLI Student Grade Management System', 'Text-Based RPG Game'],
        certifications: ['CS50x Certificate of Completion (Free)'],
        interviewTopics: ['Pass by value vs Pass by reference', 'Stack vs Heap memory', 'Complexity of STL operations']
      },
      {
        id: 'sd-m2',
        title: 'Data Structures & Algorithms (Core DSA)',
        order: 2,
        estimatedWeeks: 8,
        description: 'The foundation of tech interviews. Master linear data structures, trees, graphs, and dynamic programming.',
        skills: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & BSTs', 'Hashing', 'Graphs (BFS/DFS)', 'Dynamic Programming'],
        resources: [
          { title: "NeetCode 150 Roadmap", url: "https://neetcode.io/roadmap", type: "practice", isFree: true, platform: "NeetCode" },
          { title: "Striver's SDE Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", type: "practice", isFree: true, platform: "TakeUForward" },
          { title: "MIT 6.006 Introduction to Algorithms", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/", type: "course", isFree: true, platform: "MIT OCW" }
        ],
        practiceExercises: [
          'Solve 50 LeetCode Easy & 50 LeetCode Medium problems',
          'Implement Binary Search, Merge Sort, and Quick Sort from scratch',
          'Solve Graph Traversal (DFS/BFS) on grid problems'
        ],
        recommendedProjects: ['Pathfinding Visualizer (Dijkstra / A*)', 'Custom Memory Cache using LRU (Hash + Doubly Linked List)'],
        certifications: ['HackerRank Problem Solving Intermediate (Free)'],
        interviewTopics: ['Time and Space Complexity Analysis', 'Recursion Tree and Master Theorem', 'Cycle Detection in Graphs']
      },
      {
        id: 'sd-m3',
        title: 'Core Computer Science Subjects',
        order: 3,
        estimatedWeeks: 4,
        description: 'Key university subjects tested in every campus placement technical interview.',
        skills: ['Object-Oriented Programming (OOP)', 'DBMS & SQL', 'Operating Systems', 'Computer Networks'],
        resources: [
          { title: "Gate Smashers OS & DBMS Playlist", url: "https://www.youtube.com/@GateSmashers", type: "video", isFree: true, platform: "YouTube" },
          { title: "SQLZoo Interactive SQL Tutorial", url: "https://sqlzoo.net/", type: "practice", isFree: true, platform: "SQLZoo" }
        ],
        practiceExercises: [
          'Write complex SQL queries (Joins, Group By, Subqueries, Indexing)',
          'Simulate Process Scheduling algorithms in code (Round Robin, FCFS)'
        ],
        recommendedProjects: ['Mini Relational Database Engine or In-Memory Key-Value Store'],
        interviewTopics: ['ACID Properties & Transactions', 'Deadlocks & Banker Algorithm', 'TCP 3-Way Handshake vs UDP', 'OOP 4 Pillars & SOLID Principles']
      },
      {
        id: 'sd-m4',
        title: 'System Design & Real-World Engineering',
        order: 4,
        estimatedWeeks: 6,
        description: 'Learn how modern software scales: APIs, microservices, databases, caching, and CI/CD.',
        skills: ['RESTful APIs', 'Database Indexing & Sharding', 'Redis Caching', 'Docker Basics', 'Git Workflows', 'CI/CD Pipelines'],
        resources: [
          { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "github", isFree: true, platform: "GitHub" },
          { title: "ByteByteGo YouTube Channel", url: "https://www.youtube.com/@ByteByteGo", type: "video", isFree: true, platform: "YouTube" }
        ],
        practiceExercises: [
          'Design URL Shortener (Bitly)',
          'Design Rate Limiter using Token Bucket algorithm',
          'Deploy an API with Docker on Render/Railway'
        ],
        recommendedProjects: ['Distributed Task Scheduler with Redis Queue', 'Collaborative Real-time Document Editor'],
        certifications: ['GitHub Foundations Certification'],
        interviewTopics: ['Horizontal vs Vertical Scaling', 'Cap Theorem', 'Consistent Hashing', 'Load Balancing Algorithms']
      }
    ]
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Web Developer',
    description: 'Build end-to-end web applications with modern frontend frameworks, backend servers, databases, and cloud deployments.',
    iconName: 'Layers',
    demandLevel: 'Very High',
    avgSalaryIndia: '₹7 - 20 LPA',
    avgSalaryGlobal: '$90,000 - $140,000',
    primarySkills: ['HTML/CSS', 'JavaScript/TypeScript', 'React.js', 'Node.js / Express', 'FastAPI', 'PostgreSQL / MongoDB', 'Git & CI/CD'],
    milestones: [
      {
        id: 'fs-m1',
        title: 'Web Fundamentals & Modern JavaScript',
        order: 1,
        estimatedWeeks: 4,
        description: 'Semantic HTML5, CSS3 flexbox/grid, and ES6+ JavaScript async programming.',
        skills: ['Semantic HTML', 'CSS Flexbox & Grid', 'Responsive Design', 'DOM Manipulation', 'ES6+ (Promises, Async/Await, Destructuring)'],
        resources: [
          { title: "The Odin Project: Foundations", url: "https://www.theodinproject.com/", type: "course", isFree: true, platform: "The Odin Project" },
          { title: "JavaScript.info", url: "https://javascript.info/", type: "documentation", isFree: true, platform: "JavaScript.info" }
        ],
        practiceExercises: ['Build a Responsive Landing Page', 'Build a Weather App with OpenWeatherMap API'],
        recommendedProjects: ['Interactive Kanban Board', 'Expense Tracker with LocalStorage'],
        interviewTopics: ['Event Loop & Microtask Queue', 'Closures & Prototypal Inheritance', 'CSS Specificity & Box Model']
      },
      {
        id: 'fs-m2',
        title: 'Modern Frontend with React & TypeScript',
        order: 2,
        estimatedWeeks: 6,
        description: 'Component architecture, state management, custom hooks, and Tailwind styling.',
        skills: ['React 18/19', 'TypeScript', 'Tailwind CSS', 'State Management (Zustand / Redux)', 'React Router', 'API Integration'],
        resources: [
          { title: "React Official Docs (react.dev)", url: "https://react.dev/", type: "documentation", isFree: true, platform: "React Team" },
          { title: "freeCodeCamp Front End Development", url: "https://www.freecodecamp.org/learn/front-end-development-libraries/", type: "course", isFree: true, platform: "freeCodeCamp" }
        ],
        practiceExercises: ['Convert Vanilla JS project to React + TypeScript', 'Implement infinite scrolling list with pagination'],
        recommendedProjects: ['E-Commerce Storefront with Shopping Cart', 'Social Media Dashboard with Dark Mode'],
        certifications: ['freeCodeCamp Front End Libraries (Free)'],
        interviewTopics: ['React Virtual DOM & Reconciliation', 'useEffect dependency pitfalls', 'Controlled vs Uncontrolled Components']
      },
      {
        id: 'fs-m3',
        title: 'Backend Engineering & REST APIs',
        order: 3,
        estimatedWeeks: 6,
        description: 'Server development with Node.js/Express or Python FastAPI, auth (JWT, OAuth), and SQL databases.',
        skills: ['Node.js / FastAPI', 'REST API Architecture', 'JWT Authentication', 'PostgreSQL / Supabase', 'Prisma / SQLAlchemy ORM'],
        resources: [
          { title: "FastAPI Official Tutorial", url: "https://fastapi.tiangolo.com/tutorial/", type: "documentation", isFree: true, platform: "FastAPI" },
          { title: "Full Stack Open (University of Helsinki)", url: "https://fullstackopen.com/en/", type: "course", isFree: true, platform: "Univ of Helsinki" }
        ],
        practiceExercises: ['Build a Secure JWT Auth Service with Password Hashing', 'Write Database Migrations and Relations'],
        recommendedProjects: ['Role-Based Project Management API', 'Real-time Chat App with WebSockets'],
        certifications: ['PostgreSQL Associate (Coursera)'],
        interviewTopics: ['Stateless JWT vs Session cookies', 'SQL Injection & OWASP Top 10 Security', 'N+1 Query Problem']
      },
      {
        id: 'fs-m4',
        title: 'DevOps, Testing & Deployment',
        order: 4,
        estimatedWeeks: 4,
        description: 'Package apps with Docker, write automated tests, and deploy to Vercel/Render/AWS.',
        skills: ['Docker', 'GitHub Actions', 'Jest / Vitest', 'Deployment (Vercel, AWS EC2/S3)', 'Web Performance & SEO'],
        resources: [
          { title: "Docker Curriculum", url: "https://docker-curriculum.com/", type: "documentation", isFree: true, platform: "Docker Community" }
        ],
        practiceExercises: ['Containerize a React + FastAPI app with docker-compose', 'Set up GitHub Actions CI pipeline'],
        recommendedProjects: ['SaaS Subscription Platform with Stripe Integration'],
        certifications: ['AWS Certified Cloud Practitioner'],
        interviewTopics: ['CORS mechanism & preflight requests', 'Server-Side Rendering (SSR) vs CSR', 'WebSockets vs SSE']
      }
    ]
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI / Machine Learning Engineer',
    description: 'Develop intelligent models, neural networks, computer vision, NLP applications, and LLM-powered systems.',
    iconName: 'Cpu',
    demandLevel: 'Very High',
    avgSalaryIndia: '₹9 - 28 LPA',
    avgSalaryGlobal: '$110,000 - $170,000',
    primarySkills: ['Python', 'NumPy & Pandas', 'Scikit-Learn', 'PyTorch', 'Computer Vision / NLP', 'LangChain / LLMs', 'FastAPI'],
    milestones: [
      {
        id: 'ai-m1',
        title: 'Math Foundations & Python for Data Science',
        order: 1,
        estimatedWeeks: 4,
        description: 'Linear Algebra, Calculus, Probability, Statistics, and Python scientific libraries.',
        skills: ['Linear Algebra (Vectors, Matrices, Eigenvalues)', 'Probability & Statistics', 'NumPy Arrays', 'Pandas DataFrames', 'Matplotlib & Seaborn'],
        resources: [
          { title: "3Blue1Brown: Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", type: "video", isFree: true, platform: "YouTube" },
          { title: "Kaggle Python & Pandas Micro-Courses", url: "https://www.kaggle.com/learn", type: "practice", isFree: true, platform: "Kaggle" }
        ],
        practiceExercises: ['Perform Exploratory Data Analysis (EDA) on Titanic dataset', 'Vectorized matrix operations without loops'],
        recommendedProjects: ['Housing Price Prediction with Feature Engineering'],
        interviewTopics: ['Mean vs Median in skewed distributions', 'Eigenvectors in PCA', 'Matrix Inversion & SVD']
      },
      {
        id: 'ai-m2',
        title: 'Classical Machine Learning',
        order: 2,
        estimatedWeeks: 6,
        description: 'Supervised and unsupervised algorithms, model evaluation, cross-validation, and hyperparameter tuning.',
        skills: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'XGBoost & Gradient Boosting', 'K-Means Clustering', 'Evaluation Metrics (Precision, Recall, F1, ROC-AUC)'],
        resources: [
          { title: "Andrew Ng's Machine Learning Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction", type: "course", isFree: true, platform: "Coursera / DeepLearning.AI" },
          { title: "Scikit-Learn Documentation", url: "https://scikit-learn.org/stable/", type: "documentation", isFree: true, platform: "Scikit-Learn" }
        ],
        practiceExercises: ['Compete in Kaggle Titanic and House Prices competitions', 'Implement Gradient Descent from scratch'],
        recommendedProjects: ['Credit Card Fraud Detection with Imbalanced Data', 'Customer Churn Predictor with Streamlit UI'],
        interviewTopics: ['Bias-Variance Tradeoff', 'Overfitting vs Underfitting prevention', 'Regularization (L1 Lasso vs L2 Ridge)']
      },
      {
        id: 'ai-m3',
        title: 'Deep Learning & Neural Networks',
        order: 3,
        estimatedWeeks: 8,
        description: 'Build neural networks using PyTorch, convolutional networks (CNNs), and transformers.',
        skills: ['Backpropagation & Loss Functions', 'PyTorch Tensors & Models', 'CNNs for Image Classification', 'RNNs & LSTMs', 'Transformers Architecture'],
        resources: [
          { title: "Fast.ai Practical Deep Learning for Coders", url: "https://course.fast.ai/", type: "course", isFree: true, platform: "Fast.ai" },
          { title: "Andrej Karpathy: Neural Networks Zero to Hero", url: "https://www.youtube.com/playlist?list=SLaOHP1uJq8j3N87W54mDkGgH3hL9F0u5j", type: "video", isFree: true, platform: "YouTube" }
        ],
        practiceExercises: ['Train CNN on CIFAR-10 achieving >85% accuracy', 'Fine-tune a HuggingFace Transformer on sentiment analysis'],
        recommendedProjects: ['Medical X-Ray Pneumonia Classifier', 'Custom Chatbot with RAG & Vector Embeddings'],
        interviewTopics: ['Vanishing Gradient Problem & ReLU', 'Attention Mechanism in Transformers', 'Batch Normalization vs Layer Normalization']
      },
      {
        id: 'ai-m4',
        title: 'Generative AI, LLMs & MLOps',
        order: 4,
        estimatedWeeks: 6,
        description: 'Deploy models into production, build RAG pipelines, and use Gemini/OpenAI APIs.',
        skills: ['Retrieval Augmented Generation (RAG)', 'LangChain / LlamaIndex', 'Vector Databases (Chroma/Pinecone)', 'Model Deployment with FastAPI', 'MLflow & Docker'],
        resources: [
          { title: "Hugging Face Deep Learning & NLP Course", url: "https://huggingface.co/learn", type: "course", isFree: true, platform: "HuggingFace" }
        ],
        practiceExercises: ['Build a RAG Question-Answering system over college lecture notes', 'Deploy model container on cloud'],
        recommendedProjects: ['AI Research Paper Summarizer & Voice Assistant'],
        certifications: ['DeepLearning.AI Generative AI for Everyone'],
        interviewTopics: ['Tokenization & Context Windows', 'Quantization (4-bit, 8-bit)', 'RAG vs Fine-Tuning trade-offs']
      }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Turn raw business data into actionable insights through SQL queries, statistical analysis, Excel, and interactive BI dashboards.',
    iconName: 'BarChart3',
    demandLevel: 'High',
    avgSalaryIndia: '₹6 - 15 LPA',
    avgSalaryGlobal: '$75,000 - $115,000',
    primarySkills: ['Advanced SQL', 'Excel & Power Query', 'Tableau / Power BI', 'Python for Analysis', 'Statistics & Hypothesis Testing'],
    milestones: [
      {
        id: 'da-m1',
        title: 'Spreadsheets & Advanced Excel',
        order: 1,
        estimatedWeeks: 3,
        description: 'Formulas, VLOOKUP, XLOOKUP, Pivot Tables, and automated macros.',
        skills: ['XLOOKUP & INDEX/MATCH', 'Pivot Tables & Slicers', 'Data Cleaning & Power Query', 'Conditional Formatting'],
        resources: [
          { title: "Excel Exposure Free Course", url: "https://excelexposure.com/", type: "course", isFree: true, platform: "Excel Exposure" }
        ],
        practiceExercises: ['Clean messy retail dataset', 'Build financial KPI dashboard'],
        recommendedProjects: ['Sales Performance Executive Dashboard in Excel'],
        interviewTopics: ['VLOOKUP vs XLOOKUP limitations', 'Handling null values in pivots']
      },
      {
        id: 'da-m2',
        title: 'Mastering SQL for Data Analytics',
        order: 2,
        estimatedWeeks: 5,
        description: 'Complex queries, Window Functions, CTEs, and cohort analysis.',
        skills: ['Window Functions (ROW_NUMBER, RANK, DENSE_RANK)', 'Common Table Expressions (CTEs)', 'Aggregations & Grouping', 'Date & Time manipulation'],
        resources: [
          { title: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "documentation", isFree: true, platform: "Mode" }
        ],
        practiceExercises: ['Solve 50 SQL queries on LeetCode Database section', 'Calculate Month-over-Month retention rate'],
        recommendedProjects: ['E-Commerce Customer Retention & Cohort Analysis SQL Script'],
        interviewTopics: ['DENSE_RANK vs RANK', 'Inner vs Left vs Cross Join', 'WHERE vs HAVING clause order of execution']
      },
      {
        id: 'da-m3',
        title: 'Business Intelligence & Visualization',
        order: 3,
        estimatedWeeks: 4,
        description: 'Design intuitive, interactive dashboards in Power BI or Tableau.',
        skills: ['Power BI / Tableau', 'DAX Formulas', 'Data Modeling (Star & Snowflake Schema)', 'Storytelling with Data'],
        resources: [
          { title: "Microsoft Power BI Guided Learning", url: "https://learn.microsoft.com/en-us/power-bi/", type: "documentation", isFree: true, platform: "Microsoft" }
        ],
        practiceExercises: ['Build multi-page interactive dashboard with drill-downs'],
        recommendedProjects: ['Global Supply Chain & Logistics Dashboard (Tableau Public)'],
        certifications: ['Microsoft Certified: Power BI Data Analyst (PL-300)'],
        interviewTopics: ['Star schema vs Snowflake schema', 'Calculated columns vs Measures in DAX']
      }
    ]
  },
  {
    id: 'cybersecurity-engineer',
    title: 'Cybersecurity Engineer',
    description: 'Protect networks, systems, and applications from vulnerabilities, penetration tests, and security breaches.',
    iconName: 'ShieldAlert',
    demandLevel: 'High',
    avgSalaryIndia: '₹8 - 22 LPA',
    avgSalaryGlobal: '$100,000 - $155,000',
    primarySkills: ['Network Security', 'Linux Command Line', 'Penetration Testing', 'Wireshark', 'Burp Suite', 'Cryptography', 'OWASP Top 10'],
    milestones: [
      {
        id: 'cs-m1',
        title: 'Networking & Linux Security Fundamentals',
        order: 1,
        estimatedWeeks: 4,
        description: 'Understand TCP/IP, DNS, firewalls, and command line mastery.',
        skills: ['Linux CLI & Permissions', 'Network Protocols (TCP, UDP, ICMP, DNS)', 'Port Scanning with Nmap', 'Packet Analysis with Wireshark'],
        resources: [
          { title: "OverTheWire: Bandit Wargames", url: "https://overthewire.org/wargames/bandit/", type: "practice", isFree: true, platform: "OverTheWire" },
          { title: "Professor Messer CompTIA Network+ Course", url: "https://www.professormesser.com/", type: "video", isFree: true, platform: "Professor Messer" }
        ],
        practiceExercises: ['Complete Bandit levels 1-25', 'Capture and inspect HTTP/DNS traffic in Wireshark'],
        recommendedProjects: ['Automated Network Vulnerability Port Scanner in Python'],
        interviewTopics: ['Subnetting and CIDR notation', 'Symmetric vs Asymmetric encryption', 'SYN Flood attack prevention']
      },
      {
        id: 'cs-m2',
        title: 'Web Application Security & OWASP Top 10',
        order: 2,
        estimatedWeeks: 6,
        description: 'Identify and mitigate vulnerabilities like SQL Injection, XSS, and CSRF.',
        skills: ['SQL Injection', 'Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF)', 'Burp Suite Proxy', 'Secure Authentication'],
        resources: [
          { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", type: "practice", isFree: true, platform: "PortSwigger" },
          { title: "TryHackMe Pre-Security Path", url: "https://tryhackme.com/", type: "course", isFree: true, platform: "TryHackMe" }
        ],
        practiceExercises: ['Solve 20 PortSwigger labs (SQLi, XSS, SSRF)', 'Complete 5 TryHackMe beginner rooms'],
        recommendedProjects: ['Vulnerable Web App Demonstration & Mitigation Report'],
        certifications: ['CompTIA Security+', 'Certified Ethical Hacker (CEH)'],
        interviewTopics: ['Stored vs Reflected XSS', 'Same-Origin Policy (SOP)', 'Diffie-Hellman Key Exchange']
      }
    ]
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer / DevOps',
    description: 'Design, provision, and maintain resilient cloud infrastructure, microservices, and automated delivery pipelines on AWS/Azure/GCP.',
    iconName: 'Cloud',
    demandLevel: 'Very High',
    avgSalaryIndia: '₹8 - 25 LPA',
    avgSalaryGlobal: '$105,000 - $160,000',
    primarySkills: ['AWS / Azure', 'Linux', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD (GitHub Actions)', 'Monitoring (Prometheus/Grafana)'],
    milestones: [
      {
        id: 'cl-m1',
        title: 'Cloud Foundations & Core AWS Services',
        order: 1,
        estimatedWeeks: 5,
        description: 'Virtual servers, VPC networking, storage buckets, and IAM access management.',
        skills: ['AWS EC2, S3, RDS, Lambda', 'IAM Policies & Roles', 'VPC, Subnets & Security Groups', 'Route 53 & CloudFront'],
        resources: [
          { title: "AWS Skill Builder Free Tier Courses", url: "https://explore.skillbuilder.aws/", type: "course", isFree: true, platform: "AWS" },
          { title: "FreeCodeCamp AWS Certified Cloud Practitioner Guide", url: "https://www.youtube.com/watch?v=SOTamWNgDKc", type: "video", isFree: true, platform: "YouTube" }
        ],
        practiceExercises: ['Host a static website on AWS S3 with CloudFront SSL', 'Deploy a Node.js server on an EC2 instance behind an ALB'],
        recommendedProjects: ['Serverless Thumbnail Generator with AWS Lambda and S3 Trigger'],
        certifications: ['AWS Certified Solutions Architect Associate'],
        interviewTopics: ['Public vs Private subnets & NAT Gateways', 'S3 storage tiers', 'Horizontal Pod Autoscaling']
      },
      {
        id: 'cl-m2',
        title: 'Containers & Infrastructure as Code (IaC)',
        order: 2,
        estimatedWeeks: 6,
        description: 'Automate infrastructure provisioning with Terraform and orchestrate containers with Kubernetes.',
        skills: ['Docker Multi-stage Builds', 'Kubernetes Deployments & Services', 'Terraform Modules & State', 'Helm Charts'],
        resources: [
          { title: "Learn Kubernetes with TechWorld with Nana", url: "https://www.youtube.com/watch?v=X48VuDVv0do", type: "video", isFree: true, platform: "YouTube" }
        ],
        practiceExercises: ['Deploy a multi-tier guestbook on Minikube', 'Write Terraform code to provision an AWS VPC and RDS instance'],
        recommendedProjects: ['End-to-End GitOps CI/CD with ArgoCD and Kubernetes'],
        interviewTopics: ['State management in Terraform', 'Kubernetes Pod lifecycle & Ingress controllers']
      }
    ]
  },
  {
    id: 'ui-ux-designer',
    title: 'UI / UX Designer',
    description: 'Craft intuitive user interfaces, design systems, wireframes, user journeys, and interactive prototypes in Figma.',
    iconName: 'Palette',
    demandLevel: 'High',
    avgSalaryIndia: '₹6 - 18 LPA',
    avgSalaryGlobal: '$80,000 - $130,000',
    primarySkills: ['Figma Mastery', 'User Research & Personas', 'Wireframing & Prototyping', 'Design Systems & Tokens', 'Usability Testing', 'Information Architecture'],
    milestones: [
      {
        id: 'ui-m1',
        title: 'Design Principles & Figma Fundamentals',
        order: 1,
        estimatedWeeks: 4,
        description: 'Typography, color theory, layout grids, visual hierarchy, and Auto-Layout in Figma.',
        skills: ['Visual Hierarchy & Spacing', 'Color Contrast & Accessibility (WCAG)', 'Typography Pairings', 'Figma Auto-Layout & Components'],
        resources: [
          { title: "Figma Official YouTube Tutorials", url: "https://www.youtube.com/@Figma", type: "video", isFree: true, platform: "Figma" },
          { title: "Google UX Design Professional Certificate", url: "https://grow.google/certificates/ux-design/", type: "course", isFree: true, platform: "Google / Coursera" }
        ],
        practiceExercises: ['Clone 3 popular mobile app screens with pixel perfection', 'Build a responsive component set with variants'],
        recommendedProjects: ['Campus Cafeteria Food Ordering Mobile App Design System'],
        interviewTopics: ['Fitts Law and Hick Law', 'WCAG AA vs AAA contrast standards', 'Atomic Design Methodology']
      },
      {
        id: 'ui-m2',
        title: 'UX Research & Interactive Prototyping',
        order: 2,
        estimatedWeeks: 5,
        description: 'Conduct user interviews, create empathy maps, build interactive animated prototypes, and run usability tests.',
        skills: ['User Journey Mapping', 'Information Architecture', 'Smart Animate Prototyping', 'Usability Testing & Feedback Synthesis'],
        resources: [
          { title: "Nielsen Norman Group UX Articles", url: "https://www.nngroup.com/articles/", type: "documentation", isFree: true, platform: "NN/g" }
        ],
        practiceExercises: ['Conduct 5 user interviews on a college student problem', 'Create a complete clickable interactive prototype'],
        recommendedProjects: ['Complete End-to-End Case Study: College Placement Portal UI/UX'],
        certifications: ['Google UX Design Certificate'],
        interviewTopics: ['Quantitative vs Qualitative user testing', 'How to handle conflicting stakeholder feedback']
      }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Apply statistical methods, predictive modeling, machine learning, and deep data exploration to solve complex business problems.',
    iconName: 'PieChart',
    demandLevel: 'Very High',
    avgSalaryIndia: '₹9 - 26 LPA',
    avgSalaryGlobal: '$105,000 - $165,000',
    primarySkills: ['Python & R', 'Advanced Statistics', 'Machine Learning Models', 'Feature Engineering', 'Big Data (Spark)', 'Data Storytelling'],
    milestones: [
      {
        id: 'ds-m1',
        title: 'Exploratory Analysis & Advanced Statistics',
        order: 1,
        estimatedWeeks: 5,
        description: 'Hypothesis testing, A/B testing design, ANOVA, and data wrangling.',
        skills: ['Hypothesis Testing (t-tests, Chi-square)', 'A/B Testing Frameworks', 'Pandas & Polars Data Wrangling', 'Probability Distributions'],
        resources: [
          { title: "Khan Academy Statistics and Probability", url: "https://www.khanacademy.org/math/statistics-probability", type: "course", isFree: true, platform: "Khan Academy" }
        ],
        practiceExercises: ['Design and evaluate an A/B test for e-commerce checkout', 'Detect outliers and normalize skewed distributions'],
        recommendedProjects: ['Real Estate Valuation and Market Trend Statistical Model'],
        interviewTopics: ['P-value interpretation & Type I vs Type II errors', 'Central Limit Theorem']
      },
      {
        id: 'ds-m2',
        title: 'Predictive Modeling & Big Data',
        order: 2,
        estimatedWeeks: 6,
        description: 'End-to-end model development, cross-validation, feature importance, and Apache Spark.',
        skills: ['Ensemble Methods (Random Forest, LightGBM)', 'Feature Selection & Dimensionality Reduction (PCA)', 'Apache Spark / PySpark', 'Model Interpretability (SHAP & LIME)'],
        resources: [
          { title: "Kaggle Competitions & Notebooks", url: "https://www.kaggle.com/competitions", type: "practice", isFree: true, platform: "Kaggle" }
        ],
        practiceExercises: ['Achieve Top 20% ranking in a Kaggle Tabular Playground competition', 'Run distributed queries in PySpark'],
        recommendedProjects: ['Customer Lifetime Value (LTV) & Churn Prediction System'],
        certifications: ['IBM Data Science Professional Certificate'],
        interviewTopics: ['SHAP values explanation', 'Dealing with high-cardinality categorical features']
      }
    ]
  }
];
