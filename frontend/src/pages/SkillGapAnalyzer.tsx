import React, { useState } from 'react';
import {
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Compass,
  Award,
  Layers,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CAREER_PATHS_DATA } from '../data/careerRoadmapsData';

interface RoleBenchmark {
  role: string;
  requiredSkills: Array<{
    name: string;
    priority: 'Critical' | 'High' | 'Medium';
    recommendedResource: { title: string; url: string; platform: string };
  }>;
}

const ROLE_BENCHMARKS: Record<string, RoleBenchmark> = {
  'Software Developer': {
    role: 'Software Developer (SDE)',
    requiredSkills: [
      { name: 'Data Structures & Algorithms', priority: 'Critical', recommendedResource: { title: 'NeetCode 150 Roadmap', url: 'https://neetcode.io/roadmap', platform: 'NeetCode' } },
      { name: 'C++ or Java', priority: 'Critical', recommendedResource: { title: 'CS50x Introduction to Computer Science', url: 'https://cs50.harvard.edu/x/', platform: 'Harvard' } },
      { name: 'DBMS & SQL', priority: 'High', recommendedResource: { title: 'SQLZoo Interactive Queries', url: 'https://sqlzoo.net/', platform: 'SQLZoo' } },
      { name: 'Operating Systems', priority: 'High', recommendedResource: { title: 'Gate Smashers OS Playlist', url: 'https://www.youtube.com/@GateSmashers', platform: 'YouTube' } },
      { name: 'Computer Networks', priority: 'Medium', recommendedResource: { title: 'Computer Networking: A Top-Down Approach', url: 'https://gaia.cs.umass.edu/kurose_ross/', platform: 'UMass' } },
      { name: 'Git & Version Control', priority: 'High', recommendedResource: { title: 'Git Official Tutorial', url: 'https://git-scm.com/doc', platform: 'Git-SCM' } },
      { name: 'System Design Basics', priority: 'Medium', recommendedResource: { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', platform: 'GitHub' } }
    ]
  },
  'Full Stack Developer': {
    role: 'Full Stack Web Developer',
    requiredSkills: [
      { name: 'HTML/CSS & Responsive Design', priority: 'High', recommendedResource: { title: 'The Odin Project Foundations', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' } },
      { name: 'JavaScript / TypeScript', priority: 'Critical', recommendedResource: { title: 'Modern JavaScript Tutorial', url: 'https://javascript.info/', platform: 'JavaScript.info' } },
      { name: 'React.js', priority: 'Critical', recommendedResource: { title: 'React Official Documentation', url: 'https://react.dev/', platform: 'React.dev' } },
      { name: 'Backend Framework (FastAPI / Node)', priority: 'Critical', recommendedResource: { title: 'FastAPI Tutorial', url: 'https://fastapi.tiangolo.com/', platform: 'FastAPI' } },
      { name: 'PostgreSQL / SQL', priority: 'High', recommendedResource: { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', platform: 'PostgreSQL' } },
      { name: 'REST APIs & JWT Auth', priority: 'High', recommendedResource: { title: 'RESTful API Design Best Practices', url: 'https://restfulapi.net/', platform: 'REST' } },
      { name: 'Docker Containerization', priority: 'Medium', recommendedResource: { title: 'Docker Curriculum', url: 'https://docker-curriculum.com/', platform: 'Docker' } }
    ]
  },
  'AI/ML Engineer': {
    role: 'AI / Machine Learning Engineer',
    requiredSkills: [
      { name: 'Python Programming', priority: 'Critical', recommendedResource: { title: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/', platform: 'Python' } },
      { name: 'NumPy & Pandas', priority: 'Critical', recommendedResource: { title: 'Kaggle Pandas Course', url: 'https://www.kaggle.com/learn/pandas', platform: 'Kaggle' } },
      { name: 'Linear Algebra & Statistics', priority: 'High', recommendedResource: { title: '3Blue1Brown Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', platform: 'YouTube' } },
      { name: 'Scikit-Learn ML Models', priority: 'Critical', recommendedResource: { title: 'Andrew Ng Machine Learning', url: 'https://www.coursera.org/specializations/machine-learning-introduction', platform: 'Coursera' } },
      { name: 'Deep Learning with PyTorch', priority: 'High', recommendedResource: { title: 'Fast.ai Practical Deep Learning', url: 'https://course.fast.ai/', platform: 'Fast.ai' } },
      { name: 'RAG & LLM APIs (Gemini/OpenAI)', priority: 'Medium', recommendedResource: { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn', platform: 'HuggingFace' } }
    ]
  },
  'Data Analyst': {
    role: 'Data Analyst & BI Specialist',
    requiredSkills: [
      { name: 'Advanced SQL & Window Functions', priority: 'Critical', recommendedResource: { title: 'Mode Analytics SQL', url: 'https://mode.com/sql-tutorial/', platform: 'Mode' } },
      { name: 'Advanced Excel & Power Query', priority: 'High', recommendedResource: { title: 'Excel Exposure', url: 'https://excelexposure.com/', platform: 'Excel' } },
      { name: 'Tableau or Power BI', priority: 'Critical', recommendedResource: { title: 'Microsoft Power BI Guided Learning', url: 'https://learn.microsoft.com/en-us/power-bi/', platform: 'Microsoft' } },
      { name: 'Python for Data Analysis', priority: 'Medium', recommendedResource: { title: 'Kaggle Data Visualization', url: 'https://www.kaggle.com/learn/data-visualization', platform: 'Kaggle' } },
      { name: 'Hypothesis Testing & Metrics', priority: 'High', recommendedResource: { title: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', platform: 'Khan Academy' } }
    ]
  }
};

export const SkillGapAnalyzer: React.FC = () => {
  const { profile } = useAuth();

  const [selectedRoleKey, setSelectedRoleKey] = useState<string>(
    ROLE_BENCHMARKS[profile.careerInterest] ? profile.careerInterest : 'Software Developer'
  );

  const benchmark = ROLE_BENCHMARKS[selectedRoleKey] || ROLE_BENCHMARKS['Software Developer'];
  const studentSkills = profile.currentSkills.map(s => s.toLowerCase());

  // Classify skills: Acquired vs Missing
  const analyzedSkills = benchmark.requiredSkills.map(req => {
    const isAcquired = studentSkills.some(sk =>
      req.name.toLowerCase().includes(sk) || sk.includes(req.name.toLowerCase())
    );

    // Some skills may need improvement if marked as beginner
    const needsImprovement = isAcquired && profile.currentLearningLevel === 'Beginner';

    return {
      ...req,
      status: needsImprovement ? 'improve' : isAcquired ? 'acquired' : 'missing'
    };
  });

  const acquiredCount = analyzedSkills.filter(s => s.status === 'acquired').length;
  const improveCount = analyzedSkills.filter(s => s.status === 'improve').length;
  const missingCount = analyzedSkills.filter(s => s.status === 'missing').length;

  const matchScore = Math.round(((acquiredCount + improveCount * 0.5) / analyzedSkills.length) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Role Picker Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-[#142D4E]">Select Target Placement Role</h2>
            <p className="text-xs text-[#718096]">
              Benchmark your current skills against actual recruitment criteria of top technology companies.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {Object.keys(ROLE_BENCHMARKS).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRoleKey(role)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                  selectedRoleKey === role
                    ? 'bg-[#142D4E] text-white border-[#142D4E]'
                    : 'bg-[#F7F9FC] text-[#334E68] border-[#E2E8F0] hover:bg-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Match Score Overview */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2DD4BF] bg-[#168C8C]/30 px-2.5 py-0.5 rounded border border-[#168C8C]/40">
            Competency Benchmark
          </span>
          <h3 className="text-2xl font-extrabold">{benchmark.role} Skill Fit</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You currently possess <strong className="text-white">{acquiredCount}</strong> of the {analyzedSkills.length} core competencies required for entry-level hiring in this track.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs">
            <div className="flex items-center space-x-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{acquiredCount} Acquired</span>
            </div>
            {improveCount > 0 && (
              <div className="flex items-center space-x-1.5 text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>{improveCount} Needs Depth</span>
              </div>
            )}
            <div className="flex items-center space-x-1.5 text-rose-400">
              <XCircle className="w-4 h-4" />
              <span>{missingCount} Critical Gaps</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center">
          <p className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">Target Role Fit</p>
          <div className="text-4xl font-extrabold text-white">{matchScore}%</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-3 mb-2">
            <div
              className="bg-[#168C8C] h-2 rounded-full transition-all duration-500"
              style={{ width: `${matchScore}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-300">
            {matchScore >= 75 ? 'Placement Ready Candidate' : matchScore >= 50 ? 'Strong Foundation' : 'High Priority Gaps to Fill'}
          </span>
        </div>
      </div>

      {/* Detailed Skill Comparison Cards */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#142D4E] mb-4">
          Detailed Competency Breakdown
        </h3>

        <div className="divide-y divide-[#E2E8F0]">
          {analyzedSkills.map((sk, idx) => {
            const isAcquired = sk.status === 'acquired';
            const isImprove = sk.status === 'improve';
            const isMissing = sk.status === 'missing';

            return (
              <div key={idx} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-3.5">
                  <div className="mt-0.5">
                    {isAcquired && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {isImprove && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                    {isMissing && <XCircle className="w-5 h-5 text-rose-500" />}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-[#142D4E]">{sk.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded uppercase tracking-wider ${
                        sk.priority === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : sk.priority === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {sk.priority} Priority
                      </span>
                    </div>

                    <p className="text-xs text-[#718096] mt-0.5">
                      {isAcquired && '✓ Verified in your profile skills set.'}
                      {isImprove && '⚠️ You listed this skill, but advanced interview problem-solving is recommended.'}
                      {isMissing && '❌ Missing skill. Tested in technical screening and campus online assessments.'}
                    </p>
                  </div>
                </div>

                {/* Recommended Course Link */}
                <div className="flex items-center space-x-3 pl-8 md:pl-0">
                  <a
                    href={sk.recommendedResource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#168C8C] hover:text-[#127272] bg-[#E6F7F7] px-3 py-1.5 rounded-lg border border-[#168C8C]/20 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Learn: {sk.recommendedResource.title}</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personalized Improvement Plan Box */}
      <div className="bg-[#E6F7F7]/60 rounded-2xl border border-[#168C8C]/30 p-6">
        <div className="flex items-center space-x-2 text-[#168C8C] mb-2 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Your 30-Day Skill Gap Closure Plan</span>
        </div>
        <p className="text-xs text-[#142D4E] leading-relaxed mb-4">
          To boost your readiness score from <strong>{matchScore}%</strong> to <strong>85%+</strong>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#142D4E]">
          <div className="p-3 bg-white rounded-xl border border-[#168C8C]/20">
            <span className="font-bold text-[#168C8C] block mb-1">Week 1 - 2</span>
            <span>Focus on critical missing skills (e.g. {analyzedSkills.find(s => s.status === 'missing')?.name || 'Algorithms'}). Dedicate 90 min daily.</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#168C8C]/20">
            <span className="font-bold text-[#168C8C] block mb-1">Week 3</span>
            <span>Implement a hands-on mini project utilizing these technologies and publish code to GitHub.</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#168C8C]/20">
            <span className="font-bold text-[#168C8C] block mb-1">Week 4</span>
            <span>Update your resume with new project bullet points and test with our ATS checker.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
