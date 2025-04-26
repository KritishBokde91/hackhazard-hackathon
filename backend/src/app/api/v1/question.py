import os
from typing import Annotated
from fastapi import APIRouter, File, Path, Query, UploadFile
from uuid import uuid4
from sqlalchemy.exc import IntegrityError, NoResultFound
from src.app.core.exceptions.http_exceptions import DuplicateValueException, NotFoundException
from src.app.schemas.question import QuestionCreate, QuestionCreateInternal, QuestionUpdate, QuestionUpdateInternal
from src.app.schemas.user import UserResponse
from src.app.crud.crud import question_crud
from src.app.api.dependencies import super_user_dependency , db_dependency , redis_client_dependency
from src.app.core.config import settings

router = APIRouter(prefix="/question" , tags=["Question"])

def upload_file(file: UploadFile) -> str:
    os.makedirs(settings.IMAGES_DIR, exist_ok=True)
    _, ext = os.path.splitext(file.filename)
    filename = f"{uuid4().hex}{ext}"
    path = os.path.join(settings.IMAGES_DIR, filename)
    with open(path, 'wb') as buffer:
        buffer.write(file.file.read())
    return settings.IMAGES_URL_PREFIX + filename

@router.get("/{question_id}")
async def get_question(db: db_dependency , redis : redis_client_dependency , question_id : Annotated[int , Path(description="Question id" , examples=[1 , 2])]):
    try:
        question = await question_crud.get(db=db , redis=redis , id=question_id)
        # remove answer from response
        return question.model_dump(exclude={"answer"})
    except NoResultFound:
        raise NotFoundException(detail=f"Question not found with id {question_id}")

@router.get("s/")
async def get_questions(db : db_dependency , redis : redis_client_dependency , limit : Annotated[int , Query(description="Limit to fecth data" , examples=[10 , 30])] , page : Annotated[int , Query(description="Page number" , examples=[1 , 2])]):
    questions = await question_crud.get_multi(db=db , redis=redis , order_by="id" ,  ascending=False,  limit=limit , page=page)
    return question_crud.paginate(data=[question.model_dump(exclude={"answer"}) for question in questions] , page=page , limit=limit)

@router.post("s/")
async def create_question(question : Annotated[QuestionCreate , File()] , user : Annotated[UserResponse , super_user_dependency] , db : db_dependency , redis : redis_client_dependency):
    question_dict = question.model_dump()
    question_dict["author_id"] = user.id
    file_path = upload_file(question.image)
    question_dict["image"] = file_path
    question_create_internal = QuestionCreateInternal(**question_dict)
    try:
        data = await question_crud.create(db=db , redis=redis , obj_in=question_create_internal , content=question.content)
    except IntegrityError:
        raise DuplicateValueException(detail="Question already exists")
    return data


@router.patch("/{question_id}" , dependencies=[super_user_dependency])
async def update_question(db : db_dependency , redis : redis_client_dependency , question_id : Annotated[int , Path(description="Question id" , examples=[1 , 2])] , question : QuestionUpdate):
    try:
        question_dict = question.model_dump()
        if question.image is not None:
            file_path = upload_file(question.image)
            question_dict["image"] = file_path
        update_question_internal = QuestionUpdateInternal.model_validate(question_dict)
        return await question_crud.update(db=db , redis=redis , obj_in=update_question_internal , id=question.id)
    except NoResultFound:
        raise NotFoundException(detail=f"Question not found with id {question_id}")

@router.delete("/{question_id}" , dependencies=[super_user_dependency])
async def delete_question(db : db_dependency , redis : redis_client_dependency , question_id : Annotated[int , Path(description="Question id" , examples=[1 , 2])]):
    try:
        return await question_crud.delete(db=db , redis=redis , id=question_id)
    except NoResultFound:
        raise NotFoundException(detail=f"Question not found with id {question_id}")
