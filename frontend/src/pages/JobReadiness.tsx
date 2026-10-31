import React, { useState, useEffect } from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  BookOpen,
  Code2,
  FolderGit2,
  FileText,
  UserCheck2,
  Mic2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ReadinessGauge } from '../components/common/ReadinessGauge';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export const JobReadiness: React.FC = () => {
  const { profile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [readinessData, setReadinessData] = useState<any>(null);

  useEffect(() => {
    fetchScore();
  }, []);

  const fetchScore = async () => {
    setLoading(true);
    try {
      const result = await api.calculateReadiness({
        skills_count: profile.currentSkills.length || 5,
        target_skills_total: 8,
        projects_completed: 2,
        resume_ats_score: 78,
        profiles_completed: 5,
        coding_problems_solved: 48,
        mock_interviews_completed: 3
      });
      setReadinessData(result);
      if (result.overall_score >= 70) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    } finally {
      setLoading(false);
    }
  };

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Technical Skills': return Code2;
      case 'Projects Portfolio': return FolderGit2;
      case 'Resume & ATS': return FileText;
      case 'Professional Profiles': return UserCheck2;
      case 'Coding Practice (DSA)': return TrendingUp;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Clear Disclaimer */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#168C8C]/25 text-[#2DD4BF] text-xs font-semibold px-3 py-1 rounded-full border border-[#168C8C]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Holistic Diagnostic Index</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Job Readiness Score</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A comprehensive algorithm computing your placement readiness across 5 foundational pillars: skills, projects, resume ATS, public profiles, and DSA practice.
          </p>
        </div>

        <button
          onClick={fetchScore}
          disabled={loading}
          className="bg-[#168C8C] hover:bg-[#127272] text-white text-xs font-bold px-5 py-3 rounded-xl shadow transition-colors flex items-center justify-center space-x-1.5 self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? 'Recalculating...' : 'Recalculate Score'}</span>
        </button>
      </div>

      {/* Prominent Employment Disclaimer Notice */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center space-x-2">
        <ShieldAlert className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <span>
          <strong>Important Disclaimer:</strong> The Job Readiness Score is an automated preparation diagnostic indicator designed to guide your daily learning efforts. It is not an offer or guarantee of employment by any recruiting company.
        </span>
      </div>

      {/* Main Scorecard Overview */}
      {readinessData && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0">
            <ReadinessGauge
              score={readinessData.overall_score}
              size={210}
              statusLabel={readinessData.status_label}
            />
            <p className="text-xs text-[#718096] mt-4 text-center max-w-xs">
              Based on benchmarks from campus placement drives at Google, Amazon, TCS Digital, and tech startups.
            </p>
          </div>

          <div className="md:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-[#142D4E]">Candidate Diagnostic Summary</h3>

            {/* Strengths & Weak Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                <span className="font-bold text-emerald-900 block flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strong Placement Pillars:</span>
                </span>
                <ul className="space-y-1 text-emerald-800">
                  {readinessData.strong_areas?.map((st: string, i: number) => (
                    <li key={i}>✓ {st}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                <span className="font-bold text-amber-900 block flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Priority Weak Areas:</span>
                </span>
                <ul className="space-y-1 text-amber-800">
                  {readinessData.weak_areas?.length > 0 ? (
                    readinessData.weak_areas.map((wk: string, i: number) => (
                      <li key={i}>⚠️ {wk}</li>
                    ))
                  ) : (
                    <li>All pillars above 60% threshold.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Recommended Next Action Items */}
            <div className="p-4 bg-[#E6F7F7]/60 border border-[#168C8C]/20 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-[#142D4E] block">Recommended Immediate Action Steps:</span>
              <ul className="space-y-1.5 text-[#202B38]">
                {readinessData.action_items?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#168C8C] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 6 Category Breakdown Grid */}
      {readinessData && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#142D4E]">
            Six Pillars Evaluation Breakdown
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {readinessData.category_scores?.map((cat: any, idx: number) => {
              const Icon = getPillarIcon(cat.name);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#142D4E]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-[#142D4E]">{cat.name}</h4>
                    </div>
                    <span className="text-xs font-bold text-[#168C8C]">{cat.score}%</span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-[#168C8C] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#718096] pt-1">
                    <span>{cat.feedback}</span>
                    <span className="font-semibold text-slate-500">Weight: {cat.weight_pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
