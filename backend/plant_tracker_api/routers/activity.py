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


@router.get("/activity", response_model=schema.ActivityReturn, tags=["Activity"])
def get_activitys(user: schema.User = Depends(get_current_user)):
    activity = db.session.query(models.Activity).all()
    results = {"count": len(activity), "results": activity}
    return results


@router.post("/activity", response_model=schema.Activity, tags=["Activity"])
def create_activity(data: schema.ActivityCreate, user: schema.User = Depends(get_current_user)):
    db_activity = db.session.query(models.Activity).filter(models.Activity.name == data.name)
    if db_activity.count() > 0:
        raise HTTPException(status_code=400, detail="Activity already exists")
    activity = models.Activity(name=data.name)
    db.session.add(activity)
    db.session.commit()
    return activity


@router.patch("/activity/{activity_id}", response_model=schema.Activity, tags=["Activity"])
def update_activity(activity_id: UUID4, data: schema.ActivityPatch, user: schema.User = Depends(get_current_user)):
    db_activity = db.session.get(models.Activity, activity_id)
    if not db_activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    for k, v in data.model_dump().items():
        setattr(db_activity, k, v)
    db.session.add(db_activity)
    db.session.commit()
    db.session.refresh(db_activity)
    return db_activity


@router.delete("/activity/{activity_id}", response_model=schema.ItemDelete, tags=["Activity"])
def delete_activity(activity_id: UUID4, user: schema.User = Depends(get_current_user)):
    activity = db.session.get(models.Activity, activity_id)
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    db.session.delete(activity)
    db.session.commit()
    return {"deleted": True, "id": activity_id}


@router.get("/activity/{activity_id}", response_model=schema.Activity, tags=["Activity"])
def get_activity(activity_id: UUID4, user: schema.User = Depends(get_current_user)):
    activity = db.session.get(models.Activity, activity_id)
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    return activity
