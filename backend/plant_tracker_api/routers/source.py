from fastapi import APIRouter
from fastapi_sqlalchemy import db
from typing import List
import models
import schema


router = APIRouter()


@router.get("/source", response_model=List[schema.Source], tags=["Source"])
def get_sources():
    sources = db.session.query(models.Source).all()
    return sources


@router.post("/source", response_model=schema.Source, tags=["Source"])
def create_source(data: schema.SourceCreate):
    source = models.Source(name=data.name, url=data.url)
    db.session.add(source)
    db.session.commit()
    return source
