from fastapi import APIRouter, HTTPException
from fastapi_sqlalchemy import db
from typing import List

from pydantic import UUID4
import models
import schema
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/location", response_model=schema.LocationReturn, tags=["Location"])
def get_locations():
    locations = db.session.query(models.Location).all()
    results = {"count": len(locations), "results": locations}
    return results


@router.post("/location", response_model=schema.Location, tags=["Location"])
def create_location(data: schema.LocationCreate):
    location = models.Location(name=data.name)
    db.session.add(location)
    db.session.commit()
    return location


@router.delete(
    "/location/{location_id}", response_model=schema.ItemDelete, tags=["Location"]
)
def delete_location(location_id: UUID4):
    location = db.session.get(models.Location, location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Plant not found")
    db.session.delete(location)
    db.session.commit()
    return {"deleted": True, "id": location_id}
