import datetime
from fastapi import APIRouter, Depends, HTTPException, logger
from fastapi_sqlalchemy import db
from typing import List

import requests
from pydantic import UUID4, constr
import models
import schema
from dependencies import get_current_user, get_or_create
import os
import logging


api_key = os.environ["TREFLE_KEY"]

router = APIRouter()


@router.get("/plant", response_model=schema.PlantReturn, tags=["Plant"])
def get_plant(
    include_graveyard: bool = False, graveyard_only: bool = False, user: schema.User = Depends(get_current_user)
):
    if include_graveyard:
        plants = db.session.query(models.Plant).all()
    elif graveyard_only:
        plants = db.session.query(models.Plant).filter(models.Plant.graveyard == True)
    else:
        plants = db.session.query(models.Plant).filter(models.Plant.graveyard == False)
    output = []
    for plant in plants:
        p_output = plant.__dict__
        p_output["sources"] = db.session.query(models.Source).filter(models.Source.plants.any(plant.id == plant.id))
        p_output["entries"] = db.session.query(models.Entry).filter(models.Entry.plant_id == plant.id)
        output.append(p_output)

    results = {"count": len(output), "results": output}
    return results


@router.get("/plant/{plant_id}", response_model=schema.Plant, tags=["Plant"])
def get_plant_by_id(plant_id: UUID4, user: schema.User = Depends(get_current_user)):
    plant = db.session.get(models.Plant, plant_id)
    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")

    output = plant.__dict__

    entries = db.session.query(models.Entry).filter(models.Entry.plant_id == plant_id)
    sources = db.session.query(models.Source).filter(models.Source.plants.any(plant.id == plant_id))
    output["sources"] = sources
    output["entries"] = entries

    return output


@router.delete("/plant/{plant_id}", response_model=schema.ItemDelete, tags=["Plant"])
def delete_plant_by_id(plant_id: UUID4, user: schema.User = Depends(get_current_user)):
    plant = db.session.get(models.Plant, plant_id)
    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")
    db.session.delete(plant)
    db.session.commit()
    return {"deleted": True, id: plant_id}


@router.patch(
    "/plant/{plant_id}",
    response_model=schema.Plant,
    tags=["Plant"],
    description="Update Plant",
)
def update_plant(plant_id: UUID4, data: schema.PlantPatch, user: schema.User = Depends(get_current_user)):
    db_plant = db.session.get(models.Plant, plant_id)
    if not db_plant:
        raise HTTPException(status_code=404, detail="Plant not found")

    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(db_plant, k, v)
        if k == "graveyard" and bool(v) == True and not db_plant.death_date:
            setattr(db_plant, "death_date", datetime.datetime.now())
        if k == "sources":
            for source in v:
                db_source = db.session.get(models.Source, v)
                if not db_source:
                    raise HTTPException(status_code=404, detail=f"Source {source} not found")
                if db_source not in db_plant.sources:
                    db_plant.sources.append(db_source)

    db.session.add(db_plant)
    db.session.commit()
    db.session.refresh(db_plant)

    output = db_plant.__dict__
    entries = db.session.query(models.Entry).filter(models.Entry.plant_id == plant_id)
    sources = db.session.query(models.Source).filter(models.Source.plants.any(db_plant.id == plant_id))
    output["sources"] = sources
    output["entries"] = entries
    return output


@router.post("/plant", response_model=schema.Plant, tags=["Plant"])
def create_plant(data: schema.PlantCreate, user: schema.User = Depends(get_current_user)):
    db_plant = models.Plant(
        name=data.name,
        area=data.area,
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
def search_plant_trefle(data: schema.PlantSearchTrefle, user: schema.User = Depends(get_current_user)):
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

    db_area = db.session.get(models.Area, data.area)
    if not db_area:
        raise HTTPException(status_code=404, detail="Area not found")

    db_plant = models.Plant(
        name=data.name,
        area_id=db_area.id,
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

    for source in detail.get("sources", []):
        if source["url"] is not None:
            db_source, created = get_or_create(
                db.session,
                models.Source,
                **{"name": source["name"], "url": source["url"]},
            )
            db_plant.sources.append(db_source)

    db.session.commit()
    db.session.refresh(db_plant)
    output = db_plant.__dict__

    return output
