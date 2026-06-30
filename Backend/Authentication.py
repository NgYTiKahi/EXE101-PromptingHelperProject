from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

# Initialize the router for authentication endpoints
router = APIRouter(prefix="/auth", tags=["Authentication"])

# Database connection setup (replace with actual MongoDB URI)
# Using motor for asynchronous MongoDB operations as per project rules
MONGO_DETAILS = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.prompt_helper_db
user_collection = database.get_collection("users")

# Pydantic model for input validation
class LoginRequest(BaseModel):
    username: str
    password: str

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
    # NOTE: This uses plaintext for simplicity. In a real application, 
    # use a library like 'passlib' to verify hashed passwords!
    if user.get("password") != user_credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # 4. Return success response (in production, generate and return a JWT token here)
    return {
        "message": "Login successful",
        "user_id": str(user["_id"])
    }
