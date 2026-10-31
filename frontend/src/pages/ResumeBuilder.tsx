import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Download,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Copy,
  Printer,
  Search,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ResumeData } from '../types';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export const ResumeBuilder: React.FC = () => {
  const { profile } = useAuth();

  const [activeTab, setActiveTab] = useState<'editor' | 'atsChecker'>('editor');
  const [template, setTemplate] = useState<'modern' | 'minimal' | 'academic'>('modern');

  // Resume State
  const [resume, setResume] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('skillpath_resume_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      personalInfo: {
        fullName: profile.fullName || 'Aarav Sharma',
        email: profile.email || 'aarav.sharma@college.edu',
        phone: '+91 98765 43210',
        location: 'Bengaluru, India',
        linkedin: 'linkedin.com/in/aarav-sharma-dev',
        github: 'github.com/aarav-sharma',
        portfolio: 'aaravsharma.dev'
      },
      summary: `Proactive and detail-oriented Computer Science undergrad with strong foundations in ${profile.preferredLanguage}, Data Structures, and scalable web engineering. Experience architecting full-stack web applications and solving algorithmic problems.`,
      targetRole: profile.careerInterest || 'Software Developer',
      education: [
        {
          id: 'edu-1',
          institution: profile.collegeName || 'National Institute of Technology',
          degree: profile.degree || 'B.Tech',
          field: profile.branch || 'Computer Science & Engineering',
          startDate: '2023',
          endDate: '2027',
          score: 'CGPA: 8.8 / 10.0'
        }
      ],
      experience: [
        {
          id: 'exp-1',
          role: 'Full Stack Engineering Intern',
          company: 'TechSphere Solutions',
          location: 'Bengaluru, India (Remote)',
          startDate: 'May 2026',
          endDate: 'July 2026',
          current: false,
          bullets: [
            'Architected RESTful microservices using Python FastAPI and PostgreSQL, serving 10,000+ daily active requests.',
            'Optimized SQL query execution times by 35% through multi-column B-tree indexing and Redis caching.',
            'Collaborated within an Agile engineering team of 6, following standard Git branch workflows and CI/CD pipelines.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'SkillPath AI - Student Learning & Placement Platform',
          techStack: ['React.js', 'FastAPI', 'Gemini API', 'PostgreSQL', 'Tailwind CSS'],
          liveUrl: 'https://skillpath-ai.demo',
          githubUrl: 'https://github.com/aarav-sharma/skillpath-ai',
          bullets: [
            'Engineered full-stack responsive web application guiding 1,000+ students through personalized placement roadmaps.',
            'Integrated Google Gemini API proxy for real-time AI mock interviews and ATS resume compatibility scoring.',
            'Implemented Row Level Security (RLS) policies ensuring 100% private student data isolation.'
          ]
        },
        {
          id: 'proj-2',
          title: 'Distributed Task Queue & Scheduler',
          techStack: ['Python', 'Redis', 'Docker', 'REST API'],
          githubUrl: 'https://github.com/aarav-sharma/distributed-queue',
          bullets: [
            'Developed asynchronous worker queue system handling concurrent background jobs with exponential retry backoff.',
            'Containerized services using Docker Compose, achieving 99.9% uptime in local stress testing.'
          ]
        }
      ],
      skills: {
        languages: ['Python', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
        frameworks: ['React.js', 'FastAPI', 'Node.js / Express', 'Tailwind CSS'],
        databases: ['PostgreSQL', 'Supabase', 'Redis', 'MongoDB'],
        tools: ['Git', 'GitHub', 'Docker', 'Linux CLI', 'Postman', 'VS Code']
      },
      certifications: [
        {
          id: 'cert-1',
          name: 'CS50x: Introduction to Computer Science',
          issuer: 'Harvard University',
          issueDate: '2025',
          credentialUrl: 'https://cs50.harvard.edu/certificates/'
        }
      ]
    };
  });

  // ATS Checker State
  const [jobDescriptionInput, setJobDescriptionInput] = useState('');
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsResult, setAtsResult] = useState<any>(null);
  const [summaryGenerating, setSummaryGenerating] = useState(false);

  const handleGenerateSummary = async () => {
    setSummaryGenerating(true);
    try {
      const res = await api.improveSummary({
        fullName: resume.personalInfo.fullName,
        careerInterest: resume.targetRole,
        skills: [...resume.skills.languages, ...resume.skills.frameworks],
        projectsSummary: resume.projects.map(p => p.title).join(', ')
      });
      setResume(prev => ({ ...prev, summary: res.enhanced_summary }));
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } catch {
      // fallback
    } finally {
      setSummaryGenerating(false);
    }
  };

  const handleRunATSCheck = async () => {
    if (!jobDescriptionInput.trim()) return;
    setAtsLoading(true);

    const fullResumeText = `
      ${resume.personalInfo.fullName} ${resume.summary}
      ${resume.skills.languages.join(' ')} ${resume.skills.frameworks.join(' ')} ${resume.skills.databases.join(' ')} ${resume.skills.tools.join(' ')}
      ${resume.projects.map(p => p.title + ' ' + p.techStack.join(' ') + ' ' + p.bullets.join(' ')).join(' ')}
      ${resume.experience.map(e => e.role + ' ' + e.company + ' ' + e.bullets.join(' ')).join(' ')}
    `;

    try {
      const result = await api.checkATS(fullResumeText, jobDescriptionInput, resume.targetRole);
      setAtsResult(result);
      if (result.ats_score >= 75) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    } finally {
      setAtsLoading(false);
    }
  };

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Controls & Navigation Bar */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tab Toggle */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'editor'
                ? 'bg-white text-[#142D4E] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Resume Editor & Live Preview
          </button>
          <button
            onClick={() => setActiveTab('atsChecker')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 ${
              activeTab === 'atsChecker'
                ? 'bg-white text-[#168C8C] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#168C8C]" />
            <span>ATS Keyword Scanner</span>
          </button>
        </div>

        {/* Template Selector & Print Button */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-xs">
            <span className="text-[#718096] hidden md:inline">Template:</span>
            <select
              value={template}
              onChange={e => setTemplate(e.target.value as any)}
              className="text-xs border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 bg-white font-medium text-[#142D4E]"
            >
              <option value="modern">Modern Tech</option>
              <option value="minimal">Clean Minimalist</option>
              <option value="academic">University Standard</option>
            </select>
          </div>

          <button
            onClick={handlePrintDownload}
            className="flex items-center space-x-1.5 bg-[#168C8C] hover:bg-[#127272] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      {/* TAB 1: RESUME EDITOR & LIVE PREVIEW */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-5 space-y-4 max-h-[85vh] overflow-y-auto pr-1">
            {/* Personal Info Accordion */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">Personal Information</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] text-[#718096]">Full Name</label>
                  <input
                    type="text"
                    value={resume.personalInfo.fullName}
                    onChange={e => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, fullName: e.target.value }
                    })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#718096]">Email</label>
                  <input
                    type="email"
                    value={resume.personalInfo.email}
                    onChange={e => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, email: e.target.value }
                    })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] text-[#718096]">Phone</label>
                  <input
                    type="text"
                    value={resume.personalInfo.phone}
                    onChange={e => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, phone: e.target.value }
                    })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#718096]">Location</label>
                  <input
                    type="text"
                    value={resume.personalInfo.location}
                    onChange={e => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, location: e.target.value }
                    })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] text-[#718096]">GitHub Profile</label>
                  <input
                    type="text"
                    value={resume.personalInfo.github}
                    onChange={e => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, github: e.target.value }
                    })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#718096]">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={resume.personalInfo.linkedin}
                    onChange={e => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, linkedin: e.target.value }
                    })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">Professional Summary</h3>
                <button
                  type="button"
                  onClick={handleGenerateSummary}
                  disabled={summaryGenerating}
                  className="text-xs font-semibold text-[#168C8C] hover:text-[#127272] flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{summaryGenerating ? 'Enhancing...' : 'AI Enhance'}</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={resume.summary}
                onChange={e => setResume({ ...resume, summary: e.target.value })}
                className="w-full text-xs border border-[#E2E8F0] rounded-lg p-2.5 leading-relaxed focus:outline-none focus:border-[#168C8C]"
              />
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">Education</h3>
              {resume.education.map((edu) => (
                <div key={edu.id} className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="College / University"
                    value={edu.institution}
                    onChange={e => {
                      const updated = resume.education.map(ed => ed.id === edu.id ? { ...ed, institution: e.target.value } : ed);
                      setResume({ ...resume, education: updated });
                    }}
                    className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 font-semibold"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Degree & Branch"
                      value={edu.field}
                      onChange={e => {
                        const updated = resume.education.map(ed => ed.id === edu.id ? { ...ed, field: e.target.value } : ed);
                        setResume({ ...resume, education: updated });
                      }}
                      className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                    />
                    <input
                      type="text"
                      placeholder="CGPA / Score"
                      value={edu.score}
                      onChange={e => {
                        const updated = resume.education.map(ed => ed.id === edu.id ? { ...ed, score: e.target.value } : ed);
                        setResume({ ...resume, education: updated });
                      }}
                      className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Skills Inputs */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">Technical Skills</h3>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-[11px] text-[#718096]">Languages (comma separated)</label>
                  <input
                    type="text"
                    value={resume.skills.languages.join(', ')}
                    onChange={e => setResume({
                      ...resume,
                      skills: { ...resume.skills, languages: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                    })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#718096]">Frameworks & Libraries</label>
                  <input
                    type="text"
                    value={resume.skills.frameworks.join(', ')}
                    onChange={e => setResume({
                      ...resume,
                      skills: { ...resume.skills, frameworks: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                    })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#718096]">Databases & Cloud</label>
                  <input
                    type="text"
                    value={resume.skills.databases.join(', ')}
                    onChange={e => setResume({
                      ...resume,
                      skills: { ...resume.skills, databases: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                    })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-1.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Printable Resume Sheet Preview */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              id="resume-preview-sheet"
              className="bg-white w-full max-w-2xl min-h-[750px] p-8 sm:p-10 rounded-xl shadow-lg border border-[#E2E8F0] text-[#202B38] font-sans text-xs space-y-4 leading-normal"
            >
              {/* Header */}
              <div className="text-center pb-3 border-b-2 border-[#142D4E]">
                <h1 className="text-2xl font-extrabold uppercase tracking-wide text-[#142D4E]">
                  {resume.personalInfo.fullName}
                </h1>
                <p className="text-[11px] text-[#334E68] mt-1 font-medium">
                  {resume.personalInfo.location} • {resume.personalInfo.phone} • {resume.personalInfo.email}
                </p>
                <div className="text-[11px] text-[#168C8C] mt-0.5 space-x-2 font-medium">
                  <span>{resume.personalInfo.github}</span>
                  <span>•</span>
                  <span>{resume.personalInfo.linkedin}</span>
                  {resume.personalInfo.portfolio && (
                    <>
                      <span>•</span>
                      <span>{resume.personalInfo.portfolio}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Summary */}
              {resume.summary && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#142D4E] border-b border-slate-200 pb-1 mb-1.5">
                    Professional Summary
                  </h2>
                  <p className="text-[11px] text-slate-700 leading-relaxed">{resume.summary}</p>
                </div>
              )}

              {/* Technical Skills */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#142D4E] border-b border-slate-200 pb-1 mb-1.5">
                  Technical Skills
                </h2>
                <div className="space-y-1 text-[11px]">
                  <p><strong className="text-[#142D4E]">Languages:</strong> {resume.skills.languages.join(', ')}</p>
                  <p><strong className="text-[#142D4E]">Frameworks & Tools:</strong> {resume.skills.frameworks.join(', ')}</p>
                  <p><strong className="text-[#142D4E]">Databases & Cloud:</strong> {resume.skills.databases.join(', ')}</p>
                  <p><strong className="text-[#142D4E]">Developer Tools:</strong> {resume.skills.tools.join(', ')}</p>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#142D4E] border-b border-slate-200 pb-1 mb-2">
                  Academic & Technical Projects
                </h2>
                <div className="space-y-2.5">
                  {resume.projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#142D4E]">{proj.title}</span>
                        <span className="text-slate-500 italic">[{proj.techStack.join(', ')}]</span>
                      </div>
                      <ul className="list-disc ml-4 space-y-0.5 text-[11px] text-slate-700 mt-1">
                        {proj.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience / Internships */}
              {resume.experience.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#142D4E] border-b border-slate-200 pb-1 mb-2">
                    Internships & Experience
                  </h2>
                  <div className="space-y-2.5">
                    {resume.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex items-center justify-between text-[11px]">
                          <div>
                            <span className="font-bold text-[#142D4E]">{exp.role}</span>
                            <span className="text-slate-600"> — {exp.company}</span>
                          </div>
                          <span className="text-slate-500 font-mono text-[10px]">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <ul className="list-disc ml-4 space-y-0.5 text-[11px] text-slate-700 mt-1">
                          {exp.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#142D4E] border-b border-slate-200 pb-1 mb-1.5">
                  Education
                </h2>
                {resume.education.map((edu) => (
                  <div key={edu.id} className="flex items-center justify-between text-[11px]">
                    <div>
                      <p className="font-bold text-[#142D4E]">{edu.institution}</p>
                      <p className="text-slate-600">{edu.degree} in {edu.field} • {edu.score}</p>
                    </div>
                    <span className="text-slate-500 font-mono text-[10px]">{edu.startDate} - {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ATS KEYWORD SCANNER & JOB DESCRIPTION CHECKER */}
      {activeTab === 'atsChecker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Job Description Paste Box */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#142D4E]">Paste Target Job Description</h3>
              <p className="text-xs text-[#718096]">
                Paste the requirements section from LinkedIn, Naukri, or campus drive notices to test ATS match.
              </p>
            </div>

            <textarea
              rows={12}
              placeholder="e.g. We are looking for a Software Development Engineer Intern with proficiency in Python, C++, Data Structures, Algorithms, SQL, and Git. Experience building REST APIs with React or FastAPI is a plus..."
              value={jobDescriptionInput}
              onChange={e => setJobDescriptionInput(e.target.value)}
              className="w-full text-xs border border-[#E2E8F0] rounded-xl p-4 leading-relaxed focus:outline-none focus:border-[#168C8C]"
            />

            <button
              onClick={handleRunATSCheck}
              disabled={atsLoading || !jobDescriptionInput.trim()}
              className="w-full bg-[#168C8C] hover:bg-[#127272] disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{atsLoading ? 'Analyzing ATS Compatibility...' : 'Scan Resume Against Job Description'}</span>
            </button>
          </div>

          {/* ATS Analysis Output Card */}
          <div className="lg:col-span-6 space-y-4">
            {!atsResult ? (
              <div className="bg-[#F7F9FC] border border-[#E2E8F0] rounded-2xl p-10 text-center text-[#718096] flex flex-col items-center justify-center h-full">
                <Search className="w-10 h-10 text-slate-300 mb-3" />
                <h4 className="font-bold text-sm text-[#142D4E]">No Job Description Scanned Yet</h4>
                <p className="text-xs max-w-sm mt-1">
                  Paste the requirements from any campus hiring portal on the left to calculate your compatibility score.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-5 animate-in fade-in">
                {/* Score Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#168C8C]">ATS Compatibility</span>
                    <h4 className="text-xl font-extrabold text-[#142D4E]">Analysis Summary</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-[#168C8C]">{atsResult.ats_score}%</span>
                    <p className="text-[10px] text-slate-400">Match Index</p>
                  </div>
                </div>

                {/* Keywords Matched vs Missing */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                    <span className="font-bold text-emerald-900 block mb-1.5 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Matched Keywords ({atsResult.matched_keywords?.length || 0})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {atsResult.matched_keywords?.map((kw: string, i: number) => (
                        <span key={i} className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl">
                    <span className="font-bold text-rose-900 block mb-1.5 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Missing Critical Keywords ({atsResult.missing_keywords?.length || 0})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {atsResult.missing_keywords?.map((kw: string, i: number) => (
                        <span key={i} className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#142D4E] mb-2">
                    Actionable Improvement Suggestions
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#334E68]">
                    {atsResult.improvement_suggestions?.map((sug: string, i: number) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#168C8C] font-bold">•</span>
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
