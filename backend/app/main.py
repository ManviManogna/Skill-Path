from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import ai_mentor, resume, interview, readiness

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for SkillPath AI - AI-Powered Student Learning & Career Guidance Platform",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(ai_mentor.router, prefix=settings.API_V1_STR)
app.include_router(resume.router, prefix=settings.API_V1_STR)
app.include_router(interview.router, prefix=settings.API_V1_STR)
app.include_router(readiness.router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "name": settings.PROJECT_NAME,
        "tagline": "Learn Skills. Build Your Future. Become Job-Ready.",
        "status": "healthy",
        "api_docs": "/docs"
    }

@app.get("/api/health")
async def health_check():
    has_gemini = bool(settings.GEMINI_API_KEY and len(settings.GEMINI_API_KEY) > 10)
    has_supabase = bool(settings.SUPABASE_URL and settings.SUPABASE_KEY)
    return {
        "status": "online",
        "gemini_configured": has_gemini,
        "supabase_configured": has_supabase,
        "mode": "live" if has_gemini else "demo"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
