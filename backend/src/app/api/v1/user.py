from fastapi import APIRouter
from src.app.core.exceptions.http_exceptions import BadRequestException , DuplicateValueException
from src.app.schemas.user import UserCreate
from src.app.api.dependencies import current_user_dependency
from src.app.crud.crud import user_crud
from src.app.api.dependencies import db_dependency , guest_user_dependency , redis_client_dependency
from sqlalchemy.exc import IntegrityError
router = APIRouter(
    prefix="/user",
    tags=["user"],
)


@router.get("/me")
async def get_user(user : current_user_dependency):
    return user

@router.post("/")
async def add_user(user : UserCreate , db : db_dependency ,redis : redis_client_dependency , g_user : guest_user_dependency ):
    if g_user:
        raise BadRequestException(detail="You are already logged in")
    try :
        return await user_crud.create(db = db , redis = redis , obj_in = user , email = user.email)
    except IntegrityError:
        raise DuplicateValueException(detail="Email already exists")