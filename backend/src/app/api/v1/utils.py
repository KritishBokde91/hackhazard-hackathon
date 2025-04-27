import io
from typing import Any
from fastapi import UploadFile
from httpx import AsyncClient

from src.app.core.exceptions.http_exceptions import CustomException, UnExpectedException
from src.app.schemas.question import QuestionResponse
from src.app.core.config import settings
from cloudinary.uploader import upload as cloudinary_upload # type:ignore 
import httpx , orjson
from  src.app.schemas.answer_submission import Marks
async def upload_image(image: UploadFile ) -> str:
    """
    Upload the given file to cloudinary and return the public URL.

    Args:
    profile (UploadFile): The file to upload.

    Returns:
    str: The public URL where the file can be accessed.

    Raises:
    UnExpectedException: If there is an error while uploading the file.
    """
    try:
        content = await image.read()
        stream = io.BytesIO(content)
        response :  dict[str , Any] = cloudinary_upload(stream, folder="images")
        return response['secure_url']
    except Exception as e:
        print(e)
        raise UnExpectedException(detail="Failed to upload image")



VERIFY_FRONTEND_SKILLS_PROMPT = """
You are an expert frontend code reviewer. Your task is to verify a user's frontend development skills based on the provided information:

Inputs:
- Title of the question.
- Content (description) of the question.
- Reference answer code (official solution).
- Image of the intended UI.
- User's submitted code.

Instructions:
- Analyze the user's code carefully by comparing it to the reference answer and the UI image.
- Different code approaches are acceptable as long as the final visual output matches the intended UI.
- Evaluate the user's submission based on these three criteria:

  1. marks_simplicity (0–100):
     - Measure how clean, simple, and maintainable the user's code is.

  2. marks_output (0–100):
     - Measure how accurately the user's UI output matches the intended UI.

  3. marks_responsiveness (0–100):
     - Measure how well the user's code handles responsiveness across different screen sizes.

- Calculate:
  - total_score: The average of the three marks (rounded to the nearest integer).
  - status:
    - "passed" if total_score >= 60,
    - "failed" if total_score < 60.

Output:
- Return the evaluation strictly as a raw JSON object in the following format, without any explanation, comments, markdown syntax, or formatting:

{
  "marks_simplicity": 0,
  "marks_output": 0,
  "marks_responsiveness": 0,
  "total_score": 0,
  "status": "passed"
}

- Do not include any backticks, the word "json", or any additional text before or after the object.
"""
async def groq_answer_verify(httpx_client: AsyncClient, question: QuestionResponse, code: str) -> Marks:
    """
    Verify user code against a question using Groq's API.
    
    Args:
        httpx_client: AsyncClient for making HTTP requests
        question: QuestionResponse object containing question details
        code: User's code submission
        
    Returns:
        dict: The parsed AI evaluation response as JSON
        
    Raises:
        HTTPException: For API request errors
    """
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {settings.GROQ_API_KEY}"
    }
    
    message = f"""Question Title: {question.title}
Question Content: {question.content}
Question Answer: {question.answer}
User Code: {code}"""
    
    payload = {
        "messages": [
            {
                "role": "system",
                "content": VERIFY_FRONTEND_SKILLS_PROMPT
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": message
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": question.image
                        }
                    }
                ]
            }
        ],
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": False,
        "stop": None
    }
    
    try:
        response = await httpx_client.post(url, headers=headers, json=payload, timeout=60.0)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        
        # Parse the Groq API response
        api_response = response.json()
        print("Groq API response:", api_response) 
        # Extract the AI's content from the response
        if "choices" in api_response and len(api_response["choices"]) > 0:
            ai_content = api_response["choices"][0]["message"]["content"]
            
            ai_content = ai_content.strip()
            if ai_content.startswith("```json"):
                ai_content = ai_content[7:].strip()
            elif ai_content.startswith("```"):
                ai_content = ai_content[3:].strip()
            
            if ai_content.endswith("```"):
                ai_content = ai_content[:-3].strip()
                
            if ai_content.lower().startswith("json"):
                ai_content = ai_content[4:].strip()
                
            try:
                return Marks.model_validate_json(ai_content)
            except orjson.JSONDecodeError as json_err:
                print(f"Failed to parse AI response as JSON: {str(json_err)}")
                print(f"AI response content: {ai_content}")
                raise CustomException(status_code=500, detail="Invalid JSON in AI response")
        else:
            print("Unexpected API response format - missing 'choices' or empty choices array")
            raise CustomException(status_code=500, detail="Unexpected API response format")
            
    except httpx.TimeoutException:
        print("Request to Groq API timed out")
        raise CustomException(status_code=504, detail="Request to Groq API timed out")
        
    except httpx.HTTPStatusError as e:
        print(f"HTTP error occurred: {e.response.status_code} - {e.response.text}")
        error_detail = f"Groq API error: {e.response.status_code}"
        try:
            error_json = e.response.json()
            if "error" in error_json:
                error_detail += f" - {error_json['error'].get('message', 'Unknown error')}"
        except:
            pass
        raise CustomException(status_code=e.response.status_code, detail=error_detail)
        
    except Exception as e:
        print(f"Unexpected error while calling Groq API: {str(e)}")
        raise CustomException(status_code=500, detail=f"Unexpected error: {str(e)}")
