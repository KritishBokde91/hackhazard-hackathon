from fastrdb import FastRDB 
from src.app.db.models.user import User
from src.app.schemas.user import UserCreate, UserResponse, UserUpdate 


user_crud = FastRDB[User , UserCreate , UserUpdate , UserResponse](
    User , UserResponse , pattern="user:email:{email}" , list_pattern="user:page{page}:limit:{limit}" , invalidate_pattern_prefix="" , exp=60
)
