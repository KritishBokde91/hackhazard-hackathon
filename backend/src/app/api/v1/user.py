from fastapi import APIRouter
from src.app.api.dependencies import current_user_dependency
router = APIRouter(
    prefix="/user",
    tags=["user"],
)


@router.get("/me")
async def get_user(user : current_user_dependency):
    return user
