import React from 'react';
import {
  TrendingUp,
  Award,
  Calendar,
  Flame,
  CheckCircle2,
  AlertCircle,
  Code2,
  BookOpen,
  Map,
  FileText,
  UserCheck2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';

export const ProgressAnalytics: React.FC = () => {
  const { profile } = useAuth();

  const studyHoursHistory = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.0 },
    { day: 'Wed', hours: 2.5 },
    { day: 'Thu', hours: 4.5 },
    { day: 'Fri', hours: 3.0 },
    { day: 'Sat', hours: 5.0 },
    { day: 'Sun', hours: 3.5 }
  ];

  const monthlyStreak = [
    { week: 'W1', problems: 12 },
    { week: 'W2', problems: 15 },
    { week: 'W3', problems: 18 },
    { week: 'W4', problems: 22 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#168C8C]/25 text-[#2DD4BF] text-xs font-semibold px-3 py-1 rounded-full border border-[#168C8C]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Weekly Learning Analytics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Progress & Performance</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Continuous measurable progress tracking across daily focus hours, algorithmic problem solving, and placement milestone completion.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[130px]">
            <div className="flex items-center justify-center space-x-1 text-amber-400 font-extrabold text-2xl">
              <Flame className="w-6 h-6 fill-amber-400" />
              <span>6 Days</span>
            </div>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Active Streak</p>
          </div>
        </div>
      </div>

      {/* 8-Metric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#718096] font-medium block mb-1">Weekly Study Total</span>
          <span className="text-2xl font-extrabold text-[#142D4E]">26.0 hrs</span>
          <p className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +18% vs last week
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#718096] font-medium block mb-1">DSA Solved</span>
          <span className="text-2xl font-extrabold text-indigo-600">48 Problems</span>
          <p className="text-[11px] text-[#718096] mt-1">Goal: 100 before campus drives</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#718096] font-medium block mb-1">Roadmap Progress</span>
          <span className="text-2xl font-extrabold text-[#168C8C]">50%</span>
          <p className="text-[11px] text-[#718096] mt-1">4 of 8 milestones checked</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#718096] font-medium block mb-1">ATS Resume Score</span>
          <span className="text-2xl font-extrabold text-emerald-600">78%</span>
          <p className="text-[11px] text-[#718096] mt-1">Optimized for tech parsers</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Study Hours Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#142D4E] mb-2">Daily Study Hours Log</h3>
          <p className="text-xs text-[#718096] mb-4">Hours spent in focused self-study and coding blocks</p>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyHoursHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#718096' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#718096' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#142D4E', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="hours" fill="#168C8C" radius={[6, 6, 0, 0]} name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LeetCode Solved Trend (Area Chart) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#142D4E] mb-2">DSA Velocity Growth</h3>
          <p className="text-xs text-[#718096] mb-4">Cumulative algorithmic challenges completed by week</p>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyStreak} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#718096' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#718096' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#142D4E', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="problems" stroke="#334E68" fill="#168C8C" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Comprehensive Weekly AI Report Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#168C8C]">Performance Assessment</span>
            <h3 className="text-xl font-extrabold text-[#142D4E]">Weekly Progress Diagnostic Report</h3>
          </div>
          <span className="text-xs font-bold bg-[#E6F7F7] text-[#168C8C] px-3 py-1 rounded-full">
            Grade: A (Placement Track)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Completed Activities */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
            <span className="font-bold text-emerald-900 block flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Completed Activities This Week:</span>
            </span>
            <ul className="space-y-1 text-emerald-800">
              <li>✓ Finished 14 Pomodoro focus intervals (7.0 hours of deep coding).</li>
              <li>✓ Solved 6 LeetCode Medium problems on Binary Trees and BST traversals.</li>
              <li>✓ Configured GitHub profile README and pinned capstone project.</li>
            </ul>
          </div>

          {/* Incomplete & Areas to Improve */}
          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
            <span className="font-bold text-amber-900 block flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Areas Needing Attention Next Week:</span>
            </span>
            <ul className="space-y-1 text-amber-800">
              <li>⚠️ Missed scheduled Operating Systems revision (Process Scheduling algorithms).</li>
              <li>⚠️ Resume needs quantifiable metrics in project bullet points.</li>
            </ul>
          </div>
        </div>

        {/* Suggested Next Week Goals */}
        <div className="p-4 bg-[#F7F9FC] border border-[#E2E8F0] rounded-xl text-xs space-y-2">
          <span className="font-bold text-[#142D4E] block">AI Suggested Next Week Goals:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
              <span className="font-bold text-[#168C8C] block mb-1">Goal 1: Core CS</span>
              <span>Complete OS Paging & Virtual Memory mock questions.</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
              <span className="font-bold text-[#168C8C] block mb-1">Goal 2: Coding</span>
              <span>Solve 8 LeetCode Mediums on Dynamic Programming.</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
              <span className="font-bold text-[#168C8C] block mb-1">Goal 3: Mock Round</span>
              <span>Take 1 full-length Technical AI Mock Interview.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
