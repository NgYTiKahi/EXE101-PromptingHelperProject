import httpx
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

LM_STUDIO_URL = "http://127.0.0.1:1234/v1/chat/completions"

# Prompt Engineer system prompt based on the enhance-prompt skill
SYSTEM_PROMPT = """You are a Stitch Prompt Engineer. Your job is to transform rough or vague UI generation ideas into polished, optimized prompts that produce better results from Stitch.

Follow these rules for the output format:
1. Always include a one-line description of the page purpose and vibe.
2. Include a "DESIGN SYSTEM (REQUIRED):" section specifying Platform, Theme, Background, Primary Accent, Text Primary, etc. Use specific hex codes (e.g. #ffffff).
3. Include a "Page Structure:" section with numbered sections (Header, Hero, Content, Footer).
4. Replace vague terms with specific UI keywords (e.g., "menu at the top" -> "navigation bar with logo and menu items").
5. Add descriptive adjectives to set the mood (clean, modern, playful, sophisticated).

Enhance the user's input directly. Do not converse or add conversational filler. Output only the enhanced prompt."""

async def enhance_prompt_with_lmstudio(user_prompt: str) -> str:
    """
    Sends the user's prompt to the local LM Studio instance (Gemma 4) to get an enhanced version.
    """
    payload = {
        "model": "local-model",  # LM Studio ignores this and uses whatever is loaded
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Please enhance this UI idea: '{user_prompt}'"}
        ],
        "temperature": 0.7,
        "max_tokens": 1024,
        "stream": False
    }

    try:
        async with httpx.AsyncClient(timeout=180.0) as client:
            response = await client.post(LM_STUDIO_URL, json=payload)
            response.raise_for_status()
            
            data = response.json()
            # Extract the generated content
            if "choices" in data and len(data["choices"]) > 0:
                enhanced_text = data["choices"][0]["message"]["content"]
                return enhanced_text.strip()
            else:
                logger.error(f"Unexpected response format from LM Studio: {data}")
                raise HTTPException(status_code=500, detail="Failed to parse response from LM Studio")
                
    except httpx.ConnectError:
        logger.error("Failed to connect to LM Studio. Make sure it is running on http://127.0.0.1:1234")
        raise HTTPException(
            status_code=503, 
            detail="Could not connect to LM Studio. Please ensure the local inference server is running."
        )
    except httpx.ReadTimeout:
        logger.error("LM Studio request timed out")
        raise HTTPException(
            status_code=504,
            detail="The AI model took too long to respond. It might be loading into memory or generating a long response. Please try again."
        )
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error from LM Studio: {e.response.status_code}")
        raise HTTPException(
            status_code=502,
            detail=f"Error from LM Studio API: {e.response.status_code}"
        )
    except Exception as e:
        logger.exception(f"Error during LM Studio request: {e}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while communicating with the AI model."
        )
