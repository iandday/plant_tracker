from datetime import datetime
import os
from typing import List

import models
import schema
from dependencies import get_current_user
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_sqlalchemy import db
from jose import jwt
from pydantic import UUID4, ValidationError
from utils import (
    ALGORITHM,
    JWT_REFRESH_SECRET_KEY,
    create_access_token,
    create_refresh_token,
    get_hashed_password,
    verify_password,
)

router = APIRouter()


# @router.get("/user", summary="Get users", response_model=schema.UserReturn, tags=["User"])
# async def get_users():
#     users = db.session.query(models.User).all()
#     results = {"count": len(users), "results": users}
#     return results


@router.get("/user/me", summary="Get details of currently logged in user", response_model=schema.User, tags=["User"])
async def get_me(user: schema.User = Depends(get_current_user)):
    return user


@router.post(
    "/user/me", summary="Update details of currently logged in user", response_model=schema.User, tags=["User"]
)
async def update_me(data: schema.UserUpdate, user: schema.User = Depends(get_current_user)):
    db_user = db.session.get(models.User, user.id)

    user_data = data.model_dump(exclude_unset=True)
    for key, value in user_data.items():
        if key == "password":
            value = get_hashed_password(value)
        setattr(db_user, key, value)

    db.session.add(db_user)
    db.session.commit()

    return user


# @router.get("/user/{user_id}", response_model=schema.User, tags=["User"])
# def get_user(user_id: UUID4):
#     db_user = db.session.get(models.User, user_id)
#     if not db_user:
#         raise HTTPException(status_code=404, detail="User not found")
#     return db_user


@router.post("/user", summary="Create new user", response_model=schema.User, tags=["User"])
async def create_user(data: schema.UserCreate):
    if os.getenv("ENABLE_REGISTRATION", "False").lower() in ("true", "1", "t"):
        db_user = db.session.query(models.Location).filter(models.User.email == data.email)
        if db_user.count() > 0:
            raise HTTPException(status_code=400, detail="User with this email already exist")
        user = models.User(
            email=data.email,
            first_name=data.first_name,
            last_name=data.last_name,
            disabled=data.disabled,
            hashed_password=get_hashed_password(data.password),
        )
        db.session.add(user)
        db.session.commit()
        return user
    else:
        raise HTTPException(status_code=400, detail="User registration disabled")


@router.post(
    "/user/login", summary="Create access and refresh tokens for user", response_model=schema.LoginReturn, tags=["User"]
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


@router.post(
    "/user/renew",
    summary="Creates new access and refresh token for user based on refresh token",
    response_model=schema.LoginReturn,
    tags=["User"],
)
async def refresh_tokens(data: schema.LoginRefresh) -> schema.LoginReturn:
    try:
        payload = jwt.decode(data.refresh_token, JWT_REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        token_data = schema.TokenPayload(**payload)

        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token_data.sub

    return {
        "access_token": create_access_token(token_data.sub),
        "refresh_token": create_refresh_token(token_data.sub),
    }
