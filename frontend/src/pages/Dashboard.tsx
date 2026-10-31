import React, { useState } from 'react';
import {
  Bot,
  Map,
  Calendar,
  FileText,
  Mic2,
  Briefcase,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Plus,
  Play,
  Sparkles,
  BookOpen,
  Code2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { PomodoroTimer } from '../components/common/PomodoroTimer';
import { ReadinessGauge } from '../components/common/ReadinessGauge';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { profile } = useAuth();
  const { notifications, addReminder } = useNotifications();

  // Daily Tasks State
  const [tasks, setTasks] = useState([
    { id: 't1', text: 'Solve 2 LeetCode Mediums on Graph BFS/DFS', completed: true, category: 'Coding' },
    { id: 't2', text: 'Review DBMS Normalization & ACID properties', completed: true, category: 'Core CS' },
    { id: 't3', text: 'Tailor resume keywords for Amazon SDE Intern opening', completed: false, category: 'Resume' },
    { id: 't4', text: 'Complete 25m Pomodoro study session on Operating Systems', completed: false, category: 'Study' }
  ]);

  const [newTaskInput, setNewTaskInput] = useState('');

  // Weekly Productivity Chart Data (Recharts)
  const weeklyData = [
    { day: 'Mon', actualHours: 3.5, targetHours: 3.0 },
    { day: 'Tue', actualHours: 4.0, targetHours: 3.0 },
    { day: 'Wed', actualHours: 2.5, targetHours: 3.0 },
    { day: 'Thu', actualHours: 4.5, targetHours: 3.0 },
    { day: 'Fri', actualHours: 3.0, targetHours: 3.0 },
    { day: 'Sat', actualHours: 5.0, targetHours: 4.0 },
    { day: 'Sun', actualHours: 3.5, targetHours: 3.5 }
  ];

  // Quick Access Tools
  const quickCards = [
    {
      id: 'mentor',
      title: 'AI Student Mentor',
      desc: 'Ask placement questions, get code reviews & step-by-step guidance.',
      icon: Bot,
      color: 'bg-teal-50 text-[#168C8C] border-teal-200',
      action: 'Ask AI Now'
    },
    {
      id: 'roadmaps',
      title: 'Career Roadmap',
      desc: 'Progress through your step-by-step SDE & Full-Stack curriculum.',
      icon: Map,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      action: 'View Milestones'
    },
    {
      id: 'study-planner',
      title: 'Study Timetable',
      desc: 'Personalized study schedule & interactive Pomodoro timer.',
      icon: Calendar,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      action: 'Open Planner'
    },
    {
      id: 'resume-builder',
      title: 'Resume Builder',
      desc: 'ATS score checker & AI professional summary enhancer.',
      icon: FileText,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      action: 'Check ATS Score'
    },
    {
      id: 'skill-gap',
      title: 'Skill Gap Analyzer',
      desc: 'Identify technical skill gaps & get tailored learning recommendations.',
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      action: 'Analyze Skills'
    },
    {
      id: 'jobs-tracker',
      title: 'Explore Jobs',
      desc: 'Track campus placement drives, internships & application statuses.',
      icon: Briefcase,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      action: 'View Openings'
    }
  ];

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskInput.trim()) {
      setTasks(prev => [
        ...prev,
        {
          id: `task-${Date.now()}`,
          text: newTaskInput.trim(),
          completed: false,
          category: 'General'
        }
      ]);
      setNewTaskInput('');
    }
  };

  const completedTaskCount = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Greeting Banner with Stats */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-[#168C8C]/25 text-[#2DD4BF] text-xs font-semibold px-3 py-1 rounded-full border border-[#168C8C]/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Year {profile.currentYear} • {profile.careerInterest} Track</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {profile.fullName.split(' ')[0]}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              You are currently on a <span className="text-[#2DD4BF] font-semibold">6-day study streak</span>. Complete today's focus blocks to stay ahead of campus placement schedules.
            </p>
          </div>

          {/* Quick Metric Pills */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-xl text-center min-w-[90px]">
              <div className="flex items-center justify-center space-x-1 text-amber-400 font-bold text-lg">
                <Flame className="w-5 h-5 fill-amber-400" />
                <span>6 Days</span>
              </div>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Study Streak</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-xl text-center min-w-[90px]">
              <div className="text-lg font-bold text-white">48</div>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">DSA Solved</p>
            </div>

            <div
              onClick={() => onNavigate('readiness')}
              className="bg-[#168C8C] hover:bg-[#127272] transition-colors cursor-pointer px-4 py-3 rounded-xl text-center min-w-[100px] shadow"
            >
              <div className="text-lg font-extrabold text-white">76%</div>
              <p className="text-[10px] text-teal-100 uppercase tracking-wider font-semibold">Job Ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Progress Meters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Roadmap Progress */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#718096] mb-2 font-medium">
            <span>Roadmap Progress</span>
            <Map className="w-4 h-4 text-[#168C8C]" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold text-[#142D4E]">4 / 8</span>
              <span className="text-xs text-[#718096]">milestones</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
              <div className="bg-[#168C8C] h-2 rounded-full transition-all" style={{ width: '50%' }} />
            </div>
          </div>
          <p className="text-[11px] text-[#718096] mt-3">Next: Core Computer Science (OS & DBMS)</p>
        </div>

        {/* Coding Practice */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#718096] mb-2 font-medium">
            <span>LeetCode & DSA Target</span>
            <Code2 className="w-4 h-4 text-indigo-500" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold text-[#142D4E]">48 / 100</span>
              <span className="text-xs text-[#718096]">problems</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
              <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: '48%' }} />
            </div>
          </div>
          <p className="text-[11px] text-[#718096] mt-3">Target for Tier-1 placements: 100+ Mediums</p>
        </div>

        {/* Resume ATS Status */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#718096] mb-2 font-medium">
            <span>Resume Completion & ATS</span>
            <FileText className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold text-emerald-600">78%</span>
              <span className="text-xs text-[#718096]">ATS match</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
              <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: '78%' }} />
            </div>
          </div>
          <p className="text-[11px] text-[#718096] mt-3">Add quantifiable project metrics to reach 85%</p>
        </div>

        {/* Professional Profiles */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#718096] mb-2 font-medium">
            <span>Professional Profiles</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold text-purple-600">5 / 8</span>
              <span className="text-xs text-[#718096]">configured</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: '62%' }} />
            </div>
          </div>
          <p className="text-[11px] text-[#718096] mt-3">GitHub & LinkedIn set up; LeetCode pending</p>
        </div>
      </div>

      {/* 3. Six Core Quick-Access Cards */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#142D4E] mb-3">Quick Navigation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="bg-white rounded-2xl p-5 border border-[#E2E8F0] hover:border-[#168C8C] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#142D4E] group-hover:text-[#168C8C] transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-[#718096] mt-1 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#168C8C]">
                  <span>{card.action}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Main Two-Column Section: Schedule/Tasks & Weekly Productivity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Timetable & Daily Tasks */}
        <div className="lg:col-span-7 space-y-6">
          {/* Today's Timetable Widget */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#168C8C]" />
                <h3 className="text-base font-bold text-[#142D4E]">Today's Study Timetable</h3>
              </div>
              <button
                onClick={() => onNavigate('study-planner')}
                className="text-xs text-[#168C8C] hover:underline font-semibold"
              >
                Full Planner
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-semibold text-[#334E68] bg-white px-2 py-1 rounded border border-slate-200">
                    09:00 - 13:00
                  </span>
                  <div>
                    <p className="font-bold text-[#142D4E]">College Lectures & Lab</p>
                    <p className="text-[11px] text-[#718096]">Computer Networks & Database Systems Lab</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                  Completed
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#E6F7F7]/60 border border-[#168C8C]/30 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-[#168C8C] bg-white px-2 py-1 rounded border border-[#168C8C]/30">
                    16:00 - 17:30
                  </span>
                  <div>
                    <p className="font-bold text-[#142D4E]">Data Structures & Algorithms (DSA)</p>
                    <p className="text-[11px] text-[#718096]">Graph Traversal BFS/DFS & Shortest Path</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#168C8C] text-white px-2 py-0.5 rounded flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span>Active Now</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-semibold text-[#334E68] bg-slate-50 px-2 py-1 rounded border border-slate-200">
                    18:30 - 20:00
                  </span>
                  <div>
                    <p className="font-bold text-[#142D4E]">Full Stack Project Implementation</p>
                    <p className="text-[11px] text-[#718096]">FastAPI REST endpoints & Supabase Auth integration</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold bg-slate-100 text-[#718096] px-2 py-0.5 rounded">
                  Upcoming
                </span>
              </div>
            </div>
          </div>

          {/* Daily Tasks Checklist Widget */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#142D4E]">Daily Action Tasks</h3>
                <p className="text-xs text-[#718096]">{completedTaskCount} of {tasks.length} tasks completed today</p>
              </div>
              <span className="text-xs font-bold text-[#168C8C] bg-[#E6F7F7] px-2.5 py-1 rounded-full">
                {Math.round((completedTaskCount / tasks.length) * 100)}%
              </span>
            </div>

            {/* Tasks list */}
            <div className="space-y-2 mb-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    task.completed
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-[#E2E8F0] hover:border-[#168C8C]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-[#168C8C] accent-[#168C8C] cursor-pointer"
                    />
                    <span className={`text-xs font-medium ${task.completed ? 'line-through text-slate-500' : 'text-[#142D4E]'}`}>
                      {task.text}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {task.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick add task input */}
            <form onSubmit={handleAddTask} className="flex space-x-2">
              <input
                type="text"
                placeholder="Add a new study or coding task..."
                value={newTaskInput}
                onChange={e => setNewTaskInput(e.target.value)}
                className="flex-1 text-xs border border-[#E2E8F0] rounded-lg px-3 py-2 focus:outline-none focus:border-[#168C8C]"
              />
              <button
                type="submit"
                className="bg-[#168C8C] hover:bg-[#127272] text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Weekly Productivity Chart & Pomodoro Widget */}
        <div className="lg:col-span-5 space-y-6">
          {/* Weekly Productivity Chart (Recharts) */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#142D4E]">Weekly Study Hours</h3>
                <p className="text-xs text-[#718096]">Target vs Actual Hours (Total: 26.0 hrs)</p>
              </div>
              <TrendingUp className="w-4 h-4 text-[#168C8C]" />
            </div>

            <div className="h-52 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#718096' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#718096' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#142D4E', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    itemStyle={{ color: '#2DD4BF' }}
                  />
                  <Bar dataKey="actualHours" fill="#168C8C" radius={[4, 4, 0, 0]} name="Actual Study Hours" />
                  <Bar dataKey="targetHours" fill="#E2E8F0" radius={[4, 4, 0, 0]} name="Target Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#718096]">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#168C8C]"></span>
                <span>Actual Hours</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-300"></span>
                <span>Target Plan</span>
              </span>
              <span className="font-semibold text-emerald-600">+18% above target</span>
            </div>
          </div>

          {/* Compact Pomodoro Focus Session Timer */}
          <div>
            <PomodoroTimer
              compact={true}
              onSessionComplete={(sessions) => {
                addReminder(
                  'Focus Session Completed!',
                  `Awesome job! You just finished focus session #${sessions}. Take a 5-minute break.`,
                  'study'
                );
              }}
            />
          </div>

          {/* Upcoming Exams and Deadlines Alert Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#142D4E] mb-3 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Upcoming Exams & Deadlines</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start justify-between text-xs">
                <div>
                  <p className="font-bold text-[#142D4E]">Mid-Term: Operating Systems</p>
                  <p className="text-[11px] text-[#718096]">Topics: Process Scheduling, Paging, Virtual Memory</p>
                </div>
                <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                  in 5 days
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-start justify-between text-xs">
                <div>
                  <p className="font-bold text-[#142D4E]">Google STEP Internship Drive</p>
                  <p className="text-[11px] text-[#718096]">Submit tailored resume and verified GitHub link</p>
                </div>
                <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-[10px]">
                  in 12 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
