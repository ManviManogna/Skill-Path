-- =========================================================================
-- SkillPath AI - Comprehensive Supabase Database Schema
-- Provides PostgreSQL tables, Row Level Security (RLS) policies, and indexes
-- =========================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Student Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    college_name TEXT,
    degree TEXT,
    branch TEXT,
    current_year INTEGER DEFAULT 1,
    graduation_year INTEGER,
    current_skills TEXT[] DEFAULT '{}',
    preferred_language TEXT DEFAULT 'Python',
    career_interest TEXT DEFAULT 'Software Developer',
    current_learning_level TEXT DEFAULT 'Beginner', -- Beginner, Intermediate, Advanced
    daily_study_hours NUMERIC DEFAULT 2.5,
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Career Roadmaps & Milestone Progress
CREATE TABLE IF NOT EXISTS public.roadmap_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    career_path_id TEXT NOT NULL, -- e.g. 'software-developer', 'full-stack'
    milestone_id TEXT NOT NULL,   -- e.g. 'python-basics', 'git-github'
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, career_path_id, milestone_id)
);

-- 3. Study Timetables & Daily Slots
CREATE TABLE IF NOT EXISTS public.study_timetables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    day_of_week TEXT NOT NULL, -- Monday, Tuesday, etc.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    subject TEXT NOT NULL,
    category TEXT DEFAULT 'Self-Study', -- 'College', 'Self-Study', 'Coding Practice', 'Placement Prep', 'Break'
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tasks & Daily Goals
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    priority TEXT DEFAULT 'Medium', -- 'Low', 'Medium', 'High', 'Urgent'
    status TEXT DEFAULT 'pending', -- 'pending', 'in-progress', 'completed'
    category TEXT DEFAULT 'General', -- 'Exam', 'Coding', 'Project', 'Assignment'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Smart Reminders
CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    remind_at TIMESTAMPTZ NOT NULL,
    category TEXT DEFAULT 'Study', -- 'Study', 'Exam', 'Deadline', 'Interview', 'Coding'
    is_read BOOLEAN DEFAULT FALSE,
    is_recurring BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Student Resumes
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT DEFAULT 'My Tech Resume',
    template_id TEXT DEFAULT 'modern',
    personal_info JSONB DEFAULT '{}',
    summary TEXT,
    education JSONB DEFAULT '[]',
    experience JSONB DEFAULT '[]',
    projects JSONB DEFAULT '[]',
    skills JSONB DEFAULT '[]',
    certifications JSONB DEFAULT '[]',
    ats_score NUMERIC DEFAULT 0,
    target_role TEXT,
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Professional Profile Progress
CREATE TABLE IF NOT EXISTS public.professional_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    platform TEXT NOT NULL, -- 'linkedin', 'github', 'leetcode', etc.
    profile_url TEXT,
    checklist_status JSONB DEFAULT '{}', -- Key-value map of checklist item IDs to boolean
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, platform)
);

-- 8. AI Mock Interview History & Evaluations
CREATE TABLE IF NOT EXISTS public.interview_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    track TEXT NOT NULL, -- 'Technical', 'HR', 'Coding', 'Aptitude'
    role_target TEXT,
    overall_score NUMERIC,
    feedback TEXT,
    qa_pairs JSONB DEFAULT '[]', -- list of {question, student_answer, ai_score, suggestions}
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Job & Internship Applications
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    location TEXT,
    job_type TEXT DEFAULT 'Internship', -- 'Internship', 'Full-time', 'Part-time'
    salary_range TEXT,
    status TEXT DEFAULT 'Saved', -- 'Saved', 'Applied', 'Assessment', 'Interview', 'Selected', 'Rejected'
    application_date DATE DEFAULT CURRENT_DATE,
    interview_date TIMESTAMPTZ,
    notes TEXT,
    source_url TEXT,
    deadline DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Daily Productivity History & Pomodoro Logs
CREATE TABLE IF NOT EXISTS public.productivity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    log_date DATE DEFAULT CURRENT_DATE,
    study_minutes INTEGER DEFAULT 0,
    pomodoros_completed INTEGER DEFAULT 0,
    problems_solved INTEGER DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    streak_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, log_date)
);

-- 11. AI Chat History
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    sender TEXT NOT NULL, -- 'user' or 'ai'
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- Enable Row Level Security (RLS) on all tables
-- =========================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_timetables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productivity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- Define RLS Policies: Students can only read and write their OWN data
-- =========================================================================

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Roadmap Progress
CREATE POLICY "Users can view own roadmaps" ON public.roadmap_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own roadmaps" ON public.roadmap_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own roadmaps" ON public.roadmap_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own roadmaps" ON public.roadmap_progress FOR DELETE USING (auth.uid() = user_id);

-- Tasks
CREATE POLICY "Users can manage own tasks" ON public.tasks FOR ALL USING (auth.uid() = user_id);

-- Timetables
CREATE POLICY "Users can manage own timetables" ON public.study_timetables FOR ALL USING (auth.uid() = user_id);

-- Reminders
CREATE POLICY "Users can manage own reminders" ON public.reminders FOR ALL USING (auth.uid() = user_id);

-- Resumes
CREATE POLICY "Users can manage own resumes" ON public.resumes FOR ALL USING (auth.uid() = user_id);

-- Professional Profiles
CREATE POLICY "Users can manage own prof profiles" ON public.professional_profiles FOR ALL USING (auth.uid() = user_id);

-- Interview Sessions
CREATE POLICY "Users can manage own interviews" ON public.interview_sessions FOR ALL USING (auth.uid() = user_id);

-- Job Applications
CREATE POLICY "Users can manage own job applications" ON public.job_applications FOR ALL USING (auth.uid() = user_id);

-- Productivity Logs
CREATE POLICY "Users can manage own productivity" ON public.productivity_logs FOR ALL USING (auth.uid() = user_id);

-- Chat Messages
CREATE POLICY "Users can manage own chats" ON public.chat_messages FOR ALL USING (auth.uid() = user_id);

-- =========================================================================
-- Helper trigger to auto-create profile row upon Supabase Auth sign-up
-- =========================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student User'),
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
