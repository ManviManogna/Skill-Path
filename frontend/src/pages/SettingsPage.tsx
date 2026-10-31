import React, { useState, useEffect } from 'react';
import {
  Settings,
  User,
  Sparkles,
  Database,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, HealthStatus } from '../services/api';
import confetti from 'canvas-confetti';

export const SettingsPage: React.FC = () => {
  const { profile, updateProfile, isSupabaseConnected } = useAuth();

  const [formData, setFormData] = useState({ ...profile });
  const [skillInput, setSkillInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('skillpath_gemini_api_key') || '');
  const [apiKeySavedMsg, setApiKeySavedMsg] = useState(false);
  const [backendHealth, setBackendHealth] = useState<HealthStatus>({
    status: 'checking',
    gemini_configured: false,
    supabase_configured: false,
    mode: 'demo'
  });

  useEffect(() => {
    api.getHealth().then(setBackendHealth);
  }, []);

  const handleSaveApiKey = () => {
    const trimmed = apiKeyInput.trim();
    if (trimmed) {
      localStorage.setItem('skillpath_gemini_api_key', trimmed);
    } else {
      localStorage.removeItem('skillpath_gemini_api_key');
    }
    setApiKeySavedMsg(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setApiKeySavedMsg(false), 3000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setSavedSuccess(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.currentSkills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        currentSkills: [...prev.currentSkills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.filter(s => s !== skill)
    }));
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-extrabold tracking-tight">Account & Platform Settings</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Manage your personal student details, target career aspirations, and verify backend AI and Supabase database connectivity.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Student profile updated successfully! All roadmaps and personalized mentor prompts updated.</span>
        </div>
      )}

      {/* Backend & AI Connection Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gemini API Status */}
        {/* Gemini API Status & Configuration */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#168C8C]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">Google Gemini AI Key</h3>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
              apiKeyInput || backendHealth.gemini_configured ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
            }`}>
              {apiKeyInput || backendHealth.gemini_configured ? 'Configured' : 'Optional (Free)'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="password"
                placeholder="Enter Gemini API Key (AIzaSy...)"
                value={apiKeyInput}
                onChange={e => setApiKeyInput(e.target.value)}
                className="flex-1 text-xs border border-[#E2E8F0] rounded-lg px-3 py-1.5 font-mono focus:outline-none focus:border-[#168C8C]"
              />
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="bg-[#168C8C] hover:bg-[#127272] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
              >
                Save Key
              </button>
            </div>
            {apiKeySavedMsg && (
              <p className="text-[11px] text-emerald-600 font-semibold">✓ API Key saved! Live AI is active.</p>
            )}
            <p className="text-[11px] text-[#718096]">
              Enables live Gemini AI for all open-ended questions. Get a free key at{' '}
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#168C8C] hover:underline font-semibold">
                Google AI Studio
              </a>.
            </p>
          </div>
        </div>

        {/* Supabase Status */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">Supabase Database</h3>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
              isSupabaseConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
            }`}>
              {isSupabaseConnected ? 'Connected (RLS)' : 'Local Storage Mode'}
            </span>
          </div>
          <p className="text-xs text-[#718096] leading-relaxed">
            {isSupabaseConnected
              ? 'Real PostgreSQL database & authentication connected with user Row Level Security.'
              : 'Using client-side persistent storage. Connect VITE_SUPABASE_URL and schema.sql for cloud database sync.'}
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#142D4E] mb-5">
          Student Profile Details
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#142D4E] mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#142D4E] mb-1">College Email Address</label>
              <input
                type="email"
                disabled
                value={formData.email}
                className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#142D4E] mb-1">College / University</label>
              <input
                type="text"
                value={formData.collegeName}
                onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#142D4E] mb-1">Degree & Branch</label>
              <input
                type="text"
                value={`${formData.degree} ${formData.branch}`}
                onChange={e => setFormData({ ...formData, branch: e.target.value })}
                className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#142D4E] mb-1">Current Year</label>
              <select
                value={formData.currentYear}
                onChange={e => setFormData({ ...formData, currentYear: Number(e.target.value) })}
                className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white"
              >
                <option value={1}>1st Year</option>
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
                <option value={4}>4th Year</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#142D4E] mb-1">Graduation Year</label>
              <input
                type="number"
                value={formData.graduationYear}
                onChange={e => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#142D4E] mb-1">Daily Study Hours</label>
              <input
                type="number"
                step="0.5"
                value={formData.dailyStudyHours}
                onChange={e => setFormData({ ...formData, dailyStudyHours: Number(e.target.value) })}
                className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#142D4E] mb-1">Target Career Goal</label>
              <select
                value={formData.careerInterest}
                onChange={e => setFormData({ ...formData, careerInterest: e.target.value })}
                className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white"
              >
                <option value="Software Developer">Software Developer (SDE)</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="AI/ML Engineer">AI / Machine Learning Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Cloud Engineer">Cloud Engineer / DevOps</option>
                <option value="Cybersecurity Engineer">Cybersecurity Engineer</option>
                <option value="UI/UX Designer">UI / UX Designer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#142D4E] mb-1">Preferred Language</label>
              <select
                value={formData.preferredLanguage}
                onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value })}
                className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white"
              >
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#142D4E] mb-1">Current Skill Level</label>
              <select
                value={formData.currentLearningLevel}
                onChange={e => setFormData({ ...formData, currentLearningLevel: e.target.value as any })}
                className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-[#142D4E] mb-1">Bio / Placement Objective</label>
            <textarea
              rows={2}
              value={formData.bio || ''}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg p-2.5"
            />
          </div>

          {/* Current Skills Chips */}
          <div>
            <label className="block text-xs font-semibold text-[#142D4E] mb-1">Current Technical Skills</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Add skill (e.g. Docker, TypeScript)..."
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                className="flex-1 text-xs border border-[#E2E8F0] rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-slate-100 hover:bg-slate-200 text-xs px-4 py-2 rounded-lg font-semibold text-[#142D4E]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.currentSkills.map(sk => (
                <span key={sk} className="inline-flex items-center space-x-1.5 text-xs bg-[#E6F7F7] text-[#168C8C] px-3 py-1 rounded-lg font-medium">
                  <span>{sk}</span>
                  <button type="button" onClick={() => handleRemoveSkill(sk)} className="hover:text-rose-600 font-bold">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="bg-[#168C8C] hover:bg-[#127272] text-white font-semibold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
