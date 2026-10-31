import React from 'react';
import { Compass, Mail, Heart, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#142D4E] text-white border-t border-[#334E68]/50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#334E68]/40">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#168C8C] to-[#20B2AA] flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-sans">SkillPath <span className="text-[#168C8C]">AI</span></span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Learn Skills. Build Your Future. Become Job-Ready."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              An AI-powered learning and placement guidance companion engineered specifically for college students aspiring to thrive in high-impact tech careers.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-[#168C8C] transition-colors text-xs font-semibold">
                GitHub
              </a>
              <span>•</span>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-[#168C8C] transition-colors text-xs font-semibold">
                LinkedIn
              </a>
              <span>•</span>
              <a href="mailto:support@skillpathai.edu" className="text-slate-300 hover:text-[#168C8C] transition-colors flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5" />
                <span className="text-xs">Contact</span>
              </a>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#168C8C] mb-3">AI Platform Tools</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><button onClick={() => onNavigate?.('mentor')} className="hover:text-white transition-colors">AI Student Mentor</button></li>
              <li><button onClick={() => onNavigate?.('roadmaps')} className="hover:text-white transition-colors">Career Roadmap Generator</button></li>
              <li><button onClick={() => onNavigate?.('skill-gap')} className="hover:text-white transition-colors">Skill Gap Analyzer</button></li>
              <li><button onClick={() => onNavigate?.('study-planner')} className="hover:text-white transition-colors">AI Study Timetable & Pomodoro</button></li>
              <li><button onClick={() => onNavigate?.('resume-builder')} className="hover:text-white transition-colors">Resume Builder & ATS Scanner</button></li>
            </ul>
          </div>

          {/* Career Roadmaps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#168C8C] mb-3">Popular Career Paths</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><button onClick={() => onNavigate?.('roadmaps')} className="hover:text-white transition-colors">Software Developer (SDE)</button></li>
              <li><button onClick={() => onNavigate?.('roadmaps')} className="hover:text-white transition-colors">Full Stack Web Developer</button></li>
              <li><button onClick={() => onNavigate?.('roadmaps')} className="hover:text-white transition-colors">AI & Machine Learning Engineer</button></li>
              <li><button onClick={() => onNavigate?.('roadmaps')} className="hover:text-white transition-colors">Cloud & DevOps Engineer</button></li>
              <li><button onClick={() => onNavigate?.('roadmaps')} className="hover:text-white transition-colors">Data Analyst & BI Specialist</button></li>
              <li><button onClick={() => onNavigate?.('roadmaps')} className="hover:text-white transition-colors">Cybersecurity Engineer</button></li>
            </ul>
          </div>

          {/* Student Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#168C8C] mb-3">Student Hub</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><button onClick={() => onNavigate?.('professional-profiles')} className="hover:text-white transition-colors">GitHub & LinkedIn Setup Guides</button></li>
              <li><button onClick={() => onNavigate?.('jobs-tracker')} className="hover:text-white transition-colors">Verified Internships & Drives</button></li>
              <li><button onClick={() => onNavigate?.('readiness')} className="hover:text-white transition-colors">Calculate Job Readiness Score</button></li>
              <li><button onClick={() => onNavigate?.('settings')} className="hover:text-white transition-colors">Connect Supabase & Gemini API</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SkillPath AI. All rights reserved. Built for engineering and college students worldwide.</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span className="flex items-center space-x-1 text-slate-300">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>for Students</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
