# SkillPath AI – AI-Powered Student Learning & Career Guidance Platform

> **Tagline:** *"Learn Skills. Build Your Future. Become Job-Ready."*

SkillPath AI is an all-in-one personal AI mentor and career acceleration platform engineered specifically for college students. It guides students step-by-step from beginner level to placement-ready software engineers, data analysts, AI/ML developers, and cloud architects.

---

## 🌟 Core Features & Modules

1. **Attractive Professional Landing Page**
   - High-impact Hero section with tagline, CTAs, and interactive platform preview.
   - Platform feature showcase, curated career tracks, comparison vs traditional college, student reviews, and FAQs.

2. **Student Authentication & Onboarding Wizard**
   - Login, Sign Up, Forgot Password, and 2-step onboarding wizard.
   - Captures college name, degree, branch, current academic year, graduation year, technical skills, preferred coding language, career interest, learning level, and daily study hours.

3. **Personalized Student Dashboard**
   - Dynamic greeting with student name, date, and 6-day study streak counter.
   - Roadmap progress meter, LeetCode target bar, ATS resume score, and profile completeness.
   - Today's study timetable widget and interactive daily action checklist.
   - 6 Quick-Access navigation cards and Recharts weekly study hours visualization.

4. **AI Student Mentor (Gemini API Integration)**
   - 24/7 personal tech and placement advisor.
   - Passes student's profile context (year, skills, target role) to provide custom, encouraging, step-by-step guidance and free resource recommendations.
   - Preloaded student question chips, markdown rendering, copy response button, and chat history.
   - Dual-mode: Live Gemini AI when `GEMINI_API_KEY` is present, with an intelligent demo fallback when keys are not configured.

5. **Interactive Career Roadmaps (8 Tracks)**
   - Software Developer (SDE), Full Stack Developer, AI/ML Engineer, Data Analyst, Data Scientist, Cybersecurity Engineer, Cloud Engineer, UI/UX Designer.
   - Milestones with learning order, duration in weeks, skills list, curated free resources (Harvard CS50, freeCodeCamp, MIT OCW, official docs), practice exercises, recommended projects, certifications, and target interview questions.
   - Interactive milestone checkboxes with confetti celebration and progress meters.

6. **Skill Gap Analyzer**
   - Select target placement roles (SDE, Full Stack, AI/ML, Data Analyst).
   - Compares existing skills against industry hiring criteria.
   - Visual breakdown of Acquired skills (green), Skills needing improvement (yellow), and Critical missing gaps (red).
   - Generates a prioritized 30-day skill closure plan with direct course links.

7. **AI Study Timetable Generator & Pomodoro Timer**
   - Inputs for college hours, self-study goals, preferred timings, and placement preparation focus.
   - Generates balanced daily and weekly schedules.
   - Interactive 25-minute **Pomodoro Timer** (Study, Short Break, Long Break) with audio cues, session counter, and study streak logging.
   - *"Missed a session? Reschedule"* button that automatically recalculates evening slots.

8. **Build Your Professional Presence (8 Platforms)**
   - In-depth 9-point setup and optimization guides for:
     - **LinkedIn, GitHub, LeetCode, HackerRank, HackerEarth, Kaggle, Internshala, Naukri.com**.
   - Step-by-step instructions, recruiter proof-of-work advice, common mistakes to avoid, and interactive verification checklists.
   - Prominent security reminder: SkillPath AI will never ask for external platform passwords.

9. **AI Resume Builder & ATS Scanner**
   - Interactive resume editor with multiple templates (Modern Tech, Clean Minimalist, Academic).
   - Real-time live printable resume preview.
   - **AI Enhance** button for generating punchy professional summaries and action-verb bullet points.
   - **ATS Keyword Scanner**: Paste any job description to compute ATS match percentage, detect matched and missing keywords, and view actionable tips.
   - 1-click **Download PDF / Print** functionality.

10. **AI Mock Interview Simulator**
    - Technical, HR, Coding, and Aptitude rounds.
    - One-by-one question delivery with hints.
    - Students type their responses and receive instant AI grading (1-10 scale), strengths, missing points, and a model ideal answer.

11. **Curated Projects & Verified Certifications**
    - Filterable projects directory (Beginner, Intermediate, Advanced) with full architecture blueprints, features to build, and GitHub README publishing tips.
    - Directory of accredited free and paid certifications from Harvard (CS50), AWS, Google Cloud, Meta, and freeCodeCamp.

12. **Jobs & Internships Application Tracker**
    - Verified student recruitment drives (Amazon SDE Intern, Google STEP, TCS Digital, Infosys Power Programmer, Flipkart GRID, Quick-Commerce Startups).
    - Application status board: *Saved, Applied, Assessment, Interview, Selected, Rejected*.
    - Preparation guides and deadline tracking.

13. **Productivity Analytics ("My Progress")**
    - Daily and weekly study hours charts (Recharts).
    - Cumulative LeetCode DSA velocity growth curve.
    - Comprehensive weekly AI diagnostic report card with strengths, weak spots, and next week's suggested goals.

14. **Special Feature: Job Readiness Score**
    - Unique holistic readiness index (0 - 100%) computed dynamically across 6 pillars:
      1. Technical Skills Coverage (25%)
      2. Projects Portfolio (20%)
      3. Resume ATS Compatibility (15%)
      4. Professional Profiles Setup (15%)
      5. DSA Coding Practice (15%)
      6. Mock Interview Rounds (10%)
    - Visual circular gauge, status tiers (*Placement Ready*, *Strong Competency*, *Progressing Student*), and prominent educational disclaimer.

15. **Additional Student Features**
    - **Daily Coding Challenge**: Problem statement, hints, test cases, and copyable Python model solutions.
    - **Scholarship Discovery**: National and international STEM scholarships (Google Generation, Reliance Foundation, Adobe WIT).
    - **Soft Skills & Behavioral Guide**: The STAR Method Masterclass and 60-Second Developer Elevator Pitch.
    - **Master Placement Checklist**: 12 critical milestones spanning Aptitude, Core CS, DSA, and System Design.

---

## 🎨 Color Theme & Design System

- **Primary Deep Navy:** `#142D4E` (Sidebar, key headings, brand navbar)
- **Secondary Slate Blue:** `#334E68` (Secondary text, subheadings, icons)
- **Accent Teal:** `#168C8C` (Primary buttons, active states, badges, highlight accents)
- **Background:** `#F7F9FC` (Soft off-white canvas)
- **Card Background:** `#FFFFFF` (Clean white cards with subtle `#E2E8F0` borders)
- **Typography:** `Inter` for interface and `JetBrains Mono` for code & countdown timers.

---

## 🛠️ Technology Stack

- **Frontend:**
  - React 19 + TypeScript + Vite
  - Tailwind CSS v4
  - Lucide React Icons
  - Recharts (Data Visualizations)
  - Canvas Confetti (Gamification)
  - Supabase JS Client (`@supabase/supabase-js`)
- **Backend:**
  - Python 3.11+
  - FastAPI + Uvicorn
  - Pydantic v2
  - Requests & Python-dotenv
  - Google Gemini API Proxy
- **Database & Storage:**
  - PostgreSQL schema with Row Level Security (RLS) in `supabase/schema.sql`

---

## 🚀 Running the Platform Locally

### 1. Start the Python FastAPI Backend (Port 8000)
```bash
# From workspace root
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend runs on:* `http://127.0.0.1:8000`  
*Interactive Swagger API Docs:* `http://127.0.0.1:8000/docs`

### 2. Start the Vite React Frontend (Port 5173)
```bash
# In a second terminal
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```
*Frontend runs on:* `http://127.0.0.1:5173`

---

## 🔑 Environment Configuration (Optional)

SkillPath AI works completely out-of-the-box in intelligent **Demo Mode** with realistic student data and fallbacks. To activate live cloud services:

1. **Gemini Live AI:**
   Create `backend/.env` with:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

2. **Supabase Cloud Database:**
   In your Supabase project:
   - Run `supabase/schema.sql` in the Supabase SQL Editor to create tables and RLS policies.
   - Create `frontend/.env` with:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
