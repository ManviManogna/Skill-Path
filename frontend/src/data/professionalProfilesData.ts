import { PlatformGuideItem } from '../types';

export const PROFESSIONAL_PLATFORMS_DATA: PlatformGuideItem[] = [
  {
    platformId: 'linkedin',
    platformName: 'LinkedIn',
    tagline: 'The #1 Professional Network for Tech Recruiters, Alumni & Jobs',
    officialUrl: 'https://www.linkedin.com',
    logoBadge: '👔',
    whyNeeded: 'Over 85% of tech recruiters source entry-level software engineers directly through LinkedIn searches and alumni networks.',
    primaryUse: 'Building your professional network, connecting with company recruiters, showcasing recommendations, and discovering off-campus referral opportunities.',
    accountCreationSteps: [
      'Visit linkedin.com and sign up with your primary personal email (accessible after graduation).',
      'Use your real legal name that matches your college ID and resume.',
      'Verify your student status with your official university email domain if available.'
    ],
    profileSetupSteps: [
      'Upload a professional, well-lit headshot photo with a neutral background.',
      'Add a custom banner highlighting your tech domain (e.g., "Aspiring Full Stack Engineer | React | Python").',
      'Craft a punchy headline: Avoid just "Student at XYZ College". Use: "CS Undergrad | Aspiring SDE | Building Scalable Web Apps | C++ & React".',
      'Fill in the "About" section in first person with your background, college passion, key projects, and tech stack.'
    ],
    infoToAdd: [
      'Education: Degree, branch, CGPA (if >= 7.5), relevant coursework (DSA, OS, DBMS).',
      'Skills: Add 15+ relevant technical skills and take LinkedIn skill assessments.',
      'Experience: Include internships, student club technical leads, and freelance work with quantifiable impact.',
      'Honors & Awards: Hackathons won, coding contest ranks, and merit scholarships.'
    ],
    projectsAndAchievementsToUpload: [
      'Add your top 2-3 GitHub projects as "Featured" items with attractive thumbnail previews and live links.',
      'Upload certificates from accredited platforms (freeCodeCamp, Harvard CS50, AWS).',
      'Share posts when completing major milestones, hackathons, or open-source pull requests.'
    ],
    maintenanceBestPractices: [
      'Post once a week about a problem you solved, a project update, or learning insights.',
      'Send personalized connection requests to alumni working at your dream companies.',
      'Congratulate peers on their milestones and engage with engineering articles.'
    ],
    commonMistakesToAvoid: [
      'Leaving the headline default ("Student at ...").',
      'Having no profile picture or using a casual party selfie.',
      'Mass-messaging recruiters with generic "Please refer me" without sharing a tailored resume and portfolio link.',
      'Leaving your profile in private mode.'
    ],
    checklist: [
      { id: 'li-1', task: 'Professional headshot & domain banner uploaded', done: false },
      { id: 'li-2', task: 'Compelling headline with target role and skills set', done: false },
      { id: 'li-3', task: 'Personalized "About" summary with tech stack written', done: false },
      { id: 'li-4', task: 'Education, CGPA, and coursework added', done: false },
      { id: 'li-5', task: 'Top 3 projects added to Featured section with live demo URLs', done: false },
      { id: 'li-6', task: 'Connected with at least 50 college seniors and alumni', done: false }
    ]
  },
  {
    platformId: 'github',
    platformName: 'GitHub',
    tagline: 'Your Living Developer Portfolio & Code Proof-of-Work',
    officialUrl: 'https://github.com',
    logoBadge: '🐙',
    whyNeeded: 'Recruiters and hiring managers review GitHub profiles to verify you write clean code, use Git version control, and build real applications.',
    primaryUse: 'Hosting your open-source projects, collaborating on code, demonstrating commit consistency, and building your public developer portfolio.',
    accountCreationSteps: [
      'Sign up at github.com using a professional username (e.g., firstname-lastname or firstname-dev).',
      'Enable Two-Factor Authentication (2FA) for security.',
      'Claim the GitHub Student Developer Pack to access hundreds of dollars in free developer tools.'
    ],
    profileSetupSteps: [
      'Create a special repository named after your username to create a custom profile README.',
      'Use GitHub Profile Markdown generator to display your tech stack icons, GitHub streak stats, and latest projects.',
      'Set your public display name, location, and link your LinkedIn profile and personal portfolio.'
    ],
    infoToAdd: [
      'Profile bio: 1-sentence description of what you build.',
      'Social links: Twitter/X tech profile, LinkedIn, and email address.',
      'Pinned repositories: Pin your top 4-6 highest quality projects with descriptions and topics.'
    ],
    projectsAndAchievementsToUpload: [
      'Every project must have a professional README with: Overview, Architecture diagram, Tech stack badges, Setup instructions, and Screenshots.',
      'Add live deployment links (Vercel, Render, GitHub Pages) in the repository metadata.',
      'Include a proper LICENSE file (MIT) and a clean .gitignore so node_modules / .env are not committed.'
    ],
    maintenanceBestPractices: [
      'Commit regularly to maintain a green contribution graph.',
      'Write meaningful Git commit messages ("feat: implement JWT auth middleware" instead of "update code").',
      'Contribute to open-source repositories by fixing documentation or small good-first-issues.'
    ],
    commonMistakesToAvoid: [
      'Uploading complete repositories in a single commit ("initial commit") with no history.',
      'Committing sensitive API keys, passwords, or .env files to public repositories.',
      'Leaving repositories without a README or screenshots.',
      'Having 30 forked repositories with zero personal code pinned.'
    ],
    checklist: [
      { id: 'gh-1', task: 'Created professional username and enabled 2FA', done: false },
      { id: 'gh-2', task: 'Created username/username repository with personalized profile README', done: false },
      { id: 'gh-3', task: 'Pinned top 4 full projects with live demo URLs', done: false },
      { id: 'gh-4', task: 'All pinned projects have comprehensive README with screenshots', done: false },
      { id: 'gh-5', task: 'Verified no secrets/API keys or node_modules are tracked', done: false },
      { id: 'gh-6', task: 'Maintained active weekly commit streak for 30+ days', done: false }
    ]
  },
  {
    platformId: 'leetcode',
    platformName: 'LeetCode',
    tagline: 'The Gold Standard for Tech Placement Coding & DSA Rounds',
    officialUrl: 'https://leetcode.com',
    logoBadge: '⚡',
    whyNeeded: 'Almost 90% of product-based tech companies (Google, Amazon, Microsoft, top startups) use LeetCode-style questions in their initial coding assessments.',
    primaryUse: 'Practicing Data Structures and Algorithms, participating in weekly coding contests, and preparing for technical coding interviews.',
    accountCreationSteps: [
      'Create an account at leetcode.com with your professional email.',
      'Select your preferred interview coding language (C++, Java, or Python).'
    ],
    profileSetupSteps: [
      'Set your username and link your GitHub profile.',
      'Set target goals: Minimum 150-200 problems solved before placement season.'
    ],
    infoToAdd: [
      'Contest rating (once you achieve >= 1600+ Knight status).',
      'Study plans completed (LeetCode 75, Top Interview 150).'
    ],
    projectsAndAchievementsToUpload: [
      'Share your LeetCode progress link on your resume and LinkedIn profile.',
      'Earn badges for monthly challenge completions and contest participation.'
    ],
    maintenanceBestPractices: [
      'Solve the Daily LeetCode Problem to maintain consistency and earn streak coins.',
      'Follow curated lists: NeetCode 150 or Striver A2Z DSA sheet rather than random problems.',
      'Take notes on novel problem patterns (Two Pointers, Sliding Window, Monotonic Stack).'
    ],
    commonMistakesToAvoid: [
      'Memorizing solutions without understanding the underlying algorithmic pattern.',
      'Looking at the solution within 5 minutes of attempting—give at least 25 minutes of genuine effort.',
      'Only solving Easy problems; placement rounds heavily test LeetCode Mediums.'
    ],
    checklist: [
      { id: 'lc-1', task: 'Created account and set default coding language', done: false },
      { id: 'lc-2', task: 'Solved at least 30 LeetCode Easy fundamentals', done: false },
      { id: 'lc-3', task: 'Solved at least 50 LeetCode Medium problems across top patterns', done: false },
      { id: 'lc-4', task: 'Participated in at least 2 Sunday morning weekly contests', done: false },
      { id: 'lc-5', task: 'Completed the "LeetCode 75" curated study plan', done: false }
    ]
  },
  {
    platformId: 'hackerrank',
    platformName: 'HackerRank',
    tagline: 'Best for Beginners, Skill Certifications & On-Campus Assessments',
    officialUrl: 'https://www.hackerrank.com',
    logoBadge: '🟢',
    whyNeeded: 'Many Indian IT services and campus recruitment drives (TCS, Infosys, Wipro, Cognizant, DXC) host their official hiring assessments directly on HackerRank.',
    primaryUse: 'Building syntax fluency from zero, earning official free skill certificates, and taking mock technical assessments.',
    accountCreationSteps: [
      'Sign up at hackerrank.com and choose "I\'m here to practice and prepare for job interviews".',
      'Confirm your email and set up your student profile.'
    ],
    profileSetupSteps: [
      'Complete the tutorial track for your primary language (C++, Java, or Python).',
      'Earn 5-Star or 6-Star Gold Badges in Problem Solving and your primary language.'
    ],
    infoToAdd: [
      'Add badges to your profile.',
      'Take HackerRank Skill Certifications (Problem Solving Basic, Python Basic, SQL Intermediate).'
    ],
    projectsAndAchievementsToUpload: [
      'Download and link your verified HackerRank Skill Certificate URLs on your resume.'
    ],
    maintenanceBestPractices: [
      'Complete 1-2 SQL queries and algorithmic challenges weekly.',
      'Use the Interview Preparation Kit (1 Week, 1 Month preparation tracks).'
    ],
    commonMistakesToAvoid: [
      'Stopping after earning basic stars without tackling the Problem Solving (Intermediate) track.',
      'Ignoring the SQL and Linux bash tracks which are heavily asked in service-based company drives.'
    ],
    checklist: [
      { id: 'hr-1', task: 'Earned 5-Star Gold Badge in Problem Solving', done: false },
      { id: 'hr-2', task: 'Earned 5-Star Gold Badge in C++, Java, or Python', done: false },
      { id: 'hr-3', task: 'Earned HackerRank Verified Certificate in SQL (Intermediate)', done: false },
      { id: 'hr-4', task: 'Completed the 1-Month Interview Preparation Kit', done: false }
    ]
  },
  {
    platformId: 'hackerearth',
    platformName: 'HackerEarth',
    tagline: 'Hackathons, National Coding Challenges & Hiring Contests',
    officialUrl: 'https://www.hackerearth.com',
    logoBadge: '🌍',
    whyNeeded: 'Hundreds of mid-to-large tier tech companies conduct monthly hiring challenges and campus hackathons exclusively on HackerEarth.',
    primaryUse: 'Participating in national level student coding challenges, enterprise hiring challenges, and competitive programming.',
    accountCreationSteps: [
      'Sign up at hackerearth.com with your student email.',
      'Complete your developer profile with your graduation year and college.'
    ],
    profileSetupSteps: [
      'Fill out your work preference and target roles.',
      'Practice in the Practice Tracks for Data Structures and Math.'
    ],
    infoToAdd: [
      'Coding contest percentiles and hackathon finalist certificates.'
    ],
    projectsAndAchievementsToUpload: [
      'Submit projects during online collegiate hackathons.',
      'Link your profile on your resume.'
    ],
    maintenanceBestPractices: [
      'Check the "Challenges" tab monthly for active hiring challenges open to freshers.',
      'Compete in the monthly "Circuits" long-form coding challenges.'
    ],
    commonMistakesToAvoid: [
      'Missing challenge deadlines—set calendar reminders.',
      'Submitting incomplete hackathon prototypes without video demos.'
    ],
    checklist: [
      { id: 'he-1', task: 'Completed profile and registered for first hiring challenge', done: false },
      { id: 'he-2', task: 'Solved at least 25 problems in the DS practice track', done: false },
      { id: 'he-3', task: 'Participated in a college or national level online hackathon', done: false }
    ]
  },
  {
    platformId: 'kaggle',
    platformName: 'Kaggle',
    tagline: 'Essential Portfolio Platform for AI, ML & Data Science',
    officialUrl: 'https://www.kaggle.com',
    logoBadge: '📊',
    whyNeeded: 'If your career goal is Data Analyst, Data Scientist, or AI/ML Engineer, Kaggle notebooks and competition rankings carry the highest industry credibility.',
    primaryUse: 'Building public EDA notebooks, competing in data science competitions, and demonstrating end-to-end ML modeling skills.',
    accountCreationSteps: [
      'Sign up at kaggle.com with your Google account.',
      'Verify phone number to unlock GPU/TPU compute credits.'
    ],
    profileSetupSteps: [
      'Complete the Kaggle Learn micro-courses (Python, Pandas, Machine Learning).',
      'Upload a professional bio emphasizing your passion for data and modeling.'
    ],
    infoToAdd: [
      'Kaggle Notebooks Expert or Competitions tier status.',
      'Datasets published with high usability scores.'
    ],
    projectsAndAchievementsToUpload: [
      'Create 2-3 public Jupyter notebooks with clear markdown explanations, data visualizations, and model evaluations.',
      'Compete in "Getting Started" competitions (Titanic, Spaceship Titanic, Housing Prices).'
    ],
    maintenanceBestPractices: [
      'Keep code well-commented and explain the "why" behind every feature engineering decision.',
      'Upvote and discuss approaches in competition forums.'
    ],
    commonMistakesToAvoid: [
      'Copy-pasting public notebooks without making unique contributions or novel feature engineering.',
      'Leaving notebooks without markdown text explaining insights.'
    ],
    checklist: [
      { id: 'kg-1', task: 'Completed Kaggle Learn courses for Python & Intro to ML', done: false },
      { id: 'kg-2', task: 'Submitted predictions to Titanic & House Prices competitions', done: false },
      { id: 'kg-3', task: 'Published a high-quality exploratory data analysis (EDA) notebook with visualizations', done: false },
      { id: 'kg-4', task: 'Achieved Kaggle Contributor or Expert tier', done: false }
    ]
  },
  {
    platformId: 'internshala',
    platformName: 'Internshala',
    tagline: 'India\'s #1 Portal for College Internships & Early Career Work',
    officialUrl: 'https://internshala.com',
    logoBadge: '🎓',
    whyNeeded: 'Most second and third-year college students land their first paid virtual or in-office internships through Internshala.',
    primaryUse: 'Applying for internships across Software Development, Web Development, Data Science, and UI/UX Design.',
    accountCreationSteps: [
      'Sign up at internshala.com using your student email.',
      'Select student mode and complete your college details.'
    ],
    profileSetupSteps: [
      'Fill in 100% of the Internshala in-platform resume builder (education, skills, projects, and links).',
      'Verify phone number and email for fast application updates.'
    ],
    infoToAdd: [
      'Link your GitHub and LinkedIn in the links section.',
      'Write short 2-3 line descriptions for all college projects.'
    ],
    projectsAndAchievementsToUpload: [
      'Upload certificates and link live portfolio sites.'
    ],
    maintenanceBestPractices: [
      'Write tailored "Why should you be hired?" answers for each application—never copy-paste generic text!',
      'Apply during early morning hours when applications open to appear at the top of the employer queue.'
    ],
    commonMistakesToAvoid: [
      'Applying for internships requiring 8 hours/day when you have full-time college attendance—look for part-time/flexible roles.',
      'Paying any company that asks for "training fees" or "security deposits"—legitimate internships are always free or paid.'
    ],
    checklist: [
      { id: 'is-1', task: 'Completed 100% of Internshala resume sections', done: false },
      { id: 'is-2', task: 'Added verified skills, GitHub link, and project details', done: false },
      { id: 'is-3', task: 'Crafted a customized "Why should you be hired" template', done: false },
      { id: 'is-4', task: 'Applied to 5 relevant verified internships with stipends', done: false }
    ]
  },
  {
    platformId: 'naukri',
    platformName: 'Naukri.com',
    tagline: 'Leading Job Portal for Off-Campus Fresher Hiring in India',
    officialUrl: 'https://www.naukri.com',
    logoBadge: '🏢',
    whyNeeded: 'Virtually all major IT recruiters, staffing firms, and enterprises use Naukri Resdex database to filter candidate resumes for off-campus drives.',
    primaryUse: 'Setting up job alerts, getting discovered by HR recruiters through resume parsing, and applying for entry-level tech roles.',
    accountCreationSteps: [
      'Sign up at naukri.com as a "Fresher" using your permanent email address.',
      'Upload your freshly crafted ATS-friendly PDF resume.'
    ],
    profileSetupSteps: [
      'Ensure profile completeness score reaches 100%.',
      'Add key skills matching job keywords: e.g., "Python, Java, Spring Boot, React, SQL, Problem Solving".',
      'Fill in the "Resume Headline" with your core competencies and graduation year.'
    ],
    infoToAdd: [
      'College name, degree, graduation year, and overall percentage/CGPA.',
      'Preferred job locations (e.g., Bengaluru, Hyderabad, Pune, Remote).'
    ],
    projectsAndAchievementsToUpload: [
      'Keep your uploaded resume PDF updated every semester with new projects.'
    ],
    maintenanceBestPractices: [
      'Update your profile or re-upload your resume at least once every 15 days—this refreshes your "last active" timestamp and puts you on top of recruiter searches.',
      'Set specific alerts for "Fresher Software Engineer" and "SDE Intern".'
    ],
    commonMistakesToAvoid: [
      'Leaving the profile at 40-50% completion (recruiters filter out incomplete profiles).',
      'Uploading an outdated resume with first-year details.',
      'Falling for fraudulent recruitment consultancy calls asking for interview scheduling fees.'
    ],
    checklist: [
      { id: 'nk-1', task: 'Created account and uploaded ATS-optimized PDF resume', done: false },
      { id: 'nk-2', task: 'Reached 100% profile completeness score', done: false },
      { id: 'nk-3', task: 'Set targeted job alerts for freshers (2025/2026/2027 batch)', done: false },
      { id: 'nk-4', task: 'Enabled recruiter search visibility and verified contact info', done: false }
    ]
  }
];
