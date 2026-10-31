from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

router = APIRouter(prefix="/readiness", tags=["Job Readiness Score"])

class ReadinessInput(BaseModel):
    skills_count: int = 4
    target_skills_total: int = 8
    projects_completed: int = 2
    resume_ats_score: int = 70
    profiles_completed: int = 4 # out of 8 platforms
    coding_problems_solved: int = 45
    mock_interviews_completed: int = 2

class CategoryScore(BaseModel):
    name: str
    score: int # 0 to 100
    weight_pct: int
    feedback: str

class ReadinessResponse(BaseModel):
    overall_score: int # 0 to 100
    status_label: str
    category_scores: List[CategoryScore]
    weak_areas: List[str]
    strong_areas: List[str]
    action_items: List[str]
    disclaimer: str

@router.post("/calculate", response_model=ReadinessResponse)
async def calculate_readiness_score(data: ReadinessInput):
    # 1. Technical Skills Score
    skill_ratio = min(1.0, data.skills_count / max(1, data.target_skills_total))
    tech_score = int(skill_ratio * 100)

    # 2. Projects Score (Target: 3 good projects for college level)
    proj_score = min(100, int((data.projects_completed / 3.0) * 100))

    # 3. Resume ATS Score
    resume_score = min(100, max(0, data.resume_ats_score))

    # 4. Professional Profiles Score (Target: 6 of 8 platforms)
    prof_score = min(100, int((data.profiles_completed / 6.0) * 100))

    # 5. Coding Practice (Target: 100 problems for placements)
    coding_score = min(100, int((data.coding_problems_solved / 100.0) * 100))

    # 6. Interview Prep (Target: 5 mock sessions)
    interview_score = min(100, int((data.mock_interviews_completed / 5.0) * 100))

    # Weighted composite: 30% Tech, 20% Projects, 20% Resume, 15% Profiles, 15% Coding
    weighted_total = (
        (tech_score * 0.30) +
        (proj_score * 0.20) +
        (resume_score * 0.20) +
        (prof_score * 0.15) +
        (coding_score * 0.15)
    )
    overall = int(round(weighted_total))

    categories = [
        CategoryScore(
            name="Technical Skills",
            score=tech_score,
            weight_pct=30,
            feedback=f"{data.skills_count} of {data.target_skills_total} core skills checked off."
        ),
        CategoryScore(
            name="Projects Portfolio",
            score=proj_score,
            weight_pct=20,
            feedback=f"{data.projects_completed} projects built with documented GitHub code."
        ),
        CategoryScore(
            name="Resume & ATS",
            score=resume_score,
            weight_pct=20,
            feedback=f"ATS match estimated at {resume_score}%."
        ),
        CategoryScore(
            name="Professional Profiles",
            score=prof_score,
            weight_pct=15,
            feedback=f"{data.profiles_completed} professional platforms configured."
        ),
        CategoryScore(
            name="Coding Practice (DSA)",
            score=coding_score,
            weight_pct=15,
            feedback=f"{data.coding_problems_solved} problems solved on LeetCode/HackerRank."
        )
    ]

    # Identify weak areas (score < 60)
    weak = []
    strong = []
    actions = []
    for cat in categories:
        if cat.score < 60:
            weak.append(cat.name)
            if cat.name == "Coding Practice (DSA)":
                actions.append("Solve at least 2 LeetCode problems daily focusing on Arrays and HashMaps.")
            elif cat.name == "Technical Skills":
                actions.append("Complete the pending milestone in your Career Roadmap.")
            elif cat.name == "Projects Portfolio":
                actions.append("Build and deploy a full-stack capstone project with live URL.")
            elif cat.name == "Resume & ATS":
                actions.append("Scan your resume against 2 target job descriptions and add missing keywords.")
            elif cat.name == "Professional Profiles":
                actions.append("Optimize your LinkedIn headline and pin top GitHub repositories.")
        else:
            strong.append(cat.name)

    if not actions:
        actions.append("Maintain consistency with weekly revisions and continuous mock assessments.")

    if overall >= 85:
        status = "Placement Ready (Top 10%)"
    elif overall >= 70:
        status = "Strong Competency"
    elif overall >= 50:
        status = "Progressing Student"
    else:
        status = "Foundation Stage"

    return ReadinessResponse(
        overall_score=overall,
        status_label=status,
        category_scores=categories,
        weak_areas=weak,
        strong_areas=strong,
        action_items=actions,
        disclaimer="Note: This is an automated preparation indicator to guide your learning efforts, not a guarantee of employment."
    )
