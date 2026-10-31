import React, { useState } from 'react';
import { X, Sparkles, Compass, CheckCircle2, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { StudentProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess
}) => {
  const { login, signup, resetPassword, isLoading } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'onboarding'>(initialMode);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Onboarding Data
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<StudentProfile>>({
    fullName: '',
    collegeName: '',
    degree: 'B.Tech',
    branch: 'Computer Science',
    currentYear: 2,
    graduationYear: 2027,
    currentSkills: ['Python', 'C++', 'SQL'],
    preferredLanguage: 'Python',
    careerInterest: 'Software Developer',
    currentLearningLevel: 'Beginner',
    dailyStudyHours: 2.5
  });

  const [skillInput, setSkillInput] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await login(email, password);
    if (res.success) {
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to login');
    }
  };

  const handleStartSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    // Proceed to Step 1 of student details onboarding
    setMode('onboarding');
    setOnboardingStep(1);
  };

  const handleForgotPass = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const res = await resetPassword(email);
    setSuccessMsg(res.message);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.currentSkills?.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        currentSkills: [...(prev.currentSkills || []), skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      currentSkills: prev.currentSkills?.filter(s => s !== skill)
    }));
  };

  const handleFinishOnboarding = async () => {
    setErrorMsg('');
    const res = await signup(email, password, formData);
    if (res.success) {
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(res.error || 'Signup failed during onboarding');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#142D4E]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#142D4E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#168C8C] flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base">SkillPath <span className="text-[#168C8C]">AI</span></span>
              <p className="text-[11px] text-slate-300">
                {mode === 'login' && 'Sign in to access your student dashboard'}
                {mode === 'signup' && 'Create your student account'}
                {mode === 'forgot' && 'Reset your password'}
                {mode === 'onboarding' && `Student Profile Setup (Step ${onboardingStep} of 2)`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. LOGIN MODE */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#142D4E] mb-1">Student Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#168C8C]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#142D4E]">Password</label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setErrorMsg(''); }}
                    className="text-xs text-[#168C8C] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#168C8C]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#168C8C] hover:bg-[#127272] text-white font-semibold py-2.5 rounded-lg text-sm shadow transition-colors"
              >
                {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-[#718096]">New to SkillPath AI? </span>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setErrorMsg(''); }}
                  className="text-xs font-bold text-[#168C8C] hover:underline"
                >
                  Create Student Account
                </button>
              </div>
            </form>
          )}

          {/* 2. SIGNUP INITIATION */}
          {mode === 'signup' && (
            <form onSubmit={handleStartSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#142D4E] mb-1">Student Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@college.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#168C8C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142D4E] mb-1">Create Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#168C8C]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#168C8C] hover:bg-[#127272] text-white font-semibold py-2.5 rounded-lg text-sm shadow flex items-center justify-center space-x-2"
              >
                <span>Continue to Profile Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-[#718096]">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(''); }}
                  className="text-xs font-bold text-[#168C8C] hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* 3. FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPass} className="space-y-4">
              <p className="text-xs text-[#718096]">
                Enter your student email and we'll send you instructions to reset your password.
              </p>
              <div>
                <label className="block text-xs font-semibold text-[#142D4E] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#168C8C]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#168C8C] hover:bg-[#127272] text-white font-semibold py-2.5 rounded-lg text-sm shadow"
              >
                Send Reset Link
              </button>

              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                className="w-full text-center text-xs text-[#718096] hover:underline"
              >
                Back to Sign In
              </button>
            </form>
          )}

          {/* 4. STUDENT ONBOARDING WIZARD */}
          {mode === 'onboarding' && (
            <div className="space-y-4">
              {/* Step 1: Academic Background */}
              {onboardingStep === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#142D4E] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3.5 py-2 focus:outline-none focus:border-[#168C8C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142D4E] mb-1">College / University Name</label>
                    <input
                      type="text"
                      placeholder="e.g. National Institute of Technology"
                      value={formData.collegeName}
                      onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                      className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3.5 py-2 focus:outline-none focus:border-[#168C8C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#142D4E] mb-1">Degree</label>
                      <select
                        value={formData.degree}
                        onChange={e => setFormData({ ...formData, degree: e.target.value })}
                        className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white"
                      >
                        <option value="B.Tech">B.Tech / B.E.</option>
                        <option value="B.Sc">B.Sc Computer Science / IT</option>
                        <option value="BCA">BCA</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="MCA">MCA</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#142D4E] mb-1">Branch</label>
                      <input
                        type="text"
                        placeholder="e.g. Computer Science"
                        value={formData.branch}
                        onChange={e => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#142D4E] mb-1">Current Academic Year</label>
                      <select
                        value={formData.currentYear}
                        onChange={e => setFormData({ ...formData, currentYear: Number(e.target.value) })}
                        className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white"
                      >
                        <option value={1}>1st Year (Freshman)</option>
                        <option value={2}>2nd Year (Sophomore)</option>
                        <option value={3}>3rd Year (Junior)</option>
                        <option value={4}>4th Year (Senior)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#142D4E] mb-1">Graduation Year</label>
                      <input
                        type="number"
                        value={formData.graduationYear}
                        onChange={e => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                        className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOnboardingStep(2)}
                    className="w-full mt-4 bg-[#168C8C] hover:bg-[#127272] text-white font-semibold py-2.5 rounded-lg text-sm flex items-center justify-center space-x-2"
                  >
                    <span>Next: Skills & Career Goal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Tech Skills & Career Focus */}
              {onboardingStep === 2 && (
                <div className="space-y-3">
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

                  <div className="grid grid-cols-2 gap-3">
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
                        <option value="JavaScript">JavaScript / TypeScript</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#142D4E] mb-1">Current Learning Level</label>
                      <select
                        value={formData.currentLearningLevel}
                        onChange={e => setFormData({ ...formData, currentLearningLevel: e.target.value as any })}
                        className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white"
                      >
                        <option value="Beginner">Beginner (Starting out)</option>
                        <option value="Intermediate">Intermediate (Know basics)</option>
                        <option value="Advanced">Advanced (Projects ready)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142D4E] mb-1">Daily Available Study Hours</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="1"
                        max="8"
                        step="0.5"
                        value={formData.dailyStudyHours}
                        onChange={e => setFormData({ ...formData, dailyStudyHours: Number(e.target.value) })}
                        className="flex-1 accent-[#168C8C]"
                      />
                      <span className="text-xs font-bold text-[#168C8C] w-16">{formData.dailyStudyHours} hrs/day</span>
                    </div>
                  </div>

                  {/* Skills Tag Input */}
                  <div>
                    <label className="block text-xs font-semibold text-[#142D4E] mb-1">Current Technical Skills</label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="e.g. React, Docker, SQL..."
                        value={skillInput}
                        onChange={e => setSkillInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                        className="flex-1 text-xs border border-[#E2E8F0] rounded-lg px-3 py-1.5"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="bg-slate-100 hover:bg-slate-200 text-xs px-3 py-1.5 rounded-lg font-semibold text-[#142D4E]"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.currentSkills?.map(sk => (
                        <span key={sk} className="inline-flex items-center space-x-1 text-[11px] bg-[#E6F7F7] text-[#168C8C] px-2 py-0.5 rounded-md font-medium">
                          <span>{sk}</span>
                          <button type="button" onClick={() => handleRemoveSkill(sk)} className="hover:text-rose-500">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(1)}
                      className="px-4 py-2.5 border border-[#E2E8F0] text-xs font-semibold text-slate-600 rounded-lg hover:bg-slate-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleFinishOnboarding}
                      disabled={isLoading}
                      className="flex-1 bg-[#168C8C] hover:bg-[#127272] text-white font-semibold py-2.5 rounded-lg text-sm flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isLoading ? 'Creating Profile...' : 'Complete & Launch Platform'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
