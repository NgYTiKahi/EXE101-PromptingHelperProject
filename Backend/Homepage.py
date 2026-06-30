from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from gemma4model import enhance_prompt_with_lmstudio
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/home", tags=["Home"])

class EnhanceRequest(BaseModel):
    prompt: str

class EnhanceResponse(BaseModel):
    enhanced_prompt: str

@router.post("/enhance", response_model=EnhanceResponse)
async def enhance_prompt(request: EnhanceRequest):
    """
    Takes a user's raw prompt, sends it to the local LM Studio instance running Gemma 4,
    and returns the enhanced prompt optimized for UI generation.
    """
    if not request.prompt or not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")
        
    try:
        enhanced_text = await enhance_prompt_with_lmstudio(request.prompt)
        return EnhanceResponse(enhanced_prompt=enhanced_text)
    except HTTPException:
        # Re-raise HTTP exceptions from the gemma4model
        raise
    except Exception as e:
        logger.exception(f"Unexpected error in enhance_prompt endpoint: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred")
