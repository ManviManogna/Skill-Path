import React, { useState } from 'react';
import {
  Briefcase,
  ExternalLink,
  Calendar,
  Clock,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Filter,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { VERIFIED_JOB_LISTINGS } from '../data/jobOpportunitiesData';
import { JobListing } from '../types';
import { useNotifications } from '../contexts/NotificationContext';

export const JobsTracker: React.FC = () => {
  const { addReminder } = useNotifications();

  const [applications, setApplications] = useState<JobListing[]>(() => {
    const saved = localStorage.getItem('skillpath_job_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return VERIFIED_JOB_LISTINGS;
  });

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  const statuses: Array<NonNullable<JobListing['status']>> = [
    'Saved',
    'Applied',
    'Assessment',
    'Interview',
    'Selected',
    'Rejected'
  ];

  const handleStatusChange = (jobId: string, newStatus: JobListing['status']) => {
    setApplications(prev => {
      const updated = prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j);
      localStorage.setItem('skillpath_job_applications', JSON.stringify(updated));
      return updated;
    });

    const job = applications.find(j => j.id === jobId);
    if (job) {
      addReminder(
        `Application Updated: ${job.companyName}`,
        `Status changed to "${newStatus}" for ${job.roleTitle}.`,
        'deadline'
      );
    }
  };

  const filteredJobs = applications.filter(j => {
    if (statusFilter === 'All') return true;
    return j.status === statusFilter;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#168C8C]/25 text-[#2DD4BF] text-xs font-semibold px-3 py-1 rounded-full border border-[#168C8C]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Student Opportunities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Jobs & Internships Application Tracker</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Track official campus placement drives, off-campus fresher hiring windows, and product company summer internship deadlines in one centralized board.
          </p>
        </div>

        {/* Quick Counts */}
        <div className="flex gap-2 text-center text-xs">
          <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/20">
            <span className="text-xl font-bold block text-white">{applications.length}</span>
            <span className="text-[10px] text-slate-300 uppercase">Opportunities</span>
          </div>
          <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/20">
            <span className="text-xl font-bold block text-teal-300">
              {applications.filter(a => a.status === 'Interview' || a.status === 'Assessment').length}
            </span>
            <span className="text-[10px] text-slate-300 uppercase">In Progress</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3 shadow-sm flex space-x-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setStatusFilter('All')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            statusFilter === 'All' ? 'bg-[#142D4E] text-white shadow' : 'text-[#334E68] hover:bg-slate-100'
          }`}
        >
          All ({applications.length})
        </button>
        {statuses.map(st => {
          const count = applications.filter(a => a.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st ? 'bg-[#168C8C] text-white shadow' : 'text-[#334E68] hover:bg-slate-100'
              }`}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Job Listings Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:border-[#168C8C] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{job.companyLogo}</span>
                  <div>
                    <h3 className="text-base font-bold text-[#142D4E]">{job.companyName}</h3>
                    <p className="text-xs text-[#718096]">{job.location}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-100 text-[#334E68]">
                  {job.type}
                </span>
              </div>

              {/* Role Title & Stipend */}
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-[#142D4E]">{job.roleTitle}</h4>
                <p className="text-xs font-bold text-[#168C8C] mt-0.5">{job.stipendOrSalary}</p>
              </div>

              {/* Batch & Deadline */}
              <div className="space-y-1 text-[11px] text-[#718096] mb-3">
                <p>Eligible: <strong className="text-[#334E68]">{job.batchEligible.join(', ')}</strong></p>
                <p>Deadline: <strong className="text-amber-700">{job.deadline}</strong></p>
              </div>

              {/* Preparation Advice */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-[#334E68] mb-4">
                <span className="font-bold text-[#142D4E] block mb-0.5">Recruiter Prep Guide:</span>
                <p className="line-clamp-3">{job.preparationGuide}</p>
              </div>
            </div>

            {/* Bottom Actions: Status Selector & Direct Apply Link */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#718096]">Application Stage:</span>
                <select
                  value={job.status || 'Saved'}
                  onChange={e => handleStatusChange(job.id, e.target.value as any)}
                  className="text-xs font-bold border border-[#E2E8F0] rounded-lg px-2 py-1 bg-white text-[#142D4E]"
                >
                  {statuses.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <a
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2 bg-[#E6F7F7] hover:bg-[#168C8C] text-xs font-semibold text-[#168C8C] hover:text-white rounded-lg transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Official Careers Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
