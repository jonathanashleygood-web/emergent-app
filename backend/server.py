from fastapi import FastAPI, APIRouter, HTTPException, Query, Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import timedelta
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ===== Admin Auth =====
JWT_SECRET = os.environ.get("JWT_SECRET")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL")
ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8  # 8 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/admin/login")


def verify_password(plain_password: str, password_hash: str) -> bool:
    return pwd_context.verify(plain_password, password_hash)


def create_access_token(subject: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


def require_admin(token: str = Depends(oauth2_scheme)) -> str:
    if not JWT_SECRET or not ADMIN_EMAIL or not ADMIN_PASSWORD_HASH:
        raise HTTPException(status_code=500, detail="Admin auth not configured")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = payload.get("sub")
        if not email or email != ADMIN_EMAIL:
            raise HTTPException(status_code=401, detail="Unauthorized")
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Unauthorized")


# ========== Models ==========

class TravelInquiryCreate(BaseModel):
    # Identity
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    preferred_contact_method: str = "email"  # email, phone, whatsapp
    
    # Trip Basics
    destinations: str
    destination_flexibility: str = "open"  # fixed, open
    departure_airport: str
    departure_flexible: bool = False
    travel_start_date: Optional[str] = None
    travel_end_date: Optional[str] = None
    travel_date_notes: Optional[str] = None
    trip_length_nights: Optional[int] = None
    
    # Group & Budget
    adult_count: int = 1
    child_count: int = 0
    child_ages: Optional[str] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    budget_flexibility: str = "flexible"  # fixed, flexible, unsure
    budget_scope: str = "total_trip"  # per_person, total_trip
    
    # Travel Style
    travel_pace: str = "balanced"  # relaxed, balanced, fast
    travel_interests: List[str] = []  # culture, adventure, food_wine, beach, nature, city, luxury, value
    accommodation_type: List[str] = []  # boutique_hotel, resort, apartment_villa, standard_hotel
    accommodation_priority: str = "flexible"  # comfort, design, location, flexible
    
    # Flights & Transport
    flight_priority: str = "balanced"  # cheapest, fastest, direct, balanced
    layover_tolerance: str = "flexible"  # none, short_only, flexible
    airline_preferences: Optional[str] = None
    transport_preference: List[str] = []  # transfers, public_transport, car_hire, flexible
    
    # Experiences
    must_do_experiences: Optional[str] = None
    exploration_style: str = "mixed"  # guided, independent, mixed
    special_occasion: Optional[str] = None
    
    # Practical
    dietary_requirements: Optional[str] = None
    accessibility_needs: Optional[str] = None
    passport_valid: str = "yes"  # yes, no, unsure
    
    # Sales / Intent
    booking_timeline: str = "exploring"  # exploring, 1_3_months, ready
    planning_style: str = "collaborative"  # full_service, options, collaborative


class TravelInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    
    # Identity
    first_name: str
    last_name: str
    email: str
    phone: Optional[str] = None
    preferred_contact_method: str = "email"
    
    # Trip Basics
    destinations: str
    destination_flexibility: str = "open"
    departure_airport: str
    departure_flexible: bool = False
    travel_start_date: Optional[str] = None
    travel_end_date: Optional[str] = None
    travel_date_notes: Optional[str] = None
    trip_length_nights: Optional[int] = None
    
    # Group & Budget
    adult_count: int = 1
    child_count: int = 0
    child_ages: Optional[str] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    budget_flexibility: str = "flexible"
    budget_scope: str = "total_trip"
    
    # Travel Style
    travel_pace: str = "balanced"
    travel_interests: List[str] = []
    accommodation_type: List[str] = []
    accommodation_priority: str = "flexible"
    
    # Flights & Transport
    flight_priority: str = "balanced"
    layover_tolerance: str = "flexible"
    airline_preferences: Optional[str] = None
    transport_preference: List[str] = []
    
    # Experiences
    must_do_experiences: Optional[str] = None
    exploration_style: str = "mixed"
    special_occasion: Optional[str] = None
    
    # Practical
    dietary_requirements: Optional[str] = None
    accessibility_needs: Optional[str] = None
    passport_valid: str = "yes"
    
    # Sales / Intent
    booking_timeline: str = "exploring"
    planning_style: str = "collaborative"
    
    # Meta
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    source: str = "website_form"
    status: str = "new"  # new, contacted, in_progress, booked, archived


class InquiryStats(BaseModel):
    total: int
    new: int
    contacted: int
    in_progress: int
    booked: int


# ========== Routes ==========

class AdminLogin(BaseModel):
    email: EmailStr
    password: str


@api_router.post("/admin/login")
async def admin_login(body: AdminLogin):
    if not ADMIN_EMAIL or not ADMIN_PASSWORD_HASH or not JWT_SECRET:
        raise HTTPException(status_code=500, detail="Admin auth not configured")
    if body.email != ADMIN_EMAIL or not verify_password(body.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(subject=ADMIN_EMAIL)
    return {"access_token": token, "token_type": "bearer"}


@api_router.get("/")
async def root():
    return {"message": "Little Luxe GETAWAYS API"}


@api_router.post("/inquiries", response_model=TravelInquiry)
async def create_inquiry(input: TravelInquiryCreate):
    inquiry_obj = TravelInquiry(**input.model_dump())
    doc = inquiry_obj.model_dump()
    await db.travel_inquiries.insert_one(doc)
    return inquiry_obj


@api_router.get("/inquiries", response_model=List[TravelInquiry])
async def get_inquiries(
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    limit: int = Query(100, le=500),
    skip: int = Query(0),
    admin_email: str = Depends(require_admin)
):
    query = {}
    if status:
        query["status"] = status
    if search:
        query["$or"] = [
            {"first_name": {"$regex": search, "$options": "i"}},
            {"last_name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}},
            {"destinations": {"$regex": search, "$options": "i"}}
        ]
    
    inquiries = await db.travel_inquiries.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return inquiries


@api_router.get("/inquiries/stats", response_model=InquiryStats)
async def get_inquiry_stats(admin_email: str = Depends(require_admin)):
    total = await db.travel_inquiries.count_documents({})
    new = await db.travel_inquiries.count_documents({"status": "new"})
    contacted = await db.travel_inquiries.count_documents({"status": "contacted"})
    in_progress = await db.travel_inquiries.count_documents({"status": "in_progress"})
    booked = await db.travel_inquiries.count_documents({"status": "booked"})
    
    return InquiryStats(
        total=total,
        new=new,
        contacted=contacted,
        in_progress=in_progress,
        booked=booked
    )


@api_router.get("/inquiries/{inquiry_id}", response_model=TravelInquiry)
async def get_inquiry(inquiry_id: str):
    inquiry = await db.travel_inquiries.find_one({"id": inquiry_id}, {"_id": 0})
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return inquiry


@api_router.patch("/inquiries/{inquiry_id}/status")
async def update_inquiry_status(inquiry_id: str, status: str = Query(...)):
    valid_statuses = ["new", "contacted", "in_progress", "booked", "archived"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    result = await db.travel_inquiries.update_one(
        {"id": inquiry_id},
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    
    return {"message": "Status updated", "status": status}


@api_router.delete("/inquiries/{inquiry_id}")
async def delete_inquiry(inquiry_id: str):
    result = await db.travel_inquiries.delete_one({"id": inquiry_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"message": "Inquiry deleted"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
