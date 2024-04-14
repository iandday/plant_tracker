import logging
from typing import List

from django.shortcuts import get_object_or_404
from pydantic import UUID4
from tracker.api.schemas import LocationIn, LocationOut, LocationPatch, DeleteStatus
from django.http import HttpRequest
from ninja import Router
from ninja_crud import views, viewsets
from django.contrib.auth import get_user_model
from tracker.models import Location
from ninja_jwt.authentication import JWTAuth

router = Router()

logger = logging.getLogger(__name__)


@router.get(
    "/location",
    response=List[LocationOut],
    auth=JWTAuth(),
    tags=["Location"],
    description="Location",
)
def list_locations(request):
    user = get_user_model().objects.get(id=request.user.id)
    locations = Location.objects.filter(user=user)
    return locations


@router.post(
    "/location",
    response=LocationOut,
    auth=JWTAuth(),
    tags=["Location"],
    description="Location",
)
def create_location(request, payload: LocationIn):
    options = payload.dict()
    options["user"] = get_user_model().objects.get(id=request.user.id)
    location = Location.objects.create(**options)
    return location


@router.get(
    "/{location_id}",
    response=LocationOut,
    auth=JWTAuth(),
    tags=["Location"],
    description="Location",
)
def get_location(request, location_id: UUID4):
    user = get_user_model().objects.get(id=request.user.id)
    location = Location.objects.filter(user=user, id=location_id)
    return location


@router.patch(
    "/{location_id}",
    response=LocationOut,
    operation_id="location_patch_location",
    auth=JWTAuth(),
    tags=["Location"],
    description="Location",
)
def patch_location(request, location_id: UUID4, payload: LocationPatch):
    user = get_user_model().objects.get(id=request.user.id)
    location = get_object_or_404(Location, id=location_id, user=user)
    for attr, value in payload.dict().items():
        if attr == "user_id":
            new_user = get_user_model().objects.get(id=value)
            location.user = new_user
        else:
            setattr(location, attr, value)
    location.save()
    return location


@router.delete(
    "/{location_id}",
    response=DeleteStatus,
    auth=JWTAuth(),
    tags=["Location"],
    description="Location",
)
def delete_location(request, location_id: UUID4):
    user = get_user_model().objects.get(id=request.user.id)
    location = get_object_or_404(Location, id=location_id, user=user)
    location.delete()
    return {"success": True}
