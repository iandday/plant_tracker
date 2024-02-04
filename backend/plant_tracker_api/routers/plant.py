import datetime
from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db
from typing import List

import requests
from pydantic import UUID4, constr
import models
import schema
from dependencies import get_current_user, get_or_create
import os
import logging

logger = logging.getLogger(__name__)

api_key = os.environ["TREFLE_KEY"]

router = APIRouter()


@router.get("/plant", response_model=schema.PlantReturn, tags=["Plant"])
def get_plant():
    plants = db.session.query(models.Plant).all()
    results = {"count": len(plants), "results": plants}
    return results


@router.get("/plant/{plant_id}", response_model=schema.Plant, tags=["Plant"])
def get_plant_by_id(plant_id: UUID4):
    plant = db.session.get(models.Plant, plant_id)
    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")
    return plant


@router.delete("/plant/{plant_id}", response_model=schema.ItemDelete, tags=["Plant"])
def delete_plant_by_id(plant_id: UUID4):
    plant = db.session.get(models.Plant, plant_id)
    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")
    db.session.delete(plant)
    db.session.commit()
    return {"deleted": True, id: plant_id}


@router.patch(
    "/plant",
    response_model=schema.Plant,
    tags=["Plant"],
    description="Update Plant by ID",
)
def update_plant(data: schema.PlantPatch):
    db_plant = db.session.get(models.Plant, data.id)
    if not db_plant:
        raise HTTPException(status_code=404, detail="Plant not found")
    for k, v in data.model_dump().items():
        setattr(db_plant, k, v)
    db.session.add(db_plant)
    db.session.commit()
    db.session.refresh(db_plant)
    return db_plant


@router.post("/plant", response_model=schema.Plant, tags=["Plant"])
def create_plant(data: schema.PlantCreate):
    db_plant = models.Plant(
        name=data.name,
        location=data.location,
        photo_url=data.photo_url,
        common_name=data.common_name,
        scientific_name=data.scientific_name,
    )
    db.session.add(db_plant)

    if data.purchase_day and data.purchase_month and data.purchase_year:
        db_plant.purchase_date = datetime.date(data.purchase_year, data.purchase_month, data.purchase_day)

    if data.sources:
        for source in data.sources:
            print(source)
            db_source, created = get_or_create(
                db.session,
                models.Source,
                **{"name": source.name, "url": source.url},
            )
            db_plant.sources.append(db_source)

    db.session.commit()
    db.session.refresh(db_plant)
    return db_plant


@router.post(
    "/plant/trefle/search",
    response_model=List[schema.PlantSearchResultsTrefle],
    description="Search for plant data from Trefle",
    tags=["Trefle"],
)
def search_plant_trefle(data: schema.PlantSearchTrefle):
    search_details = requests.get(
        f"https://trefle.io/api/v1/plants/search/",
        params={"token": api_key, "q": data.query},
    )

    results = []
    for result in search_details.json()["data"]:
        current_result = {
            "id": result["id"],
            "common_name": result.get("common_name", None),
            "scientific_name": result["scientific_name"],
        }
        current_result["photo_url"] = result.get("image_url", None)
        results.append(current_result)
    return results


@router.post(
    "/plant/trefle/create",
    response_model=schema.Plant,
    description="Create a plant entry using data from Trefle",
    tags=["Trefle"],
)
def create_plant_trefle(data: schema.PlantCreateTrefle, user: schema.User = Depends(get_current_user)):
    plant_detail = requests.get(f"https://trefle.io/api/v1/plants/{data.id}?token={api_key}")
    detail = plant_detail.json()["data"]

    db_location = db.session.get(models.Location, data.location)
    if not db_location:
        raise HTTPException(status_code=404, detail="Location not found")

    db_plant = models.Plant(
        name=data.name,
        location_id=db_location.id,
        photo_url=detail["image_url"],
        common_name=detail["common_name"],
        scientific_name=detail["scientific_name"],
        trefle_id=detail["main_species_id"],
        user_id=user.id,
        # user=user,
    )
    db.session.add(db_plant)

    if data.purchase_date:
        db_plant.purchase_date = data.purchase_date

    for source in detail["sources"]:
        if source["url"] is not None:
            db_source, created = get_or_create(
                db.session,
                models.Source,
                **{"name": source["name"], "url": source["url"]},
            )
            db_plant.sources.append(db_source)

    db.session.commit()
    db.session.refresh(db_plant)
    return db_plant
