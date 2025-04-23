from typing import Annotated, Optional
from fastapi import File, UploadFile
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserSchema(BaseModel):
    """Base schema for user data with common fields."""
    model_config = ConfigDict(from_attributes=True)
    
    name: Annotated[str, Field(
        min_length=2, 
        max_length=50, 
        examples=["John Doe"],
        description="User's full name"
    )]
    profile: Annotated[Optional[str], Field(
        default=None,
        description="User's profile information or URL"
    )]
    email: Annotated[EmailStr, Field(
        examples=["user@example.com"],
        description="User's email address"
    )]


class UserResponse(UserSchema):
    """Schema for user response with additional fields."""
    id: Annotated[int , Field(
        description="User's unique identifier"
    )]
    is_superuser: Annotated[bool, Field(
        default=False,
        description="Flag indicating if user has admin privileges"
    )]


class UserCreate(UserSchema):
    """Schema for creating a new user."""
    pass


class UserUpdate(BaseModel):
    """Schema for updating user information."""
    model_config = ConfigDict(from_attributes=True)

    name: Annotated[Optional[str], Field(
        default=None,
        min_length=2, 
        max_length=50, 
        examples=["John Doe"],
        description="User's full name"
    )]
    username: Annotated[Optional[str], Field(
        default=None,
        min_length=2, 
        max_length=50, 
        examples=["johndoe"], 
        pattern="^[a-zA-Z0-9_]+$",
        description="User's unique username (alphanumeric and underscores only)"
    )]
    profile: Annotated[Optional[UploadFile], File(
        description="User's profile image file"
    )] = None
    language : Annotated[Optional[str] , Field(
        default="english",
        description="User's prefered language to read verse!"
    )]



class UserUpdateInternal(UserSchema):
    """Schema for internal user updates (admin use)."""
    pass


