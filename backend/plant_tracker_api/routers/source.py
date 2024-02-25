from fastapi import APIRouter, Depends
from fastapi_sqlalchemy import db
from typing import List
from dependencies import get_current_user
import models
import schema


router = APIRouter()


@router.get("/source", response_model=List[schema.Source], tags=["Source"])
def get_sources(user: schema.User = Depends(get_current_user)):
    sources = db.session.query(models.Source).all()
    return sources


@router.post("/source", response_model=schema.Source, tags=["Source"])
def create_source(data: schema.SourceCreate, user: schema.User = Depends(get_current_user)):
    source = models.Source(name=data.name, url=data.url)
    db.session.add(source)
    db.session.commit()
    return source
