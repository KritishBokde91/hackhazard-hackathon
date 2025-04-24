from typing import Annotated
from fastapi import APIRouter, Query
from sqlalchemy.exc import IntegrityError
from src.app.core.exceptions.http_exceptions import DuplicateValueException
from src.app.schemas.question import QuestionCreate, QuestionCreateInternal
from src.app.schemas.user import UserResponse
from src.app.crud.crud import question_crud
from src.app.api.dependencies import super_user_dependency , db_dependency , redis_client_dependency

router = APIRouter(prefix="/question" , tags=["Question"])


@router.get("/")
async def get_questions(db : db_dependency , redis : redis_client_dependency , limit : Annotated[int , Query(description="Limit to fecth data" , examples=[10 , 30])] , page : Annotated[int , Query(description="Page number" , examples=[1 , 2])]):
    return await question_crud.get_multi(db=db , redis=redis , order_by="id" ,  ascending=False,  limit=limit , page=page)


@router.post("s/")
async def create_question(question : QuestionCreate , user : Annotated[UserResponse , super_user_dependency] , db : db_dependency , redis : redis_client_dependency):
    question_dict = question.model_dump()
    question_dict["author_id"] = user.id
    question_create_internal = QuestionCreateInternal(**question_dict)
    try:
        data = await question_crud.create(db=db , redis=redis , obj_in=question_create_internal)
    except IntegrityError:
        raise DuplicateValueException(detail="Question already exists")
    return data
