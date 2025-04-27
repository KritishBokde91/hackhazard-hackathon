from datetime import datetime
from typing import Annotated
from pydantic import BaseModel, ConfigDict, Field

class Marks(BaseModel):
    marks_simplicity: Annotated[float, Field(
        default=0,
        ge=0,
        le=100,
    )]

    marks_output:  Annotated[float, Field(
        default=0,
        ge=0,
        le=100,
    )]

    marks_responsiveness:  Annotated[float, Field(
        default=0,
        ge=0,
        le=100,
    )]

    total_score : Annotated[float, Field(
        default=0,
        ge=0,
        le=100,
    )]

    status : Annotated[str, Field(
        description="Status of the answer submission"
    )]

class AnsewerSubmissionSchema(Marks):
    
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
    
class AnswerSubmissionCreateInternal(Marks):

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
    date : Annotated[datetime, Field(
        description="Answer submission date"
    )]
    class Config:
        orm_mode = True

