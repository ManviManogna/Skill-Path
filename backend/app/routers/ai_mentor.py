from fastapi import APIRouter, Header, Request
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from ..services.gemini_service import gemini_service

router = APIRouter(prefix="/mentor", tags=["AI Mentor"])

class StudentProfileContext(BaseModel):
    full_name: Optional[str] = "Student"
    current_year: Optional[int] = 2
    degree: Optional[str] = "B.Tech Computer Science"
    current_skills: Optional[List[str]] = []
    career_interest: Optional[str] = "Software Developer"
    current_learning_level: Optional[str] = "Beginner"

class ChatRequest(BaseModel):
    message: str
    profile: Optional[StudentProfileContext] = None
    chat_history: Optional[List[Dict[str, str]]] = []
    api_key: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    is_demo: bool
    model: str

@router.post("/chat", response_model=ChatResponse)
async def chat_with_mentor(
    request: ChatRequest,
    x_gemini_api_key: Optional[str] = Header(None)
):
    profile_info = ""
    if request.profile:
        profile_info = (
            f"Student Name: {request.profile.full_name}, Year {request.profile.current_year} of {request.profile.degree}. "
            f"Target career: {request.profile.career_interest}. Learning level: {request.profile.current_learning_level}. "
            f"Current known skills: {', '.join(request.profile.current_skills) if request.profile.current_skills else 'None yet'}. "
        )

    system_instruction = (
        "You are SkillPath AI, an expert, warm, and highly practical AI student mentor for college students preparing for software & tech careers. "
        "Answer ANY student question with high depth, structured sections (Overview, Step-by-Step implementation or mechanics, Code examples with syntax where relevant, and placement tips). "
        + profile_info
    )

    custom_key = request.api_key or x_gemini_api_key
    result = gemini_service.generate_response(
        prompt=request.message,
        system_instruction=system_instruction,
        custom_key=custom_key
    )
    
    return ChatResponse(
        response=result.get("text", "No response generated."),
        is_demo=result.get("is_demo", False),
        model=result.get("model", "Gemini")
    )
