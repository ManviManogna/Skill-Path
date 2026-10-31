import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { LandingPage } from './pages/LandingPage';
import { AuthModal } from './pages/AuthModal';
import { Dashboard } from './pages/Dashboard';
import { AIMentor } from './pages/AIMentor';
import { CareerRoadmaps } from './pages/CareerRoadmaps';
import { SkillGapAnalyzer } from './pages/SkillGapAnalyzer';
import { StudyPlanner } from './pages/StudyPlanner';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { ProfessionalProfiles } from './pages/ProfessionalProfiles';
import { JobsTracker } from './pages/JobsTracker';
import { ProgressAnalytics } from './pages/ProgressAnalytics';
import { AdditionalFeatures } from './pages/AdditionalFeatures';
import { JobReadiness } from './pages/JobReadiness';
import { SettingsPage } from './pages/SettingsPage';

const MainAppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If on landing page, display standalone marketing page
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage
          onNavigate={handleNavigate}
          onOpenAuth={handleOpenAuth}
          isAuthenticated={isAuthenticated}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authModalMode}
          onSuccess={() => handleNavigate('dashboard')}
        />
      </>
    );
  }

  // Dashboard & Application SaaS View
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#202B38] font-sans flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#142D4E]/80 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 bg-[#142D4E] h-full shadow-2xl flex flex-col">
            <Sidebar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              collapsed={false}
              onToggleCollapse={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
          {currentPage === 'mentor' && <AIMentor />}
          {currentPage === 'roadmaps' && <CareerRoadmaps />}
          {currentPage === 'skill-gap' && <SkillGapAnalyzer />}
          {currentPage === 'study-planner' && <StudyPlanner />}
          {currentPage === 'resume-builder' && <ResumeBuilder />}
          {currentPage === 'professional-profiles' && <ProfessionalProfiles />}
          {currentPage === 'jobs-tracker' && <JobsTracker />}
          {currentPage === 'my-progress' && <ProgressAnalytics />}
          {currentPage === 'readiness' && <JobReadiness />}
          {currentPage === 'notifications' && <AdditionalFeatures />}
          {currentPage === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Auth Modal for re-authenticating / editing */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccess={() => handleNavigate('dashboard')}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <MainAppContent />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
