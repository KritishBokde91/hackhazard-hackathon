from typing import  Annotated, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, Request

from src.app.schemas.user import UserResponse 

from src.app.crud.crud import user_crud  
from src.app.core.security import create_access_token, verify_token
from src.app.db.database import async_get_db
from src.app.core.exceptions.http_exceptions import UnauthorizedException
from sqlalchemy.exc import NoResultFound

from redis.asyncio import Redis

class UserAuthenticator:
    
    def __init__(self, allow_anonymous: bool = False , check_superuser : bool =  False) -> None:
        """
        Initialize the UserAuthenticator.

        Args:
            allow_anonymous (bool): If True, allows anonymous users without authentication. Defaults to False.
        """
        self.allow_anonymous = allow_anonymous
        self.check_superuser = check_superuser

    async def get_valid_token(self, request: Request) -> str | None:
        """
        Validate token and return a valid access token. If the user is not authenticated and allow_anonymous is True, return None.
        If the user is not authenticated and allow_anonymous is False, raise UnauthorizedException.
        If the refresh token is invalid, raise UnauthorizedException.
        If the access token is invalid, create a new one using the refresh token.
        """
        access_token = request.cookies.get("access_token")
        refresh_token = request.cookies.get("refresh_token")
        
        if not refresh_token:
            if self.allow_anonymous:
                return None
            raise UnauthorizedException(detail="User not authenticated")
            
        valid_refresh_token = await verify_token(refresh_token)
        if not valid_refresh_token:
            if self.allow_anonymous:
                return None
            raise UnauthorizedException(detail="User not authenticated! Invalid token")
        if not access_token or not await verify_token(access_token):
            return create_access_token({"sub": valid_refresh_token.email})
        return access_token

    async def __call__(self, request: Request, db: AsyncSession = Depends(async_get_db)) -> Optional[UserResponse]:
        """Validate token and return authenticated user."""
        token = await self.get_valid_token(request)
        if not token:
            return None
            
        token_data = await verify_token(token)
        if not token_data:
            if self.allow_anonymous:
                return None
            raise UnauthorizedException(detail="Authentication required")
        try:
            user = await user_crud.get(db=db, redis=request.app.state.redis ,email=token_data.email)
        except NoResultFound:
            if self.allow_anonymous:
                return None
            raise UnauthorizedException(detail="User not found") 
        if self.check_superuser and not user.is_superuser:
            raise UnauthorizedException(detail="You are not authorized to perform this action")
        return user


def get_redis_client(req : Request) -> Redis:
    """
    Get a Redis client from the request.

    Returns:
        Redis: The Redis client.
    """
    return req.app.state.redis

db_dependency = Annotated[AsyncSession, Depends(async_get_db)]
redis_client_dependency = Annotated[Redis , Depends(get_redis_client)]





get_authenticated_user = UserAuthenticator()
get_guest_user = UserAuthenticator(allow_anonymous=True)
get_super_user = UserAuthenticator(check_superuser=True)


current_user_dependency = Annotated[UserResponse , Depends(get_authenticated_user)]
guest_user_dependency = Annotated[UserResponse | None , Depends(get_guest_user)]
super_user_dependency = Depends(get_super_user)
valid_token_dependency = Annotated[str , Depends(get_authenticated_user.get_valid_token)]
