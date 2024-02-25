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


@router.get("/area", response_model=schema.AreaReturn, tags=["Area"])
def get_areas(user: schema.User = Depends(get_current_user)):
    areas = db.session.query(models.Area).all()
    results = {"count": len(areas), "results": areas}
    return results


@router.post("/area", response_model=schema.Area, tags=["Area"])
def create_area(data: schema.AreaCreate, user: schema.User = Depends(get_current_user)):
    db_area = db.session.query(models.Area).filter(models.Area.name == data.name)
    if db_area.count() > 0:
        raise HTTPException(status_code=400, detail="Area already exists")
    db_location = db.session.query(models.Location).filter(models.Location.id == data.location_id)
    if db_location.count() != 1:
        raise HTTPException(status_code=400, detail="Location not found")

    area = models.Area(name=data.name, location_id=data.location_id)
    db.session.add(area)
    db.session.commit()
    return area


@router.patch("/area/{area_id}", response_model=schema.Area, tags=["Area"])
def update_area(area_id: UUID4, data: schema.AreaPatch, user: schema.User = Depends(get_current_user)):
    db_area = db.session.get(models.Area, area_id)
    if not db_area:
        raise HTTPException(status_code=404, detail="Area not found")
    for k, v in data.model_dump().items():
        setattr(db_area, k, v)
    db.session.add(db_area)
    db.session.commit()
    db.session.refresh(db_area)
    return db_area


@router.delete("/area/{area_id}", response_model=schema.ItemDelete, tags=["Area"])
def delete_area(area_id: UUID4, user: schema.User = Depends(get_current_user)):
    area = db.session.get(models.Area, area_id)
    if not area:
        raise HTTPException(status_code=404, detail="Area not found")
    db.session.delete(area)
    db.session.commit()
    return {"deleted": True, "id": area_id}


@router.get("/area/{area_id}", response_model=schema.Area, tags=["Area"])
def get_area(area_id: UUID4, user: schema.User = Depends(get_current_user)):
    area = db.session.get(models.Area, area_id)
    if not area:
        raise HTTPException(status_code=404, detail="Area not found")
    return area
