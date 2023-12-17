from datetime import datetime
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import UUID4
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_sqlalchemy import db
from typing import List
from utils import create_access_token, create_refresh_token, get_hashed_password, verify_password
import models
import schema
from utils import ALGORITHM, JWT_REFRESH_SECRET_KEY
from fastapi_sqlalchemy import db
from jose import jwt
from pydantic import ValidationError


router = APIRouter()
