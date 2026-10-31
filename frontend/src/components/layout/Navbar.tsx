import React, { useState } from 'react';
import { Compass, Sparkles, Menu, X, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  isAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  currentPage,
  onOpenAuth,
  isAuthenticated
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'career-paths', label: 'Career Paths' },
    { id: 'about', label: 'About Us' }
  ];

  const handleLinkClick = (id: string) => {
    if (id === 'landing') {
      onNavigate('landing');
    } else {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#142D4E] text-white border-b border-[#334E68]/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#168C8C] to-[#20B2AA] flex items-center justify-center shadow-md shadow-[#168C8C]/20 transition-transform group-hover:scale-105">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-sans">SkillPath</span>
                <span className="text-xl font-extrabold text-[#168C8C]">AI</span>
                <span className="text-[10px] uppercase font-semibold bg-[#168C8C]/20 text-[#2DD4BF] px-1.5 py-0.5 rounded border border-[#168C8C]/40">Student</span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium hidden sm:block">Learn. Build. Become Job-Ready.</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-sm font-medium text-slate-200 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center space-x-2 bg-[#168C8C] hover:bg-[#127272] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-sm font-medium text-slate-200 hover:text-white transition-colors px-3 py-1.5"
                >
                  Login
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="flex items-center space-x-1.5 bg-[#168C8C] hover:bg-[#127272] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Started Free</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#142D4E] border-b border-[#334E68] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-[#334E68]/60 flex flex-col space-y-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center bg-[#168C8C] text-white py-2.5 rounded-lg font-semibold"
              >
                Launch Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-slate-200 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center bg-[#168C8C] text-white py-2.5 rounded-lg font-semibold"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
