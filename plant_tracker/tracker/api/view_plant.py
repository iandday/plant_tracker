import csv
import logging
from typing import List

from django.shortcuts import get_object_or_404
from pydantic import UUID4
from tracker.api.schemas import (
    PlantIn,
    PlantOut,
    PlantPost,
    DeleteStatus,
    RegEnabledSchema,
)
from django.http import HttpRequest
from ninja import File, Form, Router
from django.contrib.auth import get_user_model
from tracker.models import Location, Plant
from ninja_jwt.authentication import JWTAuth
from ninja_extra import status
from ninja_extra.exceptions import APIException
from ninja.files import UploadedFile
from django.forms.models import model_to_dict

router = Router()

logger = logging.getLogger(__name__)


@router.get(
    "/plant",
    response=List[PlantOut],
    auth=JWTAuth(),
    tags=["Plant"],
    description="Plant",
)
def list_plants(request, exclude_graveyard: bool = True, graveyard_only: bool = False):
    user = get_user_model().objects.get(id=request.user.id)
    if exclude_graveyard and graveyard_only:
        raise APIException("Invalid parameters", code=status.HTTP_400_BAD_REQUEST)
    if exclude_graveyard:
        plants = Plant.objects.filter(user=user, graveyard=False)
    elif graveyard_only:
        plants = Plant.objects.filter(user=user, graveyard=True)
    return plants


@router.post(
    "/plant",
    response=PlantOut,
    auth=JWTAuth(),
    tags=["Plant"],
    description="Plant",
)
def create_plant(request, payload: Form[PlantIn], file: File[UploadedFile] = None):
    options = payload.dict(exclude_unset=True)
    options["user"] = get_user_model().objects.get(id=request.user.id)
    plant = Plant.objects.create(**options)

    if file:
        plant.main_photo.save(file.name, file)
    return plant


@router.get(
    "/{plant_id}",
    response=PlantOut,
    auth=JWTAuth(),
    tags=["Plant"],
    description="Plant",
)
def get_plant(request, plant_id: UUID4):
    user = get_user_model().objects.get(id=request.user.id)
    plant = Plant.objects.get(user=user, id=plant_id)
    return plant


@router.post(
    "/{plant_id}",
    response=PlantOut,
    auth=JWTAuth(),
    tags=["Plant"],
    description="Plant",
)
def post_plant(
    request, plant_id, payload: Form[PlantPost], file: File[UploadedFile]=None ):
    user = get_user_model().objects.get(id=request.user.id)
    plant = get_object_or_404(Plant, id=plant_id, user=user)
    for attr, value in payload.dict(exclude_unset=True).items():
        if attr == "user_id":
            new_user = get_user_model().objects.get(id=value)
            if user != new_user:
                plant.user = new_user
        else:
            setattr(plant, attr, value)
            
    if file:
        plant.main_photo.save(F'plant-{plant_id}.{file.name.split(".")[-1]}', file)
    plant.save() 
    return plant


@router.delete(
    "/{plant_id}",
    response=DeleteStatus,
    auth=JWTAuth(),
    tags=["Plant"],
    description="Plant",
)
def delete_plant(request, plant_id: UUID4):
    user = get_user_model().objects.get(id=request.user.id)
    queryset = Plant.objects.filter(id=plant_id)
    plant = get_object_or_404(queryset, user=user)
    plant.delete()
    return {"success": True}
