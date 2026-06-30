from fastapi import FastAPI
from Authentication import router as auth_router
from Homepage import router as home_router

app = FastAPI(
    title="Prompting Helper API",
    description="API for the Prompting Helper Project",
    version="1.0.0",
)

from fastapi.middleware.cors import CORSMiddleware

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers
app.include_router(auth_router)
app.include_router(home_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Prompting Helper API"}
