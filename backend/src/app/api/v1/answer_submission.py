from typing import Annotated
from fastapi import APIRouter, Path, Body, File
from sqlalchemy.exc import NoResultFound
from src.app.core.exceptions.http_exceptions import NotFoundException
from src.app.api.dependencies import db_dependency, redis_client_dependency, current_user_dependency
from src.app.schemas.user import UserResponse
from src.app.schemas.answer_submission import AnswerSubmissionCreateInternal, AnswerSubmissionResponse
from src.app.crud.crud import answer_submission_crud


router = APIRouter(prefix="/answer_submission", tags=["Answer Submission"])

@router.get("/{ submission_id }")
async def get_submission(db: db_dependency, redis: redis_client_dependency, submission_id: Annotated[int, Path(description="Submission ID", examples=[1, 2, 8])]):
    try:
        return await answer_submission_crud.get(db=db, redis=redis, id=submission_id)
    except NoResultFound:
        raise NotFoundException(detail=f"No answer submission found with id {submission_id}")

@router.post("s/") 
async def submit_answer(
    answer_submission: Annotated[AnswerSubmissionCreateInternal, File()],
    db: db_dependency,
    redis: redis_client_dependency,
    user: Annotated[UserResponse, current_user_dependency],
    question_id: Annotated[int, Body(embed=True)],
    code: Annotated[str, Body(embed=True)]
    ):

    asd = answer_submission.model_dump()

    asd["user_id"] = user.id
    asd["question_id"] = question_id
    asd["code"] = code

    # TODO: Calculate with Groq
    asd["marks_simplicity"] = 34
    asd["marks_output"] = 45
    asd["marks_responsiveness"] = 67

    submission =  AnswerSubmissionCreateInternal(**asd)
    data = await answer_submission_crud.create(db=db, redis=redis, obj_in=submission)
    return data

