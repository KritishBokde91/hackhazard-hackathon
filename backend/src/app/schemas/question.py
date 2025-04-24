from typing import Annotated, Optional
from pydantic import BaseModel, Field, field_validator
from fastapi import File, UploadFile

class Question(BaseModel):
    content : Annotated[str , Field(description="Question content")]
    difficulty : Annotated[str , Field(description="Question dificulty" , examples=["easy" , "medium" , "hard"])]
    @field_validator("difficulty")
    def dificulty_validation(cls , value: str) -> str:
        if value not in ["easy" , "medium" , "hard"]:
            raise ValueError("Invalid dificulty")
        return value

class QuestionCreate(Question):
     image : Annotated[UploadFile, File(description="Question image")]

class QuestionCreateInternal(Question):
    image : Annotated[str , Field(description="Question image")]
    author_id : Annotated[int , Field(description="Question author id")]


class QuestionUpdate(BaseModel):
    id : Annotated[int , Field(description="Question id")]
    content : Annotated[Optional[str] , Field(description="Question content")]
    difficulty : Annotated[Optional[str] , Field(description="Question dificulty" , examples=["easy" , "medium" , "hard"])]
    image : Annotated[Optional[UploadFile], File(description="Question image")]
    @field_validator("difficulty")
    def dificulty_validation(cls , value: str) -> str:
        if value not in ["easy" , "medium" , "hard"]:
            raise ValueError("Invalid dificulty")
        return value


class QuestionUpdateInternal(BaseModel):
    content : Annotated[Optional[str] , Field(description="Question content")]
    difficulty : Annotated[Optional[str] , Field(description="Question dificulty" , examples=["easy" , "medium" , "hard"])]
    image : Annotated[Optional[str] , Field(description="Question image")]

class QuestionResponse(Question):
    id : Annotated[int , Field(description="Question id")]
    author_id : Annotated[int , Field(description="Question author id")]
    image : Annotated[str , Field(description="Question image")]
