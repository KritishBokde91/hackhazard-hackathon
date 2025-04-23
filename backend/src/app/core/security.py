from datetime import timedelta, timezone
from datetime import datetime
from typing import Any
from jose import JWTError , jwt

from src.app.core.schemas import TokenData
from src.app.core.config import settings



SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
REFRESH_TOKEN_EXPIRE_DAYS = settings.REFRESH_TOKEN_EXPIRE_DAYS

async def verify_token(token: str) -> TokenData | None:
    """
    Verifies a given token and returns the email if it is valid.

    Args:
        token (str): The token to verify.

    Returns:
        TokenData | None: The email if the token is valid, otherwise None.
    """
    try:
        payload = jwt.decode(token , SECRET_KEY , algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            return None
        return TokenData(email = email)
    except JWTError:
        return None
    

def create_access_token(data : dict[str , Any]) -> str:
    """
    Creates an access token using the given data and the SECRET_KEY.

    Args:
        data (dict[str, Any]): The data to encode into the token.

    Returns:
        str: The JWT access token.
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data : dict[str , Any]) -> str:
    """
    Creates a refresh token using the given data and the SECRET_KEY.

    Args:
        data (dict[str, Any]): The data to encode into the refresh token.

    Returns:
        str: The JWT refresh token.
    """

    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


