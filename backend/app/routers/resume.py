import re
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from ..services.gemini_service import gemini_service

router = APIRouter(prefix="/resume", tags=["Resume & ATS"])

class ATSCheckRequest(BaseModel):
    resume_text: str
    job_description: str
    target_role: Optional[str] = "Software Developer"

class ATSCheckResponse(BaseModel):
    ats_score: int
    matched_keywords: List[str]
    missing_keywords: List[str]
    critical_skills_present: List[str]
    critical_skills_missing: List[str]
    improvement_suggestions: List[str]
    formatting_insights: List[str]
    is_demo: bool

class ImproveSummaryRequest(BaseModel):
    full_name: str
    career_interest: str
    skills: List[str]
    projects_summary: Optional[str] = ""
    current_summary: Optional[str] = ""

class ImproveSummaryResponse(BaseModel):
    enhanced_summary: str
    action_bullet_points: List[str]
    is_demo: bool

@router.post("/ats-check", response_model=ATSCheckResponse)
async def check_ats_compatibility(payload: ATSCheckRequest):
    # Common tech keywords dictionary for comprehensive parsing
    tech_keywords = [
        "python", "java", "c++", "c#", "javascript", "typescript", "react", "next.js", "node.js",
        "fastapi", "django", "spring boot", "sql", "postgresql", "mongodb", "mysql", "redis",
        "docker", "kubernetes", "aws", "azure", "gcp", "git", "github", "ci/cd", "rest api",
        "graphql", "html", "css", "tailwind", "linux", "dsa", "data structures", "algorithms",
        "oop", "object oriented", "machine learning", "deep learning", "pandas", "numpy", "tensorflow",
        "pytorch", "scikit-learn", "agile", "scrum", "microservices", "unit testing", "jest"
    ]

    jd_lower = payload.job_description.lower()
    resume_lower = payload.resume_text.lower()

    # Identify keywords present in JD
    jd_keywords = [kw for kw in tech_keywords if re.search(r'\b' + re.escape(kw) + r'\b', jd_lower)]
    if not jd_keywords:
        # Default fallback keywords if JD is very short
        jd_keywords = ["git", "python", "sql", "rest api", "data structures", "problem solving"]

    matched = []
    missing = []
    for kw in jd_keywords:
        if re.search(r'\b' + re.escape(kw) + r'\b', resume_lower):
            matched.append(kw.title())
        else:
            missing.append(kw.title())

    # Calculate ATS score percentage
    total = len(jd_keywords)
    match_pct = int((len(matched) / total) * 100) if total > 0 else 50
    # Scale between 40 and 96
    ats_score = max(35, min(96, match_pct))

    suggestions = []
    if missing:
        suggestions.append(f"Incorporate missing core keywords such as: {', '.join(missing[:5])}.")
    if "metrics" not in resume_lower and "%" not in payload.resume_text and "$" not in payload.resume_text:
        suggestions.append("Quantify your achievements! Use numbers, such as 'Improved performance by 25%' or 'Served 500+ users'.")
    if len(payload.resume_text.split()) < 200:
        suggestions.append("Your resume text appears brief. Ensure all university projects, internships, and coursework are elaborated.")
    suggestions.append("Ensure your contact links (GitHub and LinkedIn) are clearly listed at the top.")

    formatting = [
        "Use standard headings (Summary, Education, Technical Skills, Projects, Experience).",
        "Avoid multi-column tables and text boxes which may confuse legacy ATS parsers.",
        "Ensure bullet points start with strong action verbs (e.g., Developed, Engineered, Orchestrated)."
    ]

    return ATSCheckResponse(
        ats_score=ats_score,
        matched_keywords=matched,
        missing_keywords=missing,
        critical_skills_present=matched[:5],
        critical_skills_missing=missing[:5],
        improvement_suggestions=suggestions,
        formatting_insights=formatting,
        is_demo=not gemini_service.is_configured
    )

@router.post("/improve-summary", response_model=ImproveSummaryResponse)
async def improve_resume_summary(payload: ImproveSummaryRequest):
    skills_str = ", ".join(payload.skills) if payload.skills else "modern software engineering"
    
    prompt = (
        f"Generate a punchy, ATS-optimized 3-sentence professional resume summary and 3 quantifiable bullet points "
        f"for a student named {payload.full_name} aspiring to be a {payload.career_interest}. "
        f"Their skills include: {skills_str}. "
        f"Current projects/notes: {payload.projects_summary}. "
        f"Output in clean JSON format with 'summary' and 'bullets' (list of 3 strings)."
    )

    if gemini_service.is_configured:
        res = gemini_service.generate_response(prompt)
        text = res.get("text", "")
        # Attempt to parse JSON or fallback
        try:
            import json
            match = re.search(r'\{.*\}', text, re.DOTALL)
            if match:
                parsed = json.loads(match.group())
                return ImproveSummaryResponse(
                    enhanced_summary=parsed.get("summary", ""),
                    action_bullet_points=parsed.get("bullets", []),
                    is_demo=False
                )
        except Exception:
            pass

    # High quality demo template
    summary = (
        f"Proactive and detail-oriented aspiring {payload.career_interest} with a strong foundation in {skills_str}. "
        f"Demonstrated ability in building scalable applications, implementing clean code practices, and solving complex algorithmic challenges. "
        f"Eager to contribute technical expertise and innovative problem-solving to a high-growth engineering team."
    )
    bullets = [
        f"Architected and deployed responsive applications using {skills_str}, improving load efficiency by 30%.",
        "Engineered robust RESTful backend APIs with secure authentication, achieving sub-100ms response latencies.",
        "Collaborated via Git/GitHub version control, following Agile workflows and comprehensive unit testing standards."
    ]

    return ImproveSummaryResponse(
        enhanced_summary=summary,
        action_bullet_points=bullets,
        is_demo=True
    )
