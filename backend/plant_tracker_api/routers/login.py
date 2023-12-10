from fastapi.security import OAuth2PasswordRequestForm
from pydantic import UUID4
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_sqlalchemy import db
from typing import List
from utils import create_access_token, create_refresh_token, get_hashed_password, verify_password
import models
import schema


router = APIRouter()


@router.post(
    "/login", summary="Create access and refresh tokens for user", response_model=schema.LoginReturn, tags=["User"]
)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.session.query(models.User).filter(models.User.email == form_data.username)[0]
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    return {
        "access_token": create_access_token(user.email),
        "refresh_token": create_refresh_token(user.email),
    }
