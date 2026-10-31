import React, { useState, useEffect } from 'react';
import {
  Mic2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Award,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Volume2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

interface Question {
  id: string;
  track: string;
  question: string;
  category: string;
  difficulty: string;
  hints: string[];
}

interface Evaluation {
  score: number;
  strengths: string[];
  missing_aspects: string[];
  model_answer: string;
  actionable_tips: string[];
}

export const InterviewPrep: React.FC = () => {
  const { profile } = useAuth();

  const [activeTrack, setActiveTrack] = useState<'Technical' | 'HR' | 'Coding' | 'Aptitude'>('Technical');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [interviewHistory, setInterviewHistory] = useState<Array<{ question: string; score: number }>>([
    { question: 'Difference between Process and Thread', score: 8 },
    { question: 'Database Normalization (1NF, 2NF, 3NF)', score: 7 }
  ]);

  const tracks: Array<'Technical' | 'HR' | 'Coding' | 'Aptitude'> = ['Technical', 'HR', 'Coding', 'Aptitude'];

  useEffect(() => {
    loadQuestions(activeTrack);
  }, [activeTrack]);

  const loadQuestions = async (track: string) => {
    setEvaluation(null);
    setStudentAnswer('');
    setCurrentIndex(0);
    const qs = await api.getInterviewQuestions(track, profile.careerInterest);
    setQuestions(qs);
  };

  const currentQ = questions[currentIndex] || {
    id: 'default-1',
    track: activeTrack,
    question: `Explain how you would approach solving a core problem in ${profile.careerInterest}.`,
    category: 'Fundamentals',
    difficulty: 'Medium',
    hints: ['Structure using Definition, Mechanics, and Real-world Application']
  };

  const handleEvaluateAnswer = async () => {
    if (!studentAnswer.trim() || isEvaluating) return;
    setIsEvaluating(true);

    try {
      const res = await api.evaluateInterviewAnswer(
        currentQ.id,
        currentQ.question,
        activeTrack,
        studentAnswer,
        profile.careerInterest
      );
      setEvaluation(res);
      setInterviewHistory(prev => [{ question: currentQ.question, score: res.score }, ...prev]);
      if (res.score >= 7) {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    setEvaluation(null);
    setStudentAnswer('');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#168C8C]/25 text-[#2DD4BF] text-xs font-semibold px-3 py-1 rounded-full border border-[#168C8C]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Mock Interview Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Interview Preparation</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Practice one question at a time under realistic placement conditions. Get rated out of 10, receive model answers, and fix communication gaps.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center min-w-[200px]">
          <p className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">Average Mock Score</p>
          <div className="text-3xl font-extrabold text-white">7.5 / 10</div>
          <p className="text-[11px] text-slate-300 mt-1">{interviewHistory.length} mock answers graded</p>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3 shadow-sm flex space-x-2 overflow-x-auto scrollbar-none">
        {tracks.map((tr) => (
          <button
            key={tr}
            onClick={() => setActiveTrack(tr)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTrack === tr
                ? 'bg-[#142D4E] text-white shadow-sm'
                : 'text-[#334E68] hover:bg-slate-100'
            }`}
          >
            <span>{tr} Round</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Question & Student Answer Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Mock Interview Step */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Question Box */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#142D4E] text-white px-2 py-0.5 rounded">
                  Question {currentIndex + 1} of {questions.length || 1}
                </span>
                <span className="text-xs font-medium text-[#718096] bg-slate-100 px-2 py-0.5 rounded">
                  {currentQ.category}
                </span>
                <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {currentQ.difficulty}
                </span>
              </div>

              <button
                onClick={handleNextQuestion}
                className="text-xs font-semibold text-[#168C8C] hover:underline flex items-center"
              >
                <span>Skip to next</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#142D4E] leading-snug">
              "{currentQ.question}"
            </h3>

            {/* Hints Accordion */}
            {currentQ.hints && currentQ.hints.length > 0 && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#718096]">
                <span className="font-semibold text-[#142D4E] block mb-1">Interview Hints to Include:</span>
                <ul className="list-disc ml-4 space-y-0.5 text-[11px]">
                  {currentQ.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Student Answer Textarea */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">
                Your Response (Type your explanation as you would speak it)
              </label>
              <span className="text-xs text-[#718096]">
                {studentAnswer.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              rows={6}
              placeholder="Structure your answer: Start with a clear definition, explain the mechanics, state time/space complexity or trade-offs, and conclude with a practical example..."
              value={studentAnswer}
              onChange={e => setStudentAnswer(e.target.value)}
              className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-xl p-4 leading-relaxed focus:outline-none focus:border-[#168C8C]"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setStudentAnswer('')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Clear Answer
              </button>

              <button
                type="button"
                onClick={handleEvaluateAnswer}
                disabled={isEvaluating || !studentAnswer.trim()}
                className="bg-[#168C8C] hover:bg-[#127272] disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow flex items-center space-x-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isEvaluating ? 'AI Evaluating Answer...' : 'Submit Answer for AI Evaluation'}</span>
              </button>
            </div>
          </div>

          {/* AI Evaluation Report */}
          {evaluation && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#168C8C]">AI Assessment</span>
                  <h4 className="text-lg font-extrabold text-[#142D4E]">Evaluation & Feedback</h4>
                </div>
                <div className="text-right">
                  <span className={`text-3xl font-extrabold ${evaluation.score >= 7 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {evaluation.score} / 10
                  </span>
                  <p className="text-[10px] text-slate-400">Score</p>
                </div>
              </div>

              {/* Strengths & Missing Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <span className="font-bold text-emerald-900 block mb-1">What You Did Well:</span>
                  <ul className="space-y-1 text-emerald-800">
                    {evaluation.strengths.map((str, i) => (
                      <li key={i}>✓ {str}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl">
                  <span className="font-bold text-amber-900 block mb-1">Areas for Improvement:</span>
                  <ul className="space-y-1 text-amber-800">
                    {evaluation.missing_aspects.map((miss, i) => (
                      <li key={i}>⚠️ {miss}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Ideal Answer */}
              <div className="p-4 bg-[#E6F7F7]/60 border border-[#168C8C]/20 rounded-xl text-xs">
                <span className="font-bold text-[#142D4E] block mb-1">Model Ideal Answer:</span>
                <p className="text-[#202B38] leading-relaxed">{evaluation.model_answer}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="bg-[#142D4E] hover:bg-[#1E3A5F] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow flex items-center space-x-1.5"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Historical Performance & Preparation Tips */}
        <div className="lg:col-span-4 space-y-6">
          {/* History */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#142D4E]">Recent Mock Rounds</h3>
            <div className="space-y-2.5">
              {interviewHistory.map((h, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <span className="font-medium text-[#142D4E] line-clamp-1 pr-2">{h.question}</span>
                  <span className="font-bold text-[#168C8C] flex-shrink-0">{h.score} / 10</span>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Best Practice Card */}
          <div className="bg-[#142D4E] text-white rounded-2xl p-6 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2DD4BF]">Recruiter Pro Tip</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When answering technical questions, always follow the <strong>3-Step Rule</strong>:
            </p>
            <ol className="list-decimal ml-4 space-y-1 text-xs text-slate-200">
              <li>High-level definition & primary use case.</li>
              <li>Core internal mechanics & time/space trade-offs.</li>
              <li>A personal project example where you applied it.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
