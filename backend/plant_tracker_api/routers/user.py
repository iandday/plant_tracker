from pydantic import UUID4
from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db
from typing import List
from deps import get_current_user
from utils import get_hashed_password
import models
import schema


router = APIRouter()
# https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/


@router.get("/user", summary="Get users", response_model=schema.UserReturn, tags=["User"])
async def get_users():
    users = db.session.query(models.User).all()
    results = {"count": len(users), "results": users}
    return results


@router.get("/user/me", summary="Get details of currently logged in user", response_model=schema.User, tags=["User"])
async def get_me(user: schema.User = Depends(get_current_user)):
    return user


@router.get("/user/{user_id}", response_model=schema.User, tags=["User"])
def get_user(user_id: UUID4):
    db_user = db.session.get(models.User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/user", summary="Create new user", response_model=schema.User, tags=["User"])
async def create_user(data: schema.UserCreate):
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
