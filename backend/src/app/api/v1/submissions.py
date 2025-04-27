from typing import Annotated
from fastapi import APIRouter, Depends, Path, Body  
from httpx import AsyncClient
from sqlalchemy.exc import NoResultFound
from src.app.core.exceptions.http_exceptions import NotFoundException
from src.app.api.dependencies import db_dependency, get_httpx_client, redis_client_dependency, current_user_dependency
from src.app.schemas.answer_submission import AnswerSubmissionCreateInternal 
from src.app.crud.crud import answer_submission_crud
from src.app.crud.crud import question_crud
from src.app.api.v1.utils import groq_answer_verify

router = APIRouter(prefix="/submissions", tags=["Answer Submission"])

@router.get("/question/{question_id}")
async def get_submissions_for_question(db: db_dependency, redis: redis_client_dependency,user : current_user_dependency, question_id: Annotated[int, Path(description="Question ID", examples=[1, 2, 8])]):
    data =await answer_submission_crud.get_multi(db=db, redis=redis, user_id=user.id, question_id=question_id)
    return data


@router.get("/{submission_id}")
async def get_submission(db: db_dependency, redis: redis_client_dependency, user: current_user_dependency, submission_id: Annotated[int, Path(description="Submission ID", examples=[1, 2, 8])]):
    try:
        return await answer_submission_crud.get(db=db, redis=redis, id=submission_id , user_id=user.id)
    except NoResultFound:
        raise NotFoundException(detail=f"No answer submission found with id {submission_id}")

@router.post("/{question_id}")
async def submit_answer(
    db: db_dependency,
    redis: redis_client_dependency,
    user: current_user_dependency,
    question_id: Annotated[int, Path(embed=True)],
    code: Annotated[str, Body(embed=True)],
    httpx_client: Annotated[AsyncClient, Depends(get_httpx_client)],
    ):
    try:
        question = await question_crud.get(db=db, redis=redis, id=question_id)
    except NoResultFound:
        raise NotFoundException(detail=f"No question found with id {question_id}")
    # if question.author_id == user.id:
    #     raise NotFoundException(detail=f"Cannot submit answer for your own question")

    marks  = await groq_answer_verify(httpx_client=httpx_client, question=question, code=code)
    answer_submission_create_internal = AnswerSubmissionCreateInternal(
        question_id=question_id,
        user_id=user.id,
        code=code,
        **marks.model_dump()
    )
    data = await answer_submission_crud.create(db=db, redis=redis, obj_in=answer_submission_create_internal , question_id=question_id , user_id=user.id)
    return data
