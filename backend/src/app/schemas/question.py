from typing import Annotated, List, Optional
from pydantic import BaseModel, Field, field_validator
from fastapi import File, UploadFile

class Question(BaseModel):
    title : Annotated[str , Field(description="Question title")]
    answer : Annotated[str , Field(description="Question answer")]
    tags : Annotated[List[str] , Field(description="Question tags")]
    content : Annotated[str , Field(description="Question content")]
    difficulty : Annotated[str , Field(description="Question dificulty" , examples=["easy" , "medium" , "hard"])]
    acceptance : Annotated[float , Field(description="Question acceptance rate")]

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
    title : Annotated[Optional[str] , Field(description="Question title")]
    answer : Annotated[Optional[str] , Field(description="Question answer")]
    content : Annotated[Optional[str] , Field(description="Question content")]
    difficulty : Annotated[Optional[str] , Field(description="Question dificulty" , examples=["easy" , "medium" , "hard"])]
    image : Annotated[Optional[UploadFile], File(description="Question image")]
    tags : Annotated[Optional[List[str]] , Field(description="Question tags")]
    acceptance : Annotated[Optional[float] , Field(description="Question acceptance rate")]

    @field_validator("difficulty")
    def dificulty_validation(cls , value: str) -> str:
        if value not in ["easy" , "medium" , "hard"]:
            raise ValueError("Invalid dificulty")
        return value


class QuestionUpdateInternal(BaseModel):
    title : Annotated[Optional[str] , Field(description="Question title")]
    answer : Annotated[Optional[str] , Field(description="Question answer")]
    content : Annotated[Optional[str] , Field(description="Question content")]
    difficulty : Annotated[Optional[str] , Field(description="Question dificulty" , examples=["easy" , "medium" , "hard"])]
    image : Annotated[Optional[str] , Field(description="Question image")]
    tags : Annotated[Optional[List[str]] , Field(description="Question tags")]
    acceptance : Annotated[Optional[float] , Field(description="Question acceptance rate")]

class QuestionResponse(Question):
    id : Annotated[int , Field(description="Question id")]
    author_id : Annotated[int , Field(description="Question author id")]
    image : Annotated[str , Field(description="Question image")]
