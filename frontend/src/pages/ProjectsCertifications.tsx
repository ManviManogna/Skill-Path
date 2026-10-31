import React, { useState } from 'react';
import {
  FolderGit2,
  Award,
  ExternalLink,
  CheckCircle2,
  Layers,
  Sparkles,
  Filter,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CURATED_PROJECTS, VERIFIED_CERTIFICATIONS, ProjectGuide, VerifiedCertification } from '../data/certificationsAndProjectsData';
import { useAuth } from '../contexts/AuthContext';

export const ProjectsCertifications: React.FC = () => {
  const { profile } = useAuth();

  const [activeTab, setActiveTab] = useState<'projects' | 'certifications'>('projects');
  const [levelFilter, setLevelFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(CURATED_PROJECTS[0].id);

  const filteredProjects = CURATED_PROJECTS.filter(p => {
    if (levelFilter === 'All') return true;
    return p.level === levelFilter;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#168C8C]/25 text-[#2DD4BF] text-xs font-semibold px-3 py-1 rounded-full border border-[#168C8C]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio & Verified Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Projects and Certifications</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Stand out in tech interviews with production-grade capstone architectures and industry-recognized certifications from Harvard, AWS, Meta, and Google.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-white/10 p-1.5 rounded-xl border border-white/20 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'projects' ? 'bg-[#168C8C] text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Curated Projects
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'certifications' ? 'bg-[#168C8C] text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Verified Certifications
          </button>
        </div>
      </div>

      {/* TAB 1: CURATED PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {/* Level Filter Chips */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-[#168C8C]" />
              <span className="text-xs font-bold text-[#142D4E]">Filter by Difficulty:</span>
            </div>
            <div className="flex space-x-2">
              {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    levelFilter === lvl
                      ? 'bg-[#142D4E] text-white'
                      : 'bg-[#F7F9FC] text-[#334E68] border border-[#E2E8F0] hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {filteredProjects.map((p) => {
              const isExpanded = expandedProjectId === p.id;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden transition-all"
                >
                  <div
                    onClick={() => setExpandedProjectId(isExpanded ? null : p.id)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          p.level === 'Beginner' ? 'bg-emerald-50 text-emerald-700' :
                          p.level === 'Intermediate' ? 'bg-amber-50 text-amber-700' :
                          'bg-purple-50 text-purple-700'
                        }`}>
                          {p.level}
                        </span>
                        <span className="text-xs text-[#718096]">• {p.domain}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#142D4E]">{p.title}</h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-[#168C8C] hidden sm:inline">
                        {isExpanded ? 'Hide Architecture' : 'View Blueprint'}
                      </span>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-150 text-xs">
                      <p className="text-xs sm:text-sm text-[#334E68] leading-relaxed">{p.description}</p>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="font-bold text-[#142D4E] uppercase tracking-wider mb-2">Technologies Required:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {p.technologies.map((t, i) => (
                            <span key={i} className="bg-slate-100 text-[#142D4E] font-medium px-2.5 py-1 rounded-lg">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features & Steps */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <h4 className="font-bold text-[#142D4E] uppercase tracking-wider">Features to Build:</h4>
                          <ul className="space-y-1 text-[#334E68]">
                            {p.featuresToBuild.map((f, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <span className="text-[#168C8C] font-bold">✓</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-[#E6F7F7]/60 border border-[#168C8C]/20 rounded-xl space-y-2">
                          <h4 className="font-bold text-[#142D4E] uppercase tracking-wider">Implementation Steps:</h4>
                          <ol className="list-decimal ml-4 space-y-1 text-[#202B38]">
                            {p.implementationSteps.map((st, i) => (
                              <li key={i}>{st}</li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {/* Expected Output & GitHub Tips */}
                      <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
                        <div className="flex items-center space-x-2 text-[#2DD4BF] font-bold">
                          <FolderGit2 className="w-4 h-4" />
                          <span>GitHub Publishing & Recruiter Readiness:</span>
                        </div>
                        <ul className="space-y-1 text-slate-300 text-[11px]">
                          {p.githubPublishingTips.map((tip, i) => (
                            <li key={i}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: VERIFIED CERTIFICATIONS */}
      {activeTab === 'certifications' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERIFIED_CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:border-[#168C8C] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{cert.badgeUrl}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    cert.isFree ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {cert.cost}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#142D4E] mb-1">{cert.title}</h3>
                <p className="text-xs text-[#718096] mb-3">Issuer: <strong>{cert.issuer}</strong> • {cert.duration}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {cert.keySkills.map((sk, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={cert.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2.5 bg-[#F7F9FC] hover:bg-[#E6F7F7] text-xs font-semibold text-[#168C8C] rounded-xl border border-[#E2E8F0] hover:border-[#168C8C] transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>View Official Certification</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
