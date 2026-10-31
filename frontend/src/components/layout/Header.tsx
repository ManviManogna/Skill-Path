import React, { useState, useEffect } from 'react';
import {
  Bell,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Menu,
  Check,
  Trash2,
  X,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { api, HealthStatus } from '../../services/api';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenMobileSidebar
}) => {
  const { profile } = useAuth();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    browserPermission,
    requestBrowserPermission
  } = useNotifications();

  const [showNotifications, setShowNotifications] = useState(false);
  const [backendHealth, setBackendHealth] = useState<HealthStatus>({
    status: 'checking',
    gemini_configured: false,
    supabase_configured: false,
    mode: 'demo'
  });

  useEffect(() => {
    api.getHealth().then(setBackendHealth);
  }, []);

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const getPageTitle = (id: string): { title: string; subtitle: string } => {
    switch (id) {
      case 'dashboard':
        return { title: 'Student Dashboard', subtitle: 'Welcome back, track your daily learning and placement milestones.' };
      case 'mentor':
        return { title: 'AI Student Mentor', subtitle: 'Your 24/7 personal tech and placement advisor powered by Gemini AI.' };
      case 'roadmaps':
        return { title: 'My Career Roadmap', subtitle: 'Step-by-step milestones, free resources, and exercises to become job-ready.' };
      case 'skill-gap':
        return { title: 'Skill Gap Analyzer', subtitle: 'Compare your skills against target job roles and get a personalized plan.' };
      case 'study-planner':
        return { title: 'AI Study Timetable & Pomodoro', subtitle: 'Balanced college, self-study, and coding schedule with focused intervals.' };
      case 'resume-builder':
        return { title: 'AI Resume Builder & ATS Checker', subtitle: 'Create an industry-standard tech resume and test against job descriptions.' };
      case 'professional-profiles':
        return { title: 'Build Your Professional Presence', subtitle: 'Comprehensive setup guides and checklists for GitHub, LinkedIn, and LeetCode.' };
      case 'jobs-tracker':
        return { title: 'Jobs & Internships Tracker', subtitle: 'Track verified opportunities, application stages, and dates.' };
      case 'my-progress':
        return { title: 'My Learning Progress', subtitle: 'Analytics on study hours, coding consistency, and weekly performance.' };
      case 'readiness':
        return { title: 'Job Readiness Score', subtitle: 'Comprehensive evaluation across 6 critical placement pillars.' };
      case 'notifications':
        return { title: 'Smart Reminder Center', subtitle: 'Manage notifications for study sessions, deadlines, and interviews.' };
      case 'settings':
        return { title: 'Account & Platform Settings', subtitle: 'Update your student profile, career goals, and API credentials.' };
      default:
        return { title: 'SkillPath AI', subtitle: 'Learn Skills. Build Your Future. Become Job-Ready.' };
    }
  };

  const pageInfo = getPageTitle(currentPage);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 py-3.5 transition-all">
      <div className="flex items-center justify-between">
        {/* Mobile menu trigger & Page Info */}
        <div className="flex items-center space-x-3">
          {onOpenMobileSidebar && (
            <button
              onClick={onOpenMobileSidebar}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <h1 className="text-xl font-bold text-[#142D4E] tracking-tight">{pageInfo.title}</h1>
            <p className="text-xs text-[#718096] hidden sm:block">{pageInfo.subtitle}</p>
          </div>
        </div>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* AI Status Badge */}
          <div
            onClick={() => onNavigate('settings')}
            className={`cursor-pointer hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
              backendHealth.gemini_configured
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            }`}
            title={
              backendHealth.gemini_configured
                ? 'Live Gemini AI Backend Active'
                : 'Intelligent Demo Mode Active (Click Settings to configure Gemini API key)'
            }
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{backendHealth.gemini_configured ? 'Live Gemini AI' : 'AI Demo Mode'}</span>
          </div>

          {/* Today's Date Pill */}
          <div className="hidden lg:flex items-center space-x-1.5 text-xs text-[#334E68] bg-[#F7F9FC] border border-[#E2E8F0] px-3 py-1.5 rounded-lg">
            <Calendar className="w-3.5 h-3.5 text-[#168C8C]" />
            <span className="font-medium">{todayFormatted}</span>
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-[#142D4E] hover:bg-slate-100 rounded-lg transition-colors"
              title="Notifications & Reminders"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-[#142D4E] text-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-[#168C8C]" />
                    <span className="font-semibold text-sm">Notifications & Reminders</span>
                    {unreadCount > 0 && (
                      <span className="bg-rose-500 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-300 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Browser permission prompt if default */}
                {browserPermission === 'default' && (
                  <div className="bg-[#E6F7F7] px-4 py-2.5 border-b border-[#168C8C]/20 flex items-center justify-between text-xs text-[#142D4E]">
                    <span>Enable desktop reminders for study slots?</span>
                    <button
                      onClick={requestBrowserPermission}
                      className="bg-[#168C8C] hover:bg-[#127272] text-white text-[11px] font-semibold px-2 py-1 rounded"
                    >
                      Allow
                    </button>
                  </div>
                )}

                {/* Notification Items List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-[#E2E8F0]">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#718096]">
                      No notifications or reminders right now.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3.5 text-xs transition-colors hover:bg-slate-50 flex items-start space-x-3 ${
                          notif.read ? 'opacity-70 bg-white' : 'bg-slate-50/70'
                        }`}
                      >
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-[#168C8C] flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-[#142D4E]">{notif.title}</p>
                          <p className="text-[#718096] mt-0.5 leading-relaxed">{notif.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{notif.time}</span>
                        </div>
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            title="Mark as read"
                            className="text-[#168C8C] hover:text-[#127272] p-1"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Notification Dropdown Footer */}
                <div className="p-2.5 bg-slate-50 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <button
                    onClick={markAllAsRead}
                    className="text-[#168C8C] hover:underline font-medium px-2 py-1"
                  >
                    Mark all read
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-slate-400 hover:text-rose-500 font-medium px-2 py-1 flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear all</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Quick Pill */}
          <div
            onClick={() => onNavigate('settings')}
            className="flex items-center space-x-2 pl-2 border-l border-[#E2E8F0] cursor-pointer group"
          >
            <img
              src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={profile.fullName}
              className="w-8 h-8 rounded-full object-cover border border-[#168C8C] group-hover:ring-2 group-hover:ring-[#168C8C]/40 transition-all"
            />
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-[#142D4E] group-hover:text-[#168C8C] transition-colors leading-tight">
                {profile.fullName}
              </p>
              <p className="text-[10px] text-[#718096] leading-tight">Year {profile.currentYear} • {profile.preferredLanguage}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
