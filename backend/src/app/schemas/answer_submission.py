from typing import Annotated
from pydantic import BaseModel, ConfigDict, Field


class AnsewerSubmissionSchema(BaseModel):
    
    model_config = ConfigDict(from_attributes=True)

    question_id: Annotated[int, Field(
        description="Question ID"
    )]

    user_id: Annotated[int, Field(
        description="User ID"
    )]

    code: Annotated[str, Field(
        min_length=1,
        max_length=4096,
        description="Submitted code"
    )]
    
    marks_simplicity: Annotated[int, Field(
        default=0,
        ge=0,
        le=100,
    )]

    marks_output:  Annotated[int, Field(
        default=0,
        ge=0,
        le=100,
    )]

    marks_responsiveness:  Annotated[int, Field(
        default=0,
        ge=0,
        le=100,
    )]


class AnswerSubmissionCreateInternal(BaseModel):

    question_id: Annotated[int, Field(
        description="Question ID"
    )]

    user_id: Annotated[int, Field(
        description="User ID"
    )]

    code: Annotated[str, Field(
        min_length=1,
        max_length=4096,
        description="Submitted code"
    )]


class AnswerSubmissionUpdateInternal(AnsewerSubmissionSchema):

    id: Annotated[int, Field(
        description="Answer submission ID"
    )]


class AnswerSubmissionResponse(AnsewerSubmissionSchema):

    id: Annotated[int, Field(
        description="Answer submission ID"
    )]

    class Config:
        orm_mode = True

