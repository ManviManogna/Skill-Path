import React, { useState } from 'react';
import {
  Code2,
  Award,
  GraduationCap,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  BookOpen,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import {
  DAILY_CODING_CHALLENGES,
  SCHOLARSHIPS_DATA,
  SOFT_SKILLS_EXERCISES,
  PLACEMENT_CHECKLIST
} from '../data/bonusData';
import confetti from 'canvas-confetti';

export const AdditionalFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coding' | 'scholarships' | 'communication' | 'checklist'>('coding');

  // Daily Coding Challenge State
  const [selectedChallenge, setSelectedChallenge] = useState(DAILY_CODING_CHALLENGES[0]);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);

  // Placement Checklist State
  const [checklist, setChecklist] = useState<Array<{ id: string; category: string; task: string; completed: boolean }>>(() => {
    const saved = localStorage.getItem('skillpath_placement_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return PLACEMENT_CHECKLIST;
  });

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) => {
      const updated = prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
      localStorage.setItem('skillpath_placement_checklist', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCopySolution = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const completedChecklistCount = checklist.filter(c => c.completed).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#168C8C]/25 text-[#2DD4BF] text-xs font-semibold px-3 py-1 rounded-full border border-[#168C8C]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Success Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Additional Student Resources</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Daily coding problems, national STEM scholarships, behavioral communication guides, and master campus placement checklists.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex flex-wrap gap-1 bg-white/10 p-1.5 rounded-xl border border-white/20 self-start md:self-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('coding')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'coding' ? 'bg-[#168C8C] text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Daily Coding
          </button>
          <button
            onClick={() => setActiveTab('scholarships')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'scholarships' ? 'bg-[#168C8C] text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Scholarships
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'communication' ? 'bg-[#168C8C] text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Soft Skills
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'checklist' ? 'bg-[#168C8C] text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Placement Checklist
          </button>
        </div>
      </div>

      {/* TAB 1: DAILY CODING CHALLENGE */}
      {activeTab === 'coding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">Daily Challenges</h3>
            {DAILY_CODING_CHALLENGES.map((ch) => (
              <div
                key={ch.id}
                onClick={() => {
                  setSelectedChallenge(ch);
                  setShowSolution(false);
                  setShowHints(false);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedChallenge.id === ch.id
                    ? 'bg-white border-[#168C8C] shadow ring-1 ring-[#168C8C]'
                    : 'bg-white border-[#E2E8F0] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#142D4E]">{ch.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-50 text-emerald-700">
                    {ch.difficulty}
                  </span>
                </div>
                <p className="text-[11px] text-[#718096]">{ch.category}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#168C8C] uppercase tracking-wider">{selectedChallenge.category}</span>
                <h3 className="text-lg font-extrabold text-[#142D4E]">{selectedChallenge.title}</h3>
              </div>
              <a
                href={selectedChallenge.practiceUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#168C8C] hover:bg-[#127272] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5"
              >
                <span>Solve on LeetCode</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Problem Statement */}
            <div className="space-y-3 text-xs leading-relaxed text-[#334E68]">
              <p className="text-sm font-medium text-[#142D4E]">{selectedChallenge.problemStatement}</p>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 font-mono text-xs">
                <p><span className="text-slate-500">Example Input:</span> {selectedChallenge.exampleInput}</p>
                <p><span className="text-slate-500">Example Output:</span> {selectedChallenge.exampleOutput}</p>
              </div>
            </div>

            {/* Hints Section */}
            <div className="pt-2">
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-xs font-semibold text-[#168C8C] hover:underline flex items-center space-x-1"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showHints ? 'Hide Hints' : 'Need a Hint? (O(N) Time Complexity)'}</span>
              </button>
              {showHints && (
                <ul className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl list-disc ml-4 space-y-1 text-xs text-amber-900">
                  {selectedChallenge.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Solution Snippet */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-xs font-semibold text-[#142D4E] hover:underline"
                >
                  {showSolution ? 'Hide Model Solution' : 'Reveal Optimal Python Solution'}
                </button>
                {showSolution && (
                  <button
                    onClick={() => handleCopySolution(selectedChallenge.solutionSnippet)}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1"
                  >
                    {copiedSolution ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSolution ? 'Copied' : 'Copy Code'}</span>
                  </button>
                )}
              </div>

              {showSolution && (
                <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto">
                  {selectedChallenge.solutionSnippet}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCHOLARSHIPS DIRECTORY */}
      {activeTab === 'scholarships' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCHOLARSHIPS_DATA.map((sch) => (
            <div
              key={sch.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#168C8C]">{sch.provider}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-purple-50 text-purple-700">
                    {sch.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#142D4E] mb-2">{sch.title}</h3>
                <p className="text-xs font-extrabold text-emerald-600 mb-3">{sch.awardAmount}</p>

                <p className="text-xs text-[#718096] leading-relaxed mb-4">{sch.eligibility}</p>
                <p className="text-xs text-[#334E68] font-medium">Deadline: <span className="text-amber-700">{sch.deadline}</span></p>
              </div>

              <a
                href={sch.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 w-full text-center py-2.5 bg-[#F7F9FC] hover:bg-[#E6F7F7] text-xs font-semibold text-[#168C8C] rounded-xl border border-[#E2E8F0] hover:border-[#168C8C] transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Official Scholarship Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: COMMUNICATION & SOFT SKILLS */}
      {activeTab === 'communication' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOFT_SKILLS_EXERCISES.map((ex) => (
            <div key={ex.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#142D4E]">{ex.title}</h3>
              <p className="text-xs text-[#718096]">{ex.description}</p>

              {ex.steps && (
                <div className="space-y-2.5">
                  {ex.steps.map((st, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <span className="font-bold text-[#168C8C] mr-1.5">{st.letter} - {st.title}:</span>
                      <span className="text-[#334E68]">{st.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {ex.formula && (
                <div className="space-y-2">
                  {ex.formula.map((f, i) => (
                    <div key={i} className="p-3 bg-[#E6F7F7]/60 border border-[#168C8C]/20 rounded-xl text-xs text-[#142D4E] font-medium">
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: MASTER PLACEMENT CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-[#142D4E]">Campus Placement Readiness Checklist</h3>
              <p className="text-xs text-[#718096]">{completedChecklistCount} of {checklist.length} milestones checked</p>
            </div>
            <span className="text-sm font-bold bg-[#E6F7F7] text-[#168C8C] px-3 py-1 rounded-full">
              {Math.round((completedChecklistCount / checklist.length) * 100)}% Complete
            </span>
          </div>

          <div className="space-y-2.5">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                  item.completed
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                    : 'bg-white border-[#E2E8F0] hover:border-[#168C8C]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                      item.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                    }`}
                  >
                    {item.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                  <span className={item.completed ? 'line-through text-slate-500' : 'font-semibold text-[#142D4E]'}>
                    {item.task}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
