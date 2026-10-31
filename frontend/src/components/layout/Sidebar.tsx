import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Map,
  GitCompare,
  CalendarCheck2,
  FileText,
  UserCheck2,
  Mic2,
  FolderGit2,
  Briefcase,
  TrendingUp,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  Compass,
  Award
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  collapsed,
  onToggleCollapse
}) => {
  const { profile, logout } = useAuth();
  const { unreadCount } = useNotifications();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mentor', label: 'AI Student Mentor', icon: Bot, badge: 'AI' },
    { id: 'roadmaps', label: 'Career Roadmap', icon: Map },
    { id: 'skill-gap', label: 'Skill Gap Analyzer', icon: GitCompare },
    { id: 'study-planner', label: 'Study Planner', icon: CalendarCheck2 },
    { id: 'resume-builder', label: 'Resume Builder', icon: FileText, badge: 'ATS' },
    { id: 'professional-profiles', label: 'Professional Profiles', icon: UserCheck2 },
    { id: 'jobs-tracker', label: 'Jobs & Internships', icon: Briefcase },
    { id: 'my-progress', label: 'My Progress', icon: TrendingUp },
    { id: 'readiness', label: 'Job Readiness Score', icon: Award, badge: 'Score' },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadCount },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#142D4E] text-white flex flex-col border-r border-[#334E68]/50 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#334E68]/40">
        {!collapsed && (
          <div
            className="flex items-center space-x-2.5 cursor-pointer overflow-hidden"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#168C8C] to-[#20B2AA] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight truncate">
              <span className="font-bold text-lg text-white font-sans">SkillPath </span>
              <span className="font-bold text-lg text-[#168C8C]">AI</span>
            </div>
          </div>
        )}

        {collapsed && (
          <div
            className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-tr from-[#168C8C] to-[#20B2AA] flex items-center justify-center cursor-pointer shadow-sm"
            onClick={() => onNavigate('dashboard')}
          >
            <Compass className="w-6 h-6 text-white" />
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className={`text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-[#334E68]/40 transition-colors ${
            collapsed ? 'hidden' : 'block'
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links Scrollable List */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative ${
                isActive
                  ? 'bg-[#168C8C] text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-[#334E68]/50'
              } ${collapsed ? 'justify-center' : 'justify-start space-x-3'}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
              
              {!collapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {/* Badges */}
              {!collapsed && item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#168C8C]/30 text-[#2DD4BF]'
                }`}>
                  {item.badge}
                </span>
              )}

              {/* Notification count */}
              {!collapsed && item.count !== undefined && item.count > 0 && (
                <span className="w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {item.count > 9 ? '9+' : item.count}
                </span>
              )}

              {/* Floating count badge when collapsed */}
              {collapsed && item.count !== undefined && item.count > 0 && (
                <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#142D4E]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Expand button at bottom when collapsed */}
      {collapsed && (
        <div className="p-3 border-t border-[#334E68]/40 flex justify-center">
          <button
            onClick={onToggleCollapse}
            className="p-2 text-slate-300 hover:text-white hover:bg-[#334E68]/40 rounded-lg"
            title="Expand sidebar"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Student Mini Profile Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-[#334E68]/40 bg-[#0F223D]/60">
          <div className="flex items-center space-x-3 mb-2">
            <img
              src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={profile.fullName}
              className="w-9 h-9 rounded-full object-cover border border-[#168C8C]"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{profile.fullName}</p>
              <p className="text-[11px] text-slate-300 truncate">{profile.careerInterest}</p>
            </div>
            <button
              onClick={logout}
              title="Log out"
              className="text-slate-300 hover:text-rose-400 p-1.5 rounded hover:bg-[#334E68]/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Year {profile.currentYear} • {profile.currentLearningLevel}</span>
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
