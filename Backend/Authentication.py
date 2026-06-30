from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import bcrypt

# Initialize the router for authentication endpoints
router = APIRouter(prefix="/auth", tags=["Authentication"])

# Database connection setup
MONGO_DETAILS = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.prompt_helper_db
user_collection = database.get_collection("users")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

# Pydantic models
class RegisterRequest(BaseModel):
    username: str
    password: str
    role: Optional[str] = Field(default="user", pattern="^(user|admin)$")

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_details: RegisterRequest):
    """
    Registers a new user (or admin) in the MongoDB database.
    """
    # Check if user already exists
    existing_user = await user_collection.find_one({"username": user_details.username})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Hash the password
    hashed_password = get_password_hash(user_details.password)
    
    # Create the user document
    user_document = {
        "username": user_details.username,
        "password": hashed_password,
        "role": user_details.role
    }
    
    # Insert asynchronously
    result = await user_collection.insert_one(user_document)
    
    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id),
        "role": user_details.role
    }

@router.post("/login")
async def login(user_credentials: LoginRequest):
    """
    Authenticates a user by checking their credentials against the MongoDB database.
    This operation is fully asynchronous to prevent blocking during DB queries.
    """
    # 1. Asynchronously find the user in the database
    user = await user_collection.find_one({"username": user_credentials.username})
    
    # 2. Check if user exists
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # 3. Verify password
    if not verify_password(user_credentials.password, user.get("password")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # 4. Return success response with role
    return {
        "message": "Login successful",
        "user_id": str(user["_id"]),
        "role": user.get("role", "user")
    }
