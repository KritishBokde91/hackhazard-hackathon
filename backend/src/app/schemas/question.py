from typing import Annotated, Optional
from pydantic import BaseModel, Field, field_validator


class Question(BaseModel):
    content : Annotated[str , Field(description="Question content")]
    difficulty : Annotated[str , Field(description="Question dificulty" , examples=["easy" , "medium" , "hard"])]
    @field_validator("difficulty")
    def dificulty_validation(cls , value: str) -> str:
        if value not in ["easy" , "medium" , "hard"]:
            raise ValueError("Invalid dificulty")
        return value

class QuestionCreate(Question):
    pass

class QuestionCreateInternal(QuestionCreate):
    author_id : Annotated[int , Field(description="Question author id")]

class QuestionUpdate(BaseModel):
    content : Annotated[Optional[str] , Field(description="Question content")]
    difficulty : Annotated[Optional[str] , Field(description="Question dificulty" , examples=["easy" , "medium" , "hard"])]

    @field_validator("difficulty")
    def dificulty_validation(cls , value: str) -> str:
        if value not in ["easy" , "medium" , "hard"]:
            raise ValueError("Invalid dificulty")
        return value

class QuestionResponse(Question):
    id : Annotated[int , Field(description="Question id")]
    author_id : Annotated[int , Field(description="Question author id")]

