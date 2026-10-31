import React, { useState, useEffect } from 'react';
import {
  Map,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Code2,
  FolderGit2,
  Award,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { CAREER_PATHS_DATA } from '../data/careerRoadmapsData';
import { useAuth } from '../contexts/AuthContext';
import { CareerPath, RoadmapMilestone } from '../types';
import confetti from 'canvas-confetti';

export const CareerRoadmaps: React.FC = () => {
  const { profile, updateProfile } = useAuth();

  // Find user's target path or default to first
  const initialPath = CAREER_PATHS_DATA.find(p => p.title.toLowerCase().includes(profile.careerInterest.toLowerCase())) || CAREER_PATHS_DATA[0];
  const [selectedPathId, setSelectedPathId] = useState<string>(initialPath.id);

  // Track completed milestones map: { [milestoneId]: boolean }
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('skillpath_completed_milestones');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      'sd-m1': true,
      'fs-m1': true,
      'ai-m1': true
    };
  });

  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('skillpath_completed_milestones', JSON.stringify(completedMilestones));
  }, [completedMilestones]);

  const currentPath = CAREER_PATHS_DATA.find(p => p.id === selectedPathId) || CAREER_PATHS_DATA[0];

  const totalMilestones = currentPath.milestones.length;
  const completedCount = currentPath.milestones.filter(m => completedMilestones[m.id]).length;
  const progressPercent = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;

  const toggleMilestone = (mId: string) => {
    const nextState = !completedMilestones[mId];
    setCompletedMilestones(prev => ({
      ...prev,
      [mId]: nextState
    }));

    if (nextState) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleSelectCareer = (path: CareerPath) => {
    setSelectedPathId(path.id);
    updateProfile({ careerInterest: path.title });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Path Selector Ribbon */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#168C8C]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">Select Target Career Track</h3>
          </div>
          <span className="text-xs text-[#718096]">8 Curated Industry Specializations</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {CAREER_PATHS_DATA.map((p) => {
            const isSelected = p.id === selectedPathId;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectCareer(p)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#142D4E] text-white border-[#142D4E] shadow-sm font-semibold'
                    : 'bg-[#F7F9FC] text-[#334E68] border-[#E2E8F0] hover:border-[#168C8C] hover:bg-white'
                }`}
              >
                <p className="text-xs font-bold leading-tight truncate">{p.title}</p>
                <p className={`text-[10px] mt-1 truncate ${isSelected ? 'text-teal-300' : 'text-[#718096]'}`}>
                  {p.demandLevel} Demand
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Career Overview Banner */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#168C8C]/25 text-[#2DD4BF] text-xs font-semibold px-3 py-1 rounded-full border border-[#168C8C]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Curriculum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{currentPath.title} Roadmap</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{currentPath.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <div className="flex items-center space-x-1.5 text-slate-300">
              <span className="text-slate-400">Avg. Fresher CTC:</span>
              <span className="font-bold text-white">{currentPath.avgSalaryIndia}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-300">
              <span className="text-slate-400">Total Milestones:</span>
              <span className="font-bold text-white">{totalMilestones} Phases</span>
            </div>
          </div>
        </div>

        {/* Progress Meter Box */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 min-w-[220px] text-center">
          <p className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">Roadmap Progress</p>
          <div className="text-3xl font-extrabold text-white">{progressPercent}%</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2 mb-2">
            <div
              className="bg-[#168C8C] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-300">{completedCount} of {totalMilestones} milestones verified</p>
        </div>
      </div>

      {/* Interactive Roadmap Milestones Timeline */}
      <div className="space-y-4">
        {currentPath.milestones.map((m, idx) => {
          const isDone = Boolean(completedMilestones[m.id]);
          const isExpanded = expandedMilestoneId === m.id || (expandedMilestoneId === null && idx === 0);

          return (
            <div
              key={m.id}
              className={`bg-white rounded-2xl border transition-all ${
                isDone ? 'border-emerald-200 shadow-2xs' : 'border-[#E2E8F0] shadow-sm'
              }`}
            >
              {/* Milestone Summary Header Bar */}
              <div
                className="p-5 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedMilestoneId(isExpanded ? '' : m.id)}
              >
                <div className="flex items-center space-x-4">
                  {/* Completion Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMilestone(m.id);
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                        : 'bg-slate-100 text-slate-400 hover:text-slate-600 border border-slate-200'
                    }`}
                    title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#142D4E] text-white px-2 py-0.5 rounded">
                        Milestone {m.order}
                      </span>
                      <span className="text-xs text-[#718096] flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        Est. {m.estimatedWeeks} Weeks
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <h3 className={`text-base font-bold transition-colors ${
                      isDone ? 'line-through text-slate-500' : 'text-[#142D4E]'
                    }`}>
                      {m.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#168C8C] font-semibold hidden sm:inline">
                    {isExpanded ? 'Hide Details' : 'View Plan'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {/* Collapsible Detailed Content */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-150">
                  <p className="text-xs sm:text-sm text-[#334E68] leading-relaxed">{m.description}</p>

                  {/* Skills Grid */}
                  <div>
                    <h4 className="text-xs font-bold text-[#142D4E] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[#168C8C]" />
                      <span>Key Technical Skills to Acquire</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {m.skills.map((sk, i) => (
                        <span key={i} className="text-xs font-medium bg-slate-100 text-[#142D4E] px-3 py-1 rounded-lg border border-slate-200">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Curated Free Resources */}
                  <div>
                    <h4 className="text-xs font-bold text-[#142D4E] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#168C8C]" />
                      <span>Curated Free Learning Resources</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {m.resources.map((res, i) => (
                        <a
                          key={i}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-3 rounded-xl border border-[#E2E8F0] hover:border-[#168C8C] hover:bg-[#E6F7F7]/30 transition-all flex items-center justify-between text-xs group"
                        >
                          <div>
                            <p className="font-semibold text-[#142D4E] group-hover:text-[#168C8C] transition-colors">{res.title}</p>
                            <span className="text-[10px] text-[#718096] capitalize">{res.platform} • {res.type}</span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#168C8C] flex-shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Practice Exercises & Projects */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Practice */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h5 className="text-xs font-bold text-[#142D4E] uppercase tracking-wider mb-2">Practice Exercises</h5>
                      <ul className="space-y-1.5 text-xs text-[#334E68]">
                        {m.practiceExercises.map((ex, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-[#168C8C] font-bold">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Projects */}
                    <div className="p-4 rounded-xl bg-[#E6F7F7]/50 border border-[#168C8C]/20">
                      <h5 className="text-xs font-bold text-[#142D4E] uppercase tracking-wider mb-2 flex items-center space-x-1">
                        <FolderGit2 className="w-3.5 h-3.5 text-[#168C8C]" />
                        <span>Recommended Projects</span>
                      </h5>
                      <ul className="space-y-1.5 text-xs text-[#142D4E]">
                        {m.recommendedProjects.map((pr, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-[#168C8C] font-bold">✓</span>
                            <span className="font-medium">{pr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
