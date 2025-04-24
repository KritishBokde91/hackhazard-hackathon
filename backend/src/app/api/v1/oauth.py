from fastapi.responses import RedirectResponse
from pydantic_core import Url
from typing import Annotated, Any 
from fastapi import APIRouter,  Query, Request, Response
from authlib.integrations.starlette_client import OAuth #type: ignore
from authlib.integrations.base_client.errors import OAuthError , MismatchingStateError
from sqlalchemy.exc import NoResultFound
from starlette.config import Config
from starlette import status

from src.app.crud.crud import user_crud
from src.app.schemas.user import  UserCreate
from src.app.core.security import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DAYS, create_access_token, create_refresh_token
from src.app.core.exceptions.http_exceptions import CustomException  , UnauthorizedException 
from src.app.api.dependencies import db_dependency , valid_token_dependency , redis_client_dependency
from src.app.core.logger import logging

logger = logging.getLogger(__name__)

config = Config('.env')
oauth = OAuth(config)
google_oauth = oauth.register( #type: ignore
    name="google",
       server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)



router = APIRouter(tags=["Login"])




@router.get("/login/google")
async def login(request : Request , redirect: Annotated[Url|None, Query()] = None)-> str:
    """
    Redirect the user to Google's authorization page to obtain a token.

    Args:
    request (Request): The incoming HTTP request.
    redirect (Url|None, optional): The URL to redirect the user to after authorization. Defaults to None.

    Raises:
    Exception: If Google OAuth is not configured.

    Returns:
    str: The redirect response.
    """
    redirect_url = request.url_for('auth')
    if google_oauth:
        return await google_oauth.authorize_redirect(request, redirect_url , state=str(redirect or '/')) #type: ignore
    else:
        raise Exception("Google OAuth is not configured")

@router.get("/callbak/google")
async def auth(request: Request, db: db_dependency , redis :redis_client_dependency ) -> RedirectResponse:
    """
    Handle the callback from Google OAuth and log the user in.

    Args:
        request (Request): The incoming HTTP request.
        db (AsyncSession): The database session.

    Raises:
        CustomException: If Google OAuth is not configured.
        UnauthorizedException: If unable to verify state or user not authenticated.
        CustomException: If something went wrong.Try again!

    Returns:
        RedirectResponse: The redirect response with cookies set.
    """
    if not google_oauth:
        raise CustomException(detail="Google Service is not configured. Please contact the administrator")
    
    try:
        redirect = request.query_params.get('state') or "/"
        token: dict[str, Any] = await google_oauth.authorize_access_token(request) #type: ignore
        user: dict[str, str] = token['userinfo'] #type: ignore
        try:
            await user_crud.get(db,redis=redis, email=user['email'])
        except NoResultFound:
            user_credential = UserCreate(name=user['name'], email=user['email'], profile=user['picture']) #type:ignore 
            await user_crud.create(db=db,redis=redis, obj_in=user_credential , email=user['email'])
        access_token = create_access_token({"sub": user['email']})
        refresh_token = create_refresh_token({"sub": user['email']})
        
        response = RedirectResponse(
            url=redirect,  # Replace with your frontend URL
            status_code=302
        )
        
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            max_age=REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
            httponly=True,
            secure=True,  
            samesite="lax" 
        )
        
        response.set_cookie(
            key="access_token",
            value=access_token,
            max_age=(ACCESS_TOKEN_EXPIRE_MINUTES * 60),
            httponly=True,
            secure=True, 
            samesite="lax" 
        )        
        return response
        
    except MismatchingStateError:
        raise UnauthorizedException(detail="Unable to verify state")
    except OAuthError:
        raise UnauthorizedException(detail="User not authenticated")
    except Exception as e:
        print("THIS IS A ERR : " , e)
        logger.error(f"Error: {e}")
        raise CustomException(detail="Something went wrong.Try again!")


@router.post("/token")
async def token(token : valid_token_dependency):
    """
    Get a new access token for the authenticated user.

    Args:
        token (Annotated[str, Depends(get_authenticated_user.get_valid_token)]): The token obtained from the cookie.

    Returns:
        dict[str, str]: A dictionary containing the new access token and its type.
    """
    return {"access_token": token , "token_type": "bearer"}


@router.post("/logout" , status_code=status.HTTP_200_OK)
async def logout(response : Response):
    """
    Delete the refresh and access tokens from the cookies and return a success response.

    Args:
        response (Response): The response object.

    Returns:
        dict[str, str]: A dictionary containing the success message.
    """
    response.delete_cookie("refresh_token")
    response.delete_cookie("access_token")
    return {"message": "Logout successful"}
