from fastapi import APIRouter
from fastapi_sqlalchemy import db
from typing import List
import models
import schema


router = APIRouter()


@router.get("/location", response_model=List[schema.Location], tags=["Location"])
def get_locations():
    locations = db.session.query(models.Location).all()
    return locations


@router.post("/location", response_model=schema.Location, tags=["Location"])
def create_location(data: schema.LocationCreate):
    location = models.Location(name=data.name)
    db.session.add(location)
    db.session.commit()
    return location
