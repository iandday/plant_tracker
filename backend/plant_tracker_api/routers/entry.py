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


@router.get("/entry", response_model=schema.EntryReturn, tags=["Entry"])
def get_entries(user: schema.User = Depends(get_current_user)):
    entry = db.session.query(models.Entry).all()
    results = {"count": len(entry), "results": entry}
    return results


@router.post("/entry", response_model=schema.Entry, tags=["Entry"])
def create_entry(data: schema.EntryCreate, user: schema.User = Depends(get_current_user)):
    db_entry = db.session.query(models.Entry).filter(
        models.Entry.plant_id == data.plant_id, models.Entry.timestamp == data.timestamp
    )
    if db_entry.count() > 0:
        raise HTTPException(status_code=400, detail="entry already exists")
    entry = models.Entry(timestamp=data.timestamp, plant_id=data.plant_id, plant_health=data.plant_health)
    db.session.add(entry)

    if data.notes:
        entry.notes = data.notes

    for activity in data.activities:
        db_activity = db.session.get(models.Activity, activity)
        if not db_activity:
            raise HTTPException(status_code=404, detail="activity not found")
        entry.activities.append(db_activity)

    db.session.add(entry)
    db.session.commit()
    return entry


@router.patch("/entry/{entry_id}", response_model=schema.Entry, tags=["Entry"])
def update_entry(entry_id: UUID4, data: schema.EntryPatch, user: schema.User = Depends(get_current_user)):
    db_entry = db.session.get(models.Entry, entry_id)
    if not db_entry:
        raise HTTPException(status_code=404, detail="entry not found")
    for k, v in data.model_dump().items():
        setattr(db_entry, k, v)
    db.session.add(db_entry)
    db.session.commit()
    db.session.refresh(db_entry)
    return db_entry


@router.delete("/entry/{entry_id}", response_model=schema.ItemDelete, tags=["Entry"])
def delete_entry(entry_id: UUID4, user: schema.User = Depends(get_current_user)):
    entry = db.session.get(models.Entry, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="entry not found")
    db.session.delete(entry)
    db.session.commit()
    return {"deleted": True, "id": entry_id}


@router.get("/entry/{entry_id}", response_model=schema.Entry, tags=["Entry"])
def get_entry(entry_id: UUID4, user: schema.User = Depends(get_current_user)):
    entry = db.session.get(models.Entry, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="entry not found")
    return entry
