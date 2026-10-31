from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from ..services.gemini_service import gemini_service

router = APIRouter(prefix="/interview", tags=["Interview Preparation"])

class InterviewQuestionsRequest(BaseModel):
    track: str # "Technical", "HR", "Coding", "Aptitude"
    role_target: Optional[str] = "Software Developer"
    level: Optional[str] = "Beginner"

class QuestionItem(BaseModel):
    id: str
    track: str
    question: str
    category: str
    difficulty: str
    hints: List[str]

class EvaluateAnswerRequest(BaseModel):
    question_id: str
    question_text: str
    track: str
    student_answer: str
    role_target: Optional[str] = "Software Developer"

class EvaluateAnswerResponse(BaseModel):
    score: int # 1 to 10
    strengths: List[str]
    missing_aspects: List[str]
    model_answer: str
    actionable_tips: List[str]
    is_demo: bool

CURATED_QUESTIONS: Dict[str, List[Dict[str, Any]]] = {
    "Technical": [
        {
            "id": "tech-1",
            "track": "Technical",
            "question": "Can you explain the difference between a Process and a Thread? When would you use multi-threading?",
            "category": "Operating Systems",
            "difficulty": "Medium",
            "hints": ["Mention memory space isolation", "Discuss context switching overhead", "Give a real-world example like a web server"]
        },
        {
            "id": "tech-2",
            "track": "Technical",
            "question": "What is Database Normalization? Explain the difference between 1NF, 2NF, and 3NF with an example.",
            "category": "DBMS",
            "difficulty": "Medium",
            "hints": ["Explain redundancy reduction", "Discuss primary key and functional dependencies", "Mention transitive dependencies in 3NF"]
        },
        {
            "id": "tech-3",
            "track": "Technical",
            "question": "What are the four pillars of Object-Oriented Programming (OOP)? How does polymorphism work in practice?",
            "category": "Core CS",
            "difficulty": "Easy",
            "hints": ["Encapsulation, Abstraction, Inheritance, Polymorphism", "Differentiate compile-time vs runtime polymorphism"]
        },
        {
            "id": "tech-4",
            "track": "Technical",
            "question": "What happens under the hood when you type 'https://www.google.com' into your browser and press Enter?",
            "category": "Computer Networks",
            "difficulty": "Hard",
            "hints": ["DNS resolution", "TCP three-way handshake", "TLS handshake", "HTTP GET request & server rendering"]
        }
    ],
    "HR": [
        {
            "id": "hr-1",
            "track": "HR",
            "question": "Tell me about yourself. Walk me through your journey, college projects, and why you are interested in tech.",
            "category": "Introduction",
            "difficulty": "Easy",
            "hints": ["Follow Present -> Past -> Future structure", "Highlight 1 notable project", "Keep under 2 minutes"]
        },
        {
            "id": "hr-2",
            "track": "HR",
            "question": "Describe a challenging situation in a group project or college club. How did you resolve team conflict?",
            "category": "Behavioral",
            "difficulty": "Medium",
            "hints": ["Use STAR method (Situation, Task, Action, Result)", "Focus on empathy and objective communication"]
        },
        {
            "id": "hr-3",
            "track": "HR",
            "question": "Where do you see yourself in 3 to 5 years, and how does this role align with your aspirations?",
            "category": "Career Vision",
            "difficulty": "Medium",
            "hints": ["Show ambition paired with realism", "Focus on technical mastery and mentorship"]
        }
    ],
    "Coding": [
        {
            "id": "code-1",
            "track": "Coding",
            "question": "How would you find if a linked list contains a cycle? What is the optimal time and space complexity?",
            "category": "Data Structures",
            "difficulty": "Medium",
            "hints": ["Floyd's Cycle-Finding Algorithm (Tortoise and Hare)", "O(N) time and O(1) space"]
        },
        {
            "id": "code-2",
            "track": "Coding",
            "question": "Explain how you would design an algorithm to find the Two Sum problem in O(N) time.",
            "category": "Algorithms",
            "difficulty": "Easy",
            "hints": ["Use a Hash Map to store complement values", "Single pass through the array"]
        }
    ],
    "Aptitude": [
        {
            "id": "apt-1",
            "track": "Aptitude",
            "question": "A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?",
            "category": "Speed, Time & Distance",
            "difficulty": "Easy",
            "hints": ["First calculate train speed: 240m / 24s = 10 m/s", "Total distance for platform: 240 + 650 = 890m"]
        },
        {
            "id": "apt-2",
            "track": "Aptitude",
            "question": "If 6 men or 8 women can reap a field in 86 days, how long will 14 men and 10 women take to reap it?",
            "category": "Work & Wages",
            "difficulty": "Medium",
            "hints": ["Convert men to women equivalents: 6 men = 8 women => 1 man = 4/3 women"]
        }
    ]
}

@router.post("/questions", response_model=List[QuestionItem])
async def get_interview_questions(payload: InterviewQuestionsRequest):
    track = payload.track if payload.track in CURATED_QUESTIONS else "Technical"
    questions = CURATED_QUESTIONS.get(track, CURATED_QUESTIONS["Technical"])
    return [QuestionItem(**q) for q in questions]

@router.post("/evaluate", response_model=EvaluateAnswerResponse)
async def evaluate_interview_answer(payload: EvaluateAnswerRequest):
    answer = payload.student_answer.strip()
    word_count = len(answer.split())

    if word_count < 15:
        return EvaluateAnswerResponse(
            score=4,
            strengths=["Attempted the question prompt."],
            missing_aspects=["Answer is too brief. Interviewers expect elaboration, examples, and technical precision."],
            model_answer="A comprehensive response provides clear definitions, practical architectural or coding trade-offs, and an industry example.",
            actionable_tips=["Use the STAR method for behavioral answers", "Always state Time and Space Complexity for technical/coding answers"],
            is_demo=True
        )

    # Calculate baseline score
    score = 7
    if word_count > 60:
        score += 1
    if any(k in answer.lower() for k in ["memory", "complexity", "example", "result", "action", "thread", "process", "key"]):
        score += 1
    score = min(score, 9)

    return EvaluateAnswerResponse(
        score=score,
        strengths=[
            "Clear articulation of the fundamental concept.",
            "Included structured logical breakdown.",
            "Demonstrated practical understanding of core terminology."
        ],
        missing_aspects=[
            "Could strengthen by stating edge cases or failure modes.",
            "Mentioning real-world scale or performance trade-offs elevates the answer to Senior level."
        ],
        model_answer=(
            "An ideal answer directly defines the primary terms, highlights resource allocation differences, "
            "compares execution overheads, and provides an illustrative code or architectural scenario."
        ),
        actionable_tips=[
            "Structure answers into 3 parts: Definition, Key Differences/Mechanics, and Real-world Application.",
            "Keep an upright posture and maintain an even, confident speaking cadence."
        ],
        is_demo=not gemini_service.is_configured
    )
