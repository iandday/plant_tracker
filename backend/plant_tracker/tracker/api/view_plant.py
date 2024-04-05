import logging
from typing import List

from django.shortcuts import get_object_or_404
from pydantic import UUID4
from tracker.api.schemas import PlantIn, PlantOut, PlantPatch, DeleteStatus
from django.http import HttpRequest
from ninja import Router
from ninja_crud import views, viewsets
from django.contrib.auth import get_user_model
from tracker.models import Location, Plant
from ninja_jwt.authentication import JWTAuth
from ninja_extra import status
from ninja_extra.exceptions import APIException

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
def create_plant(request, payload: PlantIn):
    options = payload.dict()
    options["user"] = get_user_model().objects.get(id=request.user.id)
    options["graveyard"] = False
    plant = Plant.objects.create(**options)
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
    logger.info(f"{plant.id}")
    return plant


@router.patch(
    "/{plant_id}",
    response=PlantOut,
    # operation_id="plant_patch_plant",
    auth=JWTAuth(),
    tags=["Plant"],
    description="Plant",
)
def patch_plant(request, plant_id: UUID4, payload: PlantPatch):
    user = get_user_model().objects.get(id=request.user.id)
    plant = get_object_or_404(Plant, id=plant_id, user=user)
    for attr, value in payload.dict().items():
        if attr == "user_id":
            new_user = get_user_model().objects.get(id=value)
            plant.user = new_user
        else:
            setattr(plant, attr, value)
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
    plant = get_object_or_404(Plant, id=plant_id, user=user)
    plant.delete()
    return {"success": True}
