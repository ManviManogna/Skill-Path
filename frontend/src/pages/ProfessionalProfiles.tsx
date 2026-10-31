import React, { useState, useEffect } from 'react';
import {
  UserCheck2,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  Circle,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { PROFESSIONAL_PLATFORMS_DATA } from '../data/professionalProfilesData';
import { PlatformGuideItem } from '../types';
import confetti from 'canvas-confetti';

export const ProfessionalProfiles: React.FC = () => {
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('linkedin');

  // Interactive Checklist State: map of platformId -> { [taskId]: boolean }
  const [checklistState, setChecklistState] = useState<Record<string, Record<string, boolean>>>(() => {
    const saved = localStorage.getItem('skillpath_prof_checklists');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      linkedin: { 'li-1': true, 'li-2': true },
      github: { 'gh-1': true, 'gh-2': true, 'gh-3': true }
    };
  });

  useEffect(() => {
    localStorage.setItem('skillpath_prof_checklists', JSON.stringify(checklistState));
  }, [checklistState]);

  const activePlatform: PlatformGuideItem =
    PROFESSIONAL_PLATFORMS_DATA.find(p => p.platformId === selectedPlatformId) ||
    PROFESSIONAL_PLATFORMS_DATA[0];

  const currentPlatformDoneCount = activePlatform.checklist.filter(
    item => checklistState[activePlatform.platformId]?.[item.id]
  ).length;

  const currentPlatformTotal = activePlatform.checklist.length;
  const currentPlatformPct = Math.round((currentPlatformDoneCount / currentPlatformTotal) * 100);

  // Overall platforms progress
  let totalAllTasks = 0;
  let doneAllTasks = 0;
  PROFESSIONAL_PLATFORMS_DATA.forEach(p => {
    totalAllTasks += p.checklist.length;
    p.checklist.forEach(c => {
      if (checklistState[p.platformId]?.[c.id]) doneAllTasks++;
    });
  });
  const overallPresenceScore = Math.round((doneAllTasks / totalAllTasks) * 100);

  const toggleChecklistItem = (platformId: string, itemId: string) => {
    setChecklistState(prev => {
      const currentMap = prev[platformId] || {};
      const nextDone = !currentMap[itemId];
      if (nextDone) {
        confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
      }
      return {
        ...prev,
        [platformId]: {
          ...currentMap,
          [itemId]: nextDone
        }
      };
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Security Reminder:</strong> SkillPath AI provides profile creation guides and best practices. We will <strong>NEVER</strong> ask for your external platform passwords or credentials. Keep your accounts secure.
          </span>
        </div>
      </div>

      {/* Top Presence Score Card */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#168C8C]/25 text-[#2DD4BF] text-xs font-semibold px-3 py-1 rounded-full border border-[#168C8C]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Recruiter Proof-of-Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Build Your Professional Presence</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Over 85% of modern recruiters and engineering leads vet your public GitHub code, LeetCode contest rankings, and LinkedIn recommendations before scheduling an interview.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[200px] text-center">
          <p className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">Overall Presence Score</p>
          <div className="text-3xl font-extrabold text-white">{overallPresenceScore}%</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2 mb-2">
            <div
              className="bg-[#168C8C] h-2 rounded-full transition-all duration-500"
              style={{ width: `${overallPresenceScore}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-300">{doneAllTasks} of {totalAllTasks} checklist items verified</span>
        </div>
      </div>

      {/* Main Container: Platform Nav & In-Depth Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 8 Platform Selector Tabs */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#718096] mb-3 px-1">
            Target Platforms (8)
          </h3>

          <div className="space-y-2">
            {PROFESSIONAL_PLATFORMS_DATA.map((p) => {
              const isSelected = p.platformId === selectedPlatformId;
              const done = p.checklist.filter(c => checklistState[p.platformId]?.[c.id]).length;
              const total = p.checklist.length;
              const pct = Math.round((done / total) * 100);

              return (
                <button
                  key={p.platformId}
                  onClick={() => setSelectedPlatformId(p.platformId)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#168C8C] shadow-md ring-1 ring-[#168C8C]'
                      : 'bg-white border-[#E2E8F0] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{p.logoBadge}</span>
                    <div>
                      <p className={`text-sm font-bold ${isSelected ? 'text-[#168C8C]' : 'text-[#142D4E]'}`}>
                        {p.platformName}
                      </p>
                      <p className="text-[11px] text-[#718096]">{done} of {total} steps completed</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    pct === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {pct}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Guide and Checklist for Active Platform */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header of Active Platform */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{activePlatform.logoBadge}</span>
                <div>
                  <h3 className="text-xl font-extrabold text-[#142D4E]">{activePlatform.platformName}</h3>
                  <p className="text-xs text-[#718096]">{activePlatform.tagline}</p>
                </div>
              </div>

              <a
                href={activePlatform.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 bg-[#168C8C] hover:bg-[#127272] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
              >
                <span>Visit Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive Progress Meter */}
            <div className="pt-4 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#142D4E]">Setup & Optimization Progress:</span>
              <span className="font-bold text-[#168C8C]">{currentPlatformPct}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
              <div
                className="bg-[#168C8C] h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentPlatformPct}%` }}
              />
            </div>
          </div>

          {/* 9-Point Comprehensive Breakdown */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
            {/* 1. Why Needed & Primary Use */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#142D4E] mb-1.5">1. Why You Need This</h4>
                <p className="text-xs text-[#334E68] leading-relaxed">{activePlatform.whyNeeded}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#E6F7F7]/60 border border-[#168C8C]/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#142D4E] mb-1.5">2. What It Is Used For</h4>
                <p className="text-xs text-[#202B38] leading-relaxed">{activePlatform.primaryUse}</p>
              </div>
            </div>

            {/* 3 & 4. Account Creation & Profile Setup */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">3. Account Setup & Profile Optimization</h4>
              <ul className="space-y-1.5 text-xs text-[#334E68]">
                {activePlatform.accountCreationSteps.map((st, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#168C8C] font-bold">•</span>
                    <span>{st}</span>
                  </li>
                ))}
                {activePlatform.profileSetupSteps.map((st, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#168C8C] font-bold">•</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. What Information to Add */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#142D4E] mb-2">4. Key Information to Include</h4>
              <ul className="space-y-1.5 text-xs text-[#334E68]">
                {activePlatform.infoToAdd.map((inf, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#168C8C] font-bold">✓</span>
                    <span>{inf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 6. Projects & Achievements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">5. Projects & Proof-of-Work to Upload</h4>
              <ul className="space-y-1.5 text-xs text-[#334E68]">
                {activePlatform.projectsAndAchievementsToUpload.map((pr, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#168C8C] font-bold">•</span>
                    <span>{pr}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 7. Maintenance & 8. Common Mistakes to Avoid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                <h5 className="font-bold text-emerald-900 uppercase tracking-wider mb-1.5">6. Maintenance Habits</h5>
                <ul className="space-y-1 text-emerald-800">
                  {activePlatform.maintenanceBestPractices.map((mb, i) => (
                    <li key={i}>• {mb}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs">
                <h5 className="font-bold text-rose-900 uppercase tracking-wider mb-1.5">7. Common Mistakes to Avoid</h5>
                <ul className="space-y-1 text-rose-800">
                  {activePlatform.commonMistakesToAvoid.map((cm, i) => (
                    <li key={i}>• {cm}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Checklist */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#142D4E] mb-3">
                8. Interactive Verification Checklist
              </h4>
              <div className="space-y-2.5">
                {activePlatform.checklist.map((item) => {
                  const isDone = Boolean(checklistState[activePlatform.platformId]?.[item.id]);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(activePlatform.platformId, item.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                        isDone
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                          : 'bg-white border-[#E2E8F0] hover:border-[#168C8C]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                            isDone ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                          }`}
                        >
                          {isDone && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                        <span className={isDone ? 'font-semibold' : 'text-[#202B38]'}>
                          {item.task}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase ${isDone ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {isDone ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
