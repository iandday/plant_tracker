from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db
from typing import List
from sqlalchemy import select
from pydantic import UUID4
from dependencies import get_current_user
import models
import schema
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/location", response_model=schema.LocationReturn, tags=["Location"])
def get_locations(user: schema.User = Depends(get_current_user)):
    locations = db.session.query(models.Location).all()
    results = {"count": len(locations), "results": locations}
    return results


@router.post("/location", response_model=schema.Location, tags=["Location"])
def create_location(data: schema.LocationCreate):
    db_location = db.session.query(models.Location).filter(models.Location.name == data.name)
    if db_location.count() > 0:
        raise HTTPException(status_code=400, detail="Location already exists")
    location = models.Location(name=data.name)
    db.session.add(location)
    db.session.commit()
    return location


@router.patch("/location", response_model=schema.Location, tags=["Location"])
def update_location(data: schema.LocationPatch):
    db_location = db.session.get(models.Location, data.id)
    if not db_location:
        raise HTTPException(status_code=404, detail="Location not found")
    for k, v in data.model_dump().items():
        setattr(db_location, k, v)
    db.session.add(db_location)
    db.session.commit()
    db.session.refresh(db_location)
    return db_location


@router.delete("/location/{location_id}", response_model=schema.ItemDelete, tags=["Location"])
def delete_location(location_id: UUID4):
    location = db.session.get(models.Location, location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Plant not found")
    db.session.delete(location)
    db.session.commit()
    return {"deleted": True, "id": location_id}
