import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  BookOpen,
  Code2,
  Coffee,
  CheckCircle2,
  RotateCcw,
  Plus,
  Sparkles,
  AlertCircle,
  Play,
  Briefcase,
  Layers,
  ChevronRight,
  Trash2,
  Edit3,
  Copy,
  Check,
  X,
  Sliders,
  Sunrise,
  Sun,
  Moon,
  FolderGit2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { PomodoroTimer } from '../components/common/PomodoroTimer';
import confetti from 'canvas-confetti';

export type SlotCategory = 'Self-Study' | 'Coding Practice' | 'Project Work' | 'Revision' | 'College' | 'Break';

export interface ScheduleSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  category: SlotCategory;
  completed: boolean;
  notes?: string;
}

const DEFAULT_WEEK_SCHEDULE: Record<string, ScheduleSlot[]> = {
  Monday: [
    { id: 'm-1', day: 'Monday', startTime: '09:00', endTime: '13:00', subject: 'College Lectures & Labs', category: 'College', completed: true },
    { id: 'm-2', day: 'Monday', startTime: '13:00', endTime: '14:00', subject: 'Lunch & Relaxation Break', category: 'Break', completed: true },
    { id: 'm-3', day: 'Monday', startTime: '16:30', endTime: '18:00', subject: 'Data Structures & Algorithms (Trees & Graphs)', category: 'Coding Practice', completed: false },
    { id: 'm-4', day: 'Monday', startTime: '18:00', endTime: '18:30', subject: 'Evening Walk / Tea Break', category: 'Break', completed: false },
    { id: 'm-5', day: 'Monday', startTime: '18:30', endTime: '20:00', subject: 'Operating Systems (Virtual Memory & Paging)', category: 'Self-Study', completed: false },
    { id: 'm-6', day: 'Monday', startTime: '20:00', endTime: '21:00', subject: 'Dinner Break', category: 'Break', completed: false },
    { id: 'm-7', day: 'Monday', startTime: '21:00', endTime: '22:30', subject: 'Web Development Project (Frontend & API integration)', category: 'Project Work', completed: false }
  ],
  Tuesday: [
    { id: 't-1', day: 'Tuesday', startTime: '09:00', endTime: '13:00', subject: 'College Lectures & Labs', category: 'College', completed: false },
    { id: 't-2', day: 'Tuesday', startTime: '13:00', endTime: '14:00', subject: 'Lunch & Break', category: 'Break', completed: false },
    { id: 't-3', day: 'Tuesday', startTime: '16:30', endTime: '18:00', subject: 'Computer Networks (TCP/IP & OSI Model)', category: 'Self-Study', completed: false },
    { id: 't-4', day: 'Tuesday', startTime: '18:30', endTime: '20:00', subject: 'LeetCode Problem Solving (Dynamic Programming)', category: 'Coding Practice', completed: false },
    { id: 't-5', day: 'Tuesday', startTime: '21:00', endTime: '22:30', subject: 'Database Management Systems (SQL & Normalization)', category: 'Self-Study', completed: false }
  ],
  Wednesday: [
    { id: 'w-1', day: 'Wednesday', startTime: '09:00', endTime: '13:00', subject: 'College Lectures & Labs', category: 'College', completed: false },
    { id: 'w-2', day: 'Wednesday', startTime: '13:00', endTime: '14:00', subject: 'Lunch & Break', category: 'Break', completed: false },
    { id: 'w-3', day: 'Wednesday', startTime: '16:30', endTime: '18:00', subject: 'Algorithm Design & Analysis', category: 'Self-Study', completed: false },
    { id: 'w-4', day: 'Wednesday', startTime: '18:30', endTime: '20:00', subject: 'Full-Stack Project Development', category: 'Project Work', completed: false },
    { id: 'w-5', day: 'Wednesday', startTime: '21:00', endTime: '22:30', subject: 'Weekly Topic Revision & Flashcards', category: 'Revision', completed: false }
  ],
  Thursday: [
    { id: 'th-1', day: 'Thursday', startTime: '09:00', endTime: '13:00', subject: 'College Lectures & Labs', category: 'College', completed: false },
    { id: 'th-2', day: 'Thursday', startTime: '13:00', endTime: '14:00', subject: 'Lunch & Break', category: 'Break', completed: false },
    { id: 'th-3', day: 'Thursday', startTime: '16:30', endTime: '18:00', subject: 'Coding Practice: Graphs & Shortest Path', category: 'Coding Practice', completed: false },
    { id: 'th-4', day: 'Thursday', startTime: '18:30', endTime: '20:00', subject: 'Software Engineering Concepts', category: 'Self-Study', completed: false },
    { id: 'th-5', day: 'Thursday', startTime: '21:00', endTime: '22:30', subject: 'Capstone Project Code Implementation', category: 'Project Work', completed: false }
  ],
  Friday: [
    { id: 'f-1', day: 'Friday', startTime: '09:00', endTime: '13:00', subject: 'College Lectures & Labs', category: 'College', completed: false },
    { id: 'f-2', day: 'Friday', startTime: '13:00', endTime: '14:00', subject: 'Lunch & Break', category: 'Break', completed: false },
    { id: 'f-3', day: 'Friday', startTime: '16:30', endTime: '18:00', subject: 'DSA Practice & Contest Problems', category: 'Coding Practice', completed: false },
    { id: 'f-4', day: 'Friday', startTime: '18:30', endTime: '20:00', subject: 'Core CS Subject Revision', category: 'Revision', completed: false },
    { id: 'f-5', day: 'Friday', startTime: '21:00', endTime: '22:30', subject: 'Open Source / Project Contribution', category: 'Project Work', completed: false }
  ],
  Saturday: [
    { id: 'sa-1', day: 'Saturday', startTime: '10:00', endTime: '12:00', subject: 'In-Depth DSA Problem Solving', category: 'Coding Practice', completed: false },
    { id: 'sa-2', day: 'Saturday', startTime: '12:00', endTime: '13:00', subject: 'Lunch & Break', category: 'Break', completed: false },
    { id: 'sa-3', day: 'Saturday', startTime: '14:30', endTime: '17:00', subject: 'Major Project Development Sprint', category: 'Project Work', completed: false },
    { id: 'sa-4', day: 'Saturday', startTime: '18:00', endTime: '20:00', subject: 'Machine Learning / Web Dev Self-Study', category: 'Self-Study', completed: false }
  ],
  Sunday: [
    { id: 'su-1', day: 'Sunday', startTime: '10:30', endTime: '12:30', subject: 'Comprehensive Weekly Revision', category: 'Revision', completed: false },
    { id: 'su-2', day: 'Sunday', startTime: '12:30', endTime: '14:00', subject: 'Lunch & Relaxation', category: 'Break', completed: false },
    { id: 'su-3', day: 'Sunday', startTime: '15:30', endTime: '17:30', subject: 'Personal Project Coding & GitHub Push', category: 'Project Work', completed: false },
    { id: 'su-4', day: 'Sunday', startTime: '18:30', endTime: '20:00', subject: 'Plan Upcoming Week & Light Reading', category: 'Self-Study', completed: false }
  ]
};

const SUGGESTED_SUBJECTS = [
  'Data Structures & Algorithms',
  'Operating Systems',
  'Database Management (DBMS)',
  'Computer Networks',
  'Web Development (React / Node)',
  'Machine Learning & AI',
  'System Design',
  'Software Engineering'
];

export const StudyPlanner: React.FC = () => {
  const { profile } = useAuth();
  const { addReminder } = useNotifications();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [activeDay, setActiveDay] = useState<string>('Monday');

  // Master Schedule store per-day
  const [scheduleByDay, setScheduleByDay] = useState<Record<string, ScheduleSlot[]>>(() => {
    const saved = localStorage.getItem('skillpath_study_schedules_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return DEFAULT_WEEK_SCHEDULE;
  });

  const [rescheduleAlert, setRescheduleAlert] = useState<string | null>(null);

  // User Custom Generator Preferences
  const [userSubjects, setUserSubjects] = useState<string[]>([
    'Data Structures & Algorithms',
    'Operating Systems',
    'Web Development'
  ]);
  const [newSubjectInput, setNewSubjectInput] = useState('');

  const [hasCollege, setHasCollege] = useState(true);
  const [collegeStartTime, setCollegeStartTime] = useState('09:00');
  const [collegeEndTime, setCollegeEndTime] = useState('16:00');

  const [studyHours, setStudyHours] = useState(profile.dailyStudyHours || 3.0);
  const [preferredTiming, setPreferredTiming] = useState<'morning' | 'afternoon' | 'evening' | 'night' | 'distributed'>('evening');
  const [sessionLength, setSessionLength] = useState<number>(60); // 45, 60, or 90 mins

  // Modal / Inline Add & Edit Slot State
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [slotModalSubject, setSlotModalSubject] = useState('');
  const [slotModalCategory, setSlotModalCategory] = useState<SlotCategory>('Self-Study');
  const [slotModalStart, setSlotModalStart] = useState('17:00');
  const [slotModalEnd, setSlotModalEnd] = useState('18:30');

  // Active day schedule
  const activeDaySlots = scheduleByDay[activeDay] || [];

  // Save to localStorage whenever schedule changes
  useEffect(() => {
    localStorage.setItem('skillpath_study_schedules_v2', JSON.stringify(scheduleByDay));
  }, [scheduleByDay]);

  // Adjust hasCollege when day changes (weekends default false)
  useEffect(() => {
    if (activeDay === 'Saturday' || activeDay === 'Sunday') {
      setHasCollege(false);
    } else {
      setHasCollege(true);
    }
  }, [activeDay]);

  // Toggle slot completion
  const toggleSlotCompletion = (id: string) => {
    setScheduleByDay(prev => {
      const currentSlots = prev[activeDay] || [];
      const updated = currentSlots.map(slot => {
        if (slot.id === id) {
          const next = !slot.completed;
          if (next) {
            confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
          }
          return { ...slot, completed: next };
        }
        return slot;
      });
      return { ...prev, [activeDay]: updated };
    });
  };

  // Delete a slot
  const handleDeleteSlot = (id: string) => {
    setScheduleByDay(prev => ({
      ...prev,
      [activeDay]: (prev[activeDay] || []).filter(s => s.id !== id)
    }));
  };

  // Add subject tag
  const handleAddSubject = (subjectName: string) => {
    const trimmed = subjectName.trim();
    if (trimmed && !userSubjects.includes(trimmed)) {
      setUserSubjects(prev => [...prev, trimmed]);
      setNewSubjectInput('');
    }
  };

  // Remove subject tag
  const handleRemoveSubject = (subjectToRemove: string) => {
    setUserSubjects(prev => prev.filter(s => s !== subjectToRemove));
  };

  // Helper to format minutes to HH:MM string
  const minutesToTimeStr = (totalMinutes: number): string => {
    const norm = (totalMinutes + 1440) % 1440;
    const hours = Math.floor(norm / 60);
    const mins = norm % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Helper to parse HH:MM string to minutes
  const timeStrToMinutes = (timeStr: string): number => {
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  // Dynamic Generator Algorithm tailored to the user's exact requirements
  const handleGenerateTimetable = (e: React.FormEvent) => {
    e.preventDefault();

    const generated: ScheduleSlot[] = [];
    const subjectsToUse = userSubjects.length > 0
      ? userSubjects
      : ['Data Structures & Algorithms', 'Core CS Subject Study', 'Project Development'];

    // 1. If user has college on this day, insert college block
    if (hasCollege) {
      generated.push({
        id: `gen-col-${Date.now()}`,
        day: activeDay,
        startTime: collegeStartTime,
        endTime: collegeEndTime,
        subject: 'College Lectures, Labs & Academic Classes',
        category: 'College',
        completed: false
      });

      // Add lunch break if within college hours or right after
      const collegeEndMins = timeStrToMinutes(collegeEndTime);
      if (collegeEndMins <= 840) { // <= 14:00
        generated.push({
          id: `gen-break-lunch-${Date.now()}`,
          day: activeDay,
          startTime: '13:00',
          endTime: '14:00',
          subject: 'Lunch & Midday Relaxation',
          category: 'Break',
          completed: false
        });
      }
    }

    // 2. Determine target start time based on preferred timing
    let baseStartMins: number;
    switch (preferredTiming) {
      case 'morning':
        baseStartMins = 330; // 05:30 AM
        break;
      case 'afternoon':
        baseStartMins = hasCollege ? Math.max(timeStrToMinutes(collegeEndTime) + 30, 810) : 810; // 13:30
        break;
      case 'evening':
        baseStartMins = hasCollege ? Math.max(timeStrToMinutes(collegeEndTime) + 45, 1050) : 1050; // 17:30
        break;
      case 'night':
        baseStartMins = 1260; // 21:00 (9:00 PM)
        break;
      case 'distributed':
      default:
        baseStartMins = hasCollege ? Math.max(timeStrToMinutes(collegeEndTime) + 40, 1020) : 600; // 17:00 or 10:00 AM
        break;
    }

    // 3. Generate study slots that match studyHours
    const totalStudyMinutes = Math.round(studyHours * 60);
    const numSessions = Math.max(1, Math.round(totalStudyMinutes / sessionLength));
    const actualSessionDuration = Math.round(totalStudyMinutes / numSessions);

    let currentStartMins = baseStartMins;

    for (let i = 0; i < numSessions; i++) {
      const subjectName = subjectsToUse[i % subjectsToUse.length];
      const slotEndMins = currentStartMins + actualSessionDuration;

      // Determine category based on subject name
      let slotCategory: SlotCategory = 'Self-Study';
      const sLower = subjectName.toLowerCase();
      if (sLower.includes('algorithm') || sLower.includes('dsa') || sLower.includes('leetcode') || sLower.includes('coding')) {
        slotCategory = 'Coding Practice';
      } else if (sLower.includes('project') || sLower.includes('web') || sLower.includes('app') || sLower.includes('development')) {
        slotCategory = 'Project Work';
      } else if (sLower.includes('revision') || sLower.includes('flashcard')) {
        slotCategory = 'Revision';
      }

      generated.push({
        id: `gen-slot-${i}-${Date.now()}`,
        day: activeDay,
        startTime: minutesToTimeStr(currentStartMins),
        endTime: minutesToTimeStr(slotEndMins),
        subject: `${subjectName} (${slotCategory})`,
        category: slotCategory,
        completed: false
      });

      // Insert short break between study sessions if there are more
      if (i < numSessions - 1) {
        const breakStartMins = slotEndMins;
        const breakEndMins = breakStartMins + 15; // 15 min rest
        generated.push({
          id: `gen-break-${i}-${Date.now()}`,
          day: activeDay,
          startTime: minutesToTimeStr(breakStartMins),
          endTime: minutesToTimeStr(breakEndMins),
          subject: 'Short Rest & Recharge Break',
          category: 'Break',
          completed: false
        });
        currentStartMins = breakEndMins;
      } else {
        currentStartMins = slotEndMins;
      }
    }

    // Sort generated slots by start time
    generated.sort((a, b) => timeStrToMinutes(a.startTime) - timeStrToMinutes(b.startTime));

    setScheduleByDay(prev => ({
      ...prev,
      [activeDay]: generated
    }));

    addReminder(
      'Schedule Generated',
      `Your custom study timetable for ${activeDay} with ${userSubjects.length} subjects is now active.`,
      'study'
    );
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  };

  // Copy active day schedule to all weekdays (Mon-Fri) or all 7 days
  const handleCopySchedule = (target: 'weekdays' | 'all') => {
    const currentSlots = activeDaySlots;
    const targetDays = target === 'weekdays'
      ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      : days;

    setScheduleByDay(prev => {
      const updated = { ...prev };
      targetDays.forEach(d => {
        updated[d] = currentSlots.map((s, idx) => ({
          ...s,
          id: `copied-${d}-${idx}-${Date.now()}`,
          day: d,
          completed: false
        }));
      });
      return updated;
    });

    setRescheduleAlert(`Successfully copied ${activeDay}'s custom schedule to ${target === 'weekdays' ? 'all weekdays (Mon-Fri)' : 'all 7 days'}!`);
    setTimeout(() => setRescheduleAlert(null), 4000);
  };

  // Automatically reschedule missed/pending sessions into evening catch-up blocks
  const handleMissedSessionReschedule = () => {
    setScheduleByDay(prev => {
      const current = prev[activeDay] || [];
      const updated = current.map(s => {
        if (!s.completed && s.category !== 'College') {
          return {
            ...s,
            startTime: '21:30',
            endTime: '22:45',
            subject: `[Rescheduled Catch-Up] ${s.subject}`
          };
        }
        return s;
      });
      return { ...prev, [activeDay]: updated };
    });
    setRescheduleAlert('Timetable adjusted! Pending study topics have been consolidated into late-evening sprint blocks.');
    setTimeout(() => setRescheduleAlert(null), 4000);
  };

  // Open modal to add custom slot
  const handleOpenAddSlot = () => {
    setEditingSlotId(null);
    setSlotModalSubject('');
    setSlotModalCategory('Self-Study');
    setSlotModalStart('17:00');
    setSlotModalEnd('18:15');
    setShowSlotModal(true);
  };

  // Open modal to edit existing slot
  const handleOpenEditSlot = (slot: ScheduleSlot) => {
    setEditingSlotId(slot.id);
    setSlotModalSubject(slot.subject);
    setSlotModalCategory(slot.category);
    setSlotModalStart(slot.startTime);
    setSlotModalEnd(slot.endTime);
    setShowSlotModal(true);
  };

  // Save Add/Edit slot modal
  const handleSaveSlotModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slotModalSubject.trim()) return;

    if (editingSlotId) {
      // Editing existing slot
      setScheduleByDay(prev => {
        const slots = prev[activeDay] || [];
        const updated = slots.map(s => {
          if (s.id === editingSlotId) {
            return {
              ...s,
              subject: slotModalSubject.trim(),
              category: slotModalCategory,
              startTime: slotModalStart,
              endTime: slotModalEnd
            };
          }
          return s;
        });
        updated.sort((a, b) => timeStrToMinutes(a.startTime) - timeStrToMinutes(b.startTime));
        return { ...prev, [activeDay]: updated };
      });
    } else {
      // Adding new custom slot
      const newSlot: ScheduleSlot = {
        id: `custom-slot-${Date.now()}`,
        day: activeDay,
        startTime: slotModalStart,
        endTime: slotModalEnd,
        subject: slotModalSubject.trim(),
        category: slotModalCategory,
        completed: false
      };
      setScheduleByDay(prev => {
        const slots = [...(prev[activeDay] || []), newSlot];
        slots.sort((a, b) => timeStrToMinutes(a.startTime) - timeStrToMinutes(b.startTime));
        return { ...prev, [activeDay]: slots };
      });
    }

    setShowSlotModal(false);
  };

  const getCategoryBadge = (cat: SlotCategory) => {
    switch (cat) {
      case 'College':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Coding Practice':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Project Work':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Revision':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Self-Study':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Break':
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#168C8C]/25 text-[#2DD4BF] text-xs font-semibold px-3 py-1 rounded-full border border-[#168C8C]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Schedule Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Study Timetable & Pomodoro</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Generates your daily schedule tailored exactly to your university classes, chosen study subjects, coding practice, and project development.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleMissedSessionReschedule}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow transition-colors flex items-center justify-center space-x-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Missed a Session? Reschedule</span>
          </button>
        </div>
      </div>

      {rescheduleAlert && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{rescheduleAlert}</span>
        </div>
      )}

      {/* Main Grid: Generator Preferences & Live Interactive Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Personalized Timetable Generator Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Sliders className="w-4 h-4 text-[#168C8C]" />
              <h3 className="text-base font-bold text-[#142D4E]">Personalized Schedule Generator</h3>
            </div>

            <form onSubmit={handleGenerateTimetable} className="space-y-4">
              {/* Target Subjects Section */}
              <div>
                <label className="block text-xs font-bold text-[#142D4E] mb-1">
                  Subjects & Topics You Want to Study
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {userSubjects.map(sub => (
                    <span
                      key={sub}
                      className="inline-flex items-center text-[11px] font-semibold bg-[#E6F7F7] text-[#168C8C] border border-[#168C8C]/30 px-2 py-0.5 rounded-lg"
                    >
                      {sub}
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(sub)}
                        className="ml-1 text-slate-400 hover:text-rose-600 focus:outline-none"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSubjectInput}
                    onChange={e => setNewSubjectInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubject(newSubjectInput);
                      }
                    }}
                    placeholder="Type subject & press Enter"
                    className="flex-1 text-xs border border-[#E2E8F0] rounded-lg px-3 py-2 focus:outline-none focus:border-[#168C8C]"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSubject(newSubjectInput)}
                    className="bg-slate-100 hover:bg-slate-200 text-xs font-semibold px-3 py-2 rounded-lg text-[#142D4E]"
                  >
                    Add
                  </button>
                </div>

                {/* Popular subject suggestion chips */}
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-[10px] text-slate-400 mr-1 self-center">Suggestions:</span>
                  {SUGGESTED_SUBJECTS.filter(s => !userSubjects.includes(s)).slice(0, 4).map(suggested => (
                    <button
                      key={suggested}
                      type="button"
                      onClick={() => handleAddSubject(suggested)}
                      className="text-[10px] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 transition-colors"
                    >
                      + {suggested.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* College Hours Toggle & Time Pickers */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#142D4E] flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#168C8C]" />
                    <span>Has College / Classes on {activeDay}?</span>
                  </label>
                  <input
                    type="checkbox"
                    checked={hasCollege}
                    onChange={e => setHasCollege(e.target.checked)}
                    className="w-4 h-4 accent-[#168C8C] rounded cursor-pointer"
                  />
                </div>

                {hasCollege ? (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block mb-0.5">Start Time</span>
                      <input
                        type="time"
                        value={collegeStartTime}
                        onChange={e => setCollegeStartTime(e.target.value)}
                        className="w-full text-xs border border-[#E2E8F0] rounded-lg px-2 py-1.5 bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block mb-0.5">End Time</span>
                      <input
                        type="time"
                        value={collegeEndTime}
                        onChange={e => setCollegeEndTime(e.target.value)}
                        className="w-full text-xs border border-[#E2E8F0] rounded-lg px-2 py-1.5 bg-white"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ✨ Marked as Holiday / No College! Full day available for customized study blocks.
                  </p>
                )}
              </div>

              {/* Target Study Hours */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#142D4E]">Target Daily Study Duration</label>
                  <span className="text-xs font-bold text-[#168C8C]">{studyHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={studyHours}
                  onChange={e => setStudyHours(Number(e.target.value))}
                  className="w-full accent-[#168C8C]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
                  <span>1 hr</span>
                  <span>4 hrs</span>
                  <span>8 hrs</span>
                </div>
              </div>

              {/* Preferred Study Timings */}
              <div>
                <label className="block text-xs font-bold text-[#142D4E] mb-1">Preferred Study Timings</label>
                <select
                  value={preferredTiming}
                  onChange={e => setPreferredTiming(e.target.value as any)}
                  className="w-full text-xs sm:text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white"
                >
                  <option value="evening">Evening (5:30 PM - 9:00 PM)</option>
                  <option value="morning">Early Morning (5:30 AM - 9:00 AM)</option>
                  <option value="afternoon">Afternoon (1:30 PM - 5:00 PM)</option>
                  <option value="night">Night Owl (9:00 PM - 1:00 AM)</option>
                  <option value="distributed">Distributed Spaced Blocks Throughout Day</option>
                </select>
              </div>

              {/* Session Block Length */}
              <div>
                <label className="block text-xs font-bold text-[#142D4E] mb-1">Session Block Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '45 mins', value: 45 },
                    { label: '60 mins', value: 60 },
                    { label: '90 mins', value: 90 }
                  ].map(item => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setSessionLength(item.value)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                        sessionLength === item.value
                          ? 'bg-[#168C8C] text-white border-[#168C8C]'
                          : 'bg-white border-[#E2E8F0] text-[#334E68] hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Regenerate Button */}
              <button
                type="submit"
                className="w-full bg-[#168C8C] hover:bg-[#127272] text-white font-semibold py-2.5 rounded-lg text-xs sm:text-sm flex items-center justify-center space-x-1.5 shadow transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Schedule for {activeDay}</span>
              </button>
            </form>
          </div>

          {/* Integrated Pomodoro Timer */}
          <div>
            <PomodoroTimer
              onSessionComplete={(count) => {
                addReminder(
                  'Study Interval Logged',
                  `Great focus! Pomodoro block #${count} marked complete on your study log.`,
                  'study'
                );
              }}
            />
          </div>
        </div>

        {/* Right Column: Day Selector & Time Slots Timeline */}
        <div className="lg:col-span-7 space-y-4">
          {/* Day Selector Pills */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3 shadow-sm flex space-x-1.5 overflow-x-auto scrollbar-none">
            {days.map((day) => {
              const daySlots = scheduleByDay[day] || [];
              const completedCount = daySlots.filter(s => s.completed).length;

              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-1 text-center flex flex-col items-center justify-center ${
                    activeDay === day
                      ? 'bg-[#142D4E] text-white shadow-sm'
                      : 'text-[#334E68] hover:bg-slate-100'
                  }`}
                >
                  <span>{day.slice(0, 3)}</span>
                  {daySlots.length > 0 && (
                    <span className={`text-[9px] mt-0.5 px-1 rounded ${
                      activeDay === day ? 'text-[#2DD4BF]' : 'text-slate-400'
                    }`}>
                      {completedCount}/{daySlots.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Slots List Header & Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#142D4E] flex items-center space-x-2">
                  <span>{activeDay} Schedule</span>
                  <span className="text-xs font-normal text-slate-500">
                    ({activeDaySlots.length} blocks)
                  </span>
                </h3>
                <span className="text-xs text-[#718096]">Click checkmark to log completion</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleOpenAddSlot}
                  className="bg-[#168C8C] hover:bg-[#127272] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Slot</span>
                </button>

                <div className="flex items-center space-x-1 text-xs">
                  <button
                    onClick={() => handleCopySchedule('weekdays')}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold"
                    title="Copy this schedule to Mon-Fri"
                  >
                    Copy to Mon-Fri
                  </button>
                  <button
                    onClick={() => handleCopySchedule('all')}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold"
                    title="Copy this schedule to All 7 Days"
                  >
                    Copy to All Days
                  </button>
                </div>
              </div>
            </div>

            {/* Slots List */}
            {activeDaySlots.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl space-y-2">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">No slots scheduled for {activeDay} yet.</p>
                <button
                  onClick={handleOpenAddSlot}
                  className="text-xs text-[#168C8C] hover:underline font-bold"
                >
                  + Add a custom slot or click "Generate Schedule" on the left
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {activeDaySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 group ${
                      slot.completed
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : 'bg-white border-[#E2E8F0] hover:border-[#168C8C] hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <button
                        onClick={() => toggleSlotCompletion(slot.id)}
                        className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                          slot.completed
                            ? 'bg-emerald-500 text-white'
                            : 'border border-slate-300 text-transparent hover:border-slate-400'
                        }`}
                        title={slot.completed ? 'Mark incomplete' : 'Mark completed'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-[#142D4E]">
                            {slot.startTime} - {slot.endTime}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getCategoryBadge(slot.category)}`}>
                            {slot.category}
                          </span>
                        </div>

                        <h4 className={`text-sm font-semibold mt-1 break-words ${slot.completed ? 'line-through text-slate-500' : 'text-[#142D4E]'}`}>
                          {slot.subject}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 flex-shrink-0">
                      {slot.category === 'Coding Practice' && !slot.completed && (
                        <span className="hidden sm:inline text-[10px] font-bold bg-[#168C8C] text-white px-2 py-0.5 rounded-md">
                          Pomodoro Ready
                        </span>
                      )}

                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEditSlot(slot)}
                        className="p-1 text-slate-400 hover:text-[#168C8C] rounded transition-colors"
                        title="Edit slot"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Delete slot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Custom Slot Modal */}
      {showSlotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#142D4E]/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-[#E2E8F0] overflow-hidden">
            <div className="bg-[#142D4E] text-white p-4 flex items-center justify-between">
              <span className="font-bold text-sm">
                {editingSlotId ? 'Edit Schedule Slot' : `Add Custom Slot to ${activeDay}`}
              </span>
              <button
                onClick={() => setShowSlotModal(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSlotModal} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#142D4E] mb-1">Subject / Activity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Discrete Mathematics or LeetCode Dynamic Programming"
                  value={slotModalSubject}
                  onChange={e => setSlotModalSubject(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#168C8C]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#142D4E] mb-1">Category</label>
                <select
                  value={slotModalCategory}
                  onChange={e => setSlotModalCategory(e.target.value as SlotCategory)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#168C8C]"
                >
                  <option value="Self-Study">Self-Study</option>
                  <option value="Coding Practice">Coding Practice</option>
                  <option value="Project Work">Project Work</option>
                  <option value="Revision">Revision</option>
                  <option value="College">College</option>
                  <option value="Break">Break</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#142D4E] mb-1">Start Time</label>
                  <input
                    type="time"
                    required
                    value={slotModalStart}
                    onChange={e => setSlotModalStart(e.target.value)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#168C8C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#142D4E] mb-1">End Time</label>
                  <input
                    type="time"
                    required
                    value={slotModalEnd}
                    onChange={e => setSlotModalEnd(e.target.value)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#168C8C]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSlotModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#168C8C] hover:bg-[#127272] text-white px-4 py-2 rounded-lg text-xs font-bold shadow"
                >
                  {editingSlotId ? 'Save Changes' : 'Add Slot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
