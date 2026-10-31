import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Map,
  Bot,
  Calendar,
  FileCheck2,
  Mic2,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  ShieldCheck,
  TrendingUp,
  Award,
  Terminal,
  Code2,
  Cpu,
  Layers,
  GraduationCap
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CAREER_PATHS_DATA } from '../data/careerRoadmapsData';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  isAuthenticated: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenAuth,
  isAuthenticated
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    {
      icon: Bot,
      title: 'AI Student Mentor',
      badge: 'Gemini AI',
      desc: 'Get personalized, 24/7 technical guidance tailored to your academic year, current skill level, and college placement goals.'
    },
    {
      icon: Map,
      title: 'Interactive Career Roadmaps',
      badge: '8 Tracks',
      desc: 'Step-by-step milestones for SDE, AI/ML, Full Stack, and Cloud with curated free resources, coding exercises, and portfolio projects.'
    },
    {
      icon: Calendar,
      title: 'AI Study Timetable & Pomodoro',
      badge: 'Productivity',
      desc: 'Generate balanced schedules for college hours, self-study, and DSA practice with built-in 25-minute Pomodoro focus timers.'
    },
    {
      icon: FileCheck2,
      title: 'AI Resume Builder & ATS Checker',
      badge: 'Placement Ready',
      desc: 'Build tech resumes with professional templates and scan them against real job descriptions to calculate ATS match percentages.'
    },
    {
      icon: Mic2,
      title: 'AI Mock Interview Simulator',
      badge: 'Instant Feedback',
      desc: 'Practice Technical, HR, and Aptitude questions with instant score evaluations, model ideal answers, and communication tips.'
    },
    {
      icon: Award,
      title: 'Job Readiness Score',
      badge: 'Unique Metric',
      desc: 'Evaluate your placement preparedness across 6 pillars: skills coverage, projects, resume quality, profiles, and coding consistency.'
    }
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Profile & Skill Assessment',
      desc: 'Tell us your college year, branch, known technologies, and target career path in 60 seconds.'
    },
    {
      step: '02',
      title: 'Generate Personalized Roadmap',
      desc: 'Receive a structured, week-by-week curriculum with free tutorials, coding exercises, and milestone checklists.'
    },
    {
      step: '03',
      title: 'Build Portfolio & Master DSA',
      desc: 'Work on capstone projects with GitHub publishing guidance and solve daily LeetCode coding challenges.'
    },
    {
      step: '04',
      title: 'Crack Interviews & Land Offers',
      desc: 'Optimize your resume for ATS parsers, run AI mock interviews, and apply for verified internship and job openings.'
    }
  ];

  const whyChooseUs = [
    {
      title: 'College Curriculum Gaps',
      traditional: 'Theoretical exams with outdated syllabus and minimal industry exposure.',
      skillpath: 'Real-world tech stacks (FastAPI, React, Docker, PyTorch) tested in actual company interviews.'
    },
    {
      title: 'Generic Video Courses',
      traditional: 'Passive video bingeing with zero proof-of-work or accountability.',
      skillpath: 'Interactive milestone checklists, hands-on GitHub projects, and weekly progress analytics.'
    },
    {
      title: 'Resume & Placement Prep',
      traditional: 'Sending generic resumes that get rejected by automated ATS filters in seconds.',
      skillpath: 'AI ATS keyword matcher, STAR method behavioral training, and verified company guides.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Narayanan',
      role: 'B.Tech CSE, 3rd Year (Placed at Tier-1 Product Firm)',
      quote: 'The AI Resume ATS checker helped me identify missing keywords for Amazon SDE intern applications. Combined with the 8-week DSA roadmap, my confidence in coding rounds skyrocketed!',
      badge: 'Verified Student Sample'
    },
    {
      name: 'Rohan Deshmukh',
      role: 'B.Tech IT, 4th Year (Associate Cloud Engineer)',
      quote: 'I had no idea how to structure my AWS preparation alongside college semesters. The AI Timetable Generator and Pomodoro blocks kept me consistent without burning out.',
      badge: 'Verified Student Sample'
    },
    {
      name: 'Sneha Patel',
      role: 'MCA 2nd Year (Full Stack Developer Trainee)',
      quote: 'The GitHub and LinkedIn setup guides were a game changer. Recruiters started reaching out to me for off-campus interviews because of my pinned projects and active streak!',
      badge: 'Verified Student Sample'
    }
  ];

  const faqs = [
    {
      q: 'Is SkillPath AI free for college students?',
      a: 'Yes! SkillPath AI is completely free to explore. All roadmap learning resources are curated from top accredited free resources (Harvard CS50, freeCodeCamp, MIT OCW, and official documentation).'
    },
    {
      q: 'How does the AI Student Mentor give personalized answers?',
      a: 'The mentor takes into account your academic year (e.g. 2nd vs 4th year), current skill set, target career path, and preferred coding language to generate tailored, actionable advice without overwhelming you with theory.'
    },
    {
      q: 'What is the Job Readiness Score and how is it calculated?',
      a: 'The Job Readiness Score is a dynamic 0-100% preparation metric calculated across 5 key pillars: Technical Skills Coverage, Projects Portfolio, Resume ATS Quality, Professional Profiles Setup, and DSA Coding Practice. It serves as a diagnostic learning tool, not an employment guarantee.'
    },
    {
      q: 'Will SkillPath AI ever ask for my external platform passwords?',
      a: 'Never. SkillPath AI provides educational setup guides, profile best practices, and interactive checklists. We will never ask you to input your passwords or credentials for LinkedIn, GitHub, LeetCode, or any other platform.'
    },
    {
      q: 'Can I export my generated resume as a PDF?',
      a: 'Yes! The Resume Builder includes multiple ATS-friendly templates and allows 1-click clean PDF printing or downloading.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#202B38] font-sans">
      <Navbar
        onNavigate={onNavigate}
        currentPage="landing"
        onOpenAuth={onOpenAuth}
        isAuthenticated={isAuthenticated}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#142D4E] to-[#1E3A5F] text-white">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#168C8C]/15 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-[#168C8C]/20 border border-[#168C8C]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2DD4BF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Career Intelligence for College Students</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Your Journey from Student to <span className="text-[#168C8C] bg-gradient-to-r from-[#20B2AA] to-[#168C8C] bg-clip-text text-transparent">Job-Ready</span> Starts Here.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover the right skills, create personalized learning plans, prepare for placements, and achieve your career goals with your AI-powered student mentor.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                  onClick={() => (isAuthenticated ? onNavigate('dashboard') : onOpenAuth('signup'))}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#168C8C] hover:bg-[#127272] text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-[#168C8C]/30 transition-all hover:scale-[1.02] text-base"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('features');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-7 py-3.5 rounded-xl transition-all text-base"
                >
                  <span>Explore Features</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">8+ Tracks</p>
                  <p className="text-xs text-slate-300">SDE, AI/ML, Cloud, Web</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">100% Free</p>
                  <p className="text-xs text-slate-300">Curated Learning Resources</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">ATS-Ready</p>
                  <p className="text-xs text-slate-300">Resume & Mock Interviews</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Platform Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 text-[#202B38] space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold text-[#334E68] pl-2 font-mono">SkillPath AI Simulator</span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#E6F7F7] text-[#168C8C] px-2 py-0.5 rounded-full">
                    LIVE PREVIEW
                  </span>
                </div>

                {/* Simulated Student Profile Bar */}
                <div className="bg-[#F7F9FC] p-3.5 rounded-xl border border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#142D4E] text-white flex items-center justify-center font-bold text-sm">
                      AS
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#142D4E]">Aarav Sharma</p>
                      <p className="text-[11px] text-[#718096]">3rd Year CS • Aspiring SDE</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#168C8C]">82% Job Ready</p>
                    <span className="text-[10px] text-emerald-600 font-medium">Top 15% Rank</span>
                  </div>
                </div>

                {/* Simulated AI Prompt & Response */}
                <div className="space-y-3">
                  <div className="bg-slate-100 p-3 rounded-lg text-xs text-[#334E68] font-medium flex items-start space-x-2">
                    <span className="text-[#168C8C] font-bold">Q:</span>
                    <span>"Which projects should I build for Amazon SDE campus placements?"</span>
                  </div>
                  <div className="bg-[#E6F7F7] p-3.5 rounded-lg text-xs text-[#142D4E] border border-[#168C8C]/20 space-y-2">
                    <div className="flex items-center space-x-1.5 font-bold text-[#168C8C]">
                      <Bot className="w-3.5 h-3.5" />
                      <span>SkillPath AI Mentor</span>
                    </div>
                    <p className="text-[11px] text-[#202B38] leading-relaxed">
                      "For product company drives, build a **Distributed Task Scheduler with Redis queue** and a **Role-Based Collaboration Web Portal**. Avoid basic calculators—recruiters want to see database concurrency and live deployment!"
                    </p>
                  </div>
                </div>

                {/* Quick Interactive Tool Links */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onNavigate('roadmaps')}
                    className="p-2.5 rounded-lg border border-[#E2E8F0] hover:border-[#168C8C] hover:bg-slate-50 text-left transition-colors flex items-center space-x-2"
                  >
                    <Map className="w-4 h-4 text-[#168C8C]" />
                    <span className="text-xs font-semibold text-[#142D4E]">Career Roadmaps</span>
                  </button>
                  <button
                    onClick={() => onNavigate('resume-builder')}
                    className="p-2.5 rounded-lg border border-[#E2E8F0] hover:border-[#168C8C] hover:bg-slate-50 text-left transition-colors flex items-center space-x-2"
                  >
                    <FileCheck2 className="w-4 h-4 text-[#168C8C]" />
                    <span className="text-xs font-semibold text-[#142D4E]">ATS Checker</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#168C8C] mb-2">Platform Capabilities</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#142D4E] tracking-tight">
              Everything You Need to Go from Classroom to Corporate
            </h3>
            <p className="text-sm sm:text-base text-[#718096] mt-3">
              SkillPath AI bridges the massive gap between traditional college curriculum and what modern tech employers actually test for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F9FC] rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#168C8C] hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#168C8C] group-hover:bg-[#168C8C] group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold bg-[#E6F7F7] text-[#168C8C] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {feat.badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#142D4E] mb-2">{feat.title}</h4>
                    <p className="text-xs sm:text-sm text-[#718096] leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="text-xs font-semibold text-[#168C8C] hover:text-[#127272] flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore this tool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Career Paths Section */}
      <section id="career-paths" className="py-20 bg-[#F7F9FC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#168C8C] mb-2">Curated Career Paths</h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142D4E]">
                High-Growth Technology Domains
              </h3>
              <p className="text-xs sm:text-sm text-[#718096] mt-1">
                Explore in-demand industry tracks with realistic compensation insights and roadmaps.
              </p>
            </div>
            <button
              onClick={() => onNavigate('roadmaps')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-semibold text-[#168C8C] hover:underline"
            >
              <span>View all 8 interactive roadmaps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAREER_PATHS_DATA.slice(0, 4).map((cp) => (
              <div
                key={cp.id}
                className="bg-white rounded-2xl p-5 border border-[#E2E8F0] hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                      Demand: {cp.demandLevel}
                    </span>
                    <span className="text-xs font-bold text-[#142D4E]">{cp.avgSalaryIndia}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#142D4E] mb-1.5">{cp.title}</h4>
                  <p className="text-xs text-[#718096] line-clamp-3 mb-4 leading-relaxed">{cp.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cp.primarySkills.slice(0, 4).map((sk, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-[#334E68] font-medium px-2 py-0.5 rounded">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('roadmaps')}
                  className="w-full text-center py-2 bg-[#F7F9FC] hover:bg-[#E6F7F7] text-xs font-semibold text-[#168C8C] rounded-lg transition-colors border border-[#E2E8F0]"
                >
                  Start Roadmap ({cp.milestones.length} Milestones)
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#168C8C] mb-2">Step-by-Step Flow</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142D4E]">
              How SkillPath AI Transforms Your College Journey
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {howItWorksSteps.map((s, idx) => (
              <div key={idx} className="relative bg-[#F7F9FC] p-6 rounded-2xl border border-[#E2E8F0]">
                <span className="text-3xl font-extrabold text-[#168C8C]/30 font-mono mb-2 block">{s.step}</span>
                <h4 className="text-base font-bold text-[#142D4E] mb-2">{s.title}</h4>
                <p className="text-xs text-[#718096] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SkillPath Section (Comparison Table) */}
      <section id="about" className="py-20 bg-[#F7F9FC] border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#168C8C] mb-2">The SkillPath Advantage</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142D4E]">
              Why College Students Need SkillPath AI
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-[#142D4E] text-white p-4 font-bold text-xs uppercase tracking-wider">
              <div>Aspect</div>
              <div className="text-slate-300 hidden md:block">Traditional College & Courses</div>
              <div className="text-[#2DD4BF] hidden md:block">SkillPath AI Platform</div>
            </div>

            <div className="divide-y divide-[#E2E8F0]">
              {whyChooseUs.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-5 sm:p-6 gap-4 text-xs sm:text-sm">
                  <div className="font-bold text-[#142D4E]">{item.title}</div>
                  <div className="text-slate-500 bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-lg">
                    <span className="md:hidden font-bold block text-slate-700 mb-1">Traditional:</span>
                    {item.traditional}
                  </div>
                  <div className="text-[#142D4E] font-medium bg-[#E6F7F7]/60 md:bg-transparent p-3 md:p-0 rounded-lg">
                    <span className="md:hidden font-bold block text-[#168C8C] mb-1">SkillPath AI:</span>
                    {item.skillpath}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#168C8C] mb-2">Student Experiences</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142D4E]">
              From Undergrads to Successful Engineers
            </h3>
            <p className="text-xs text-[#718096] mt-1 italic">
              (Clearly labelled sample reviews representative of college student outcomes)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#F7F9FC] rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-amber-400 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#334E68] italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E2E8F0]">
                  <p className="text-sm font-bold text-[#142D4E]">{t.name}</p>
                  <p className="text-xs text-[#718096]">{t.role}</p>
                  <span className="inline-block mt-2 text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {t.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-[#F7F9FC] border-t border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#168C8C] mb-2">Got Questions?</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142D4E]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-semibold text-sm sm:text-base text-[#142D4E] hover:text-[#168C8C] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 flex-shrink-0 text-[#168C8C]" /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#718096] leading-relaxed border-t border-slate-50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-[#142D4E] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold">Ready to Become Job-Ready?</h2>
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto">
            Join thousands of college students using SkillPath AI to discover their path, master modern skills, and land their dream tech placements.
          </p>
          <div className="pt-2">
            <button
              onClick={() => (isAuthenticated ? onNavigate('dashboard') : onOpenAuth('signup'))}
              className="bg-[#168C8C] hover:bg-[#127272] text-white text-sm sm:text-base font-bold px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Start Free Student Onboarding
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
