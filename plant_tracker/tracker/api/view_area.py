import logging
from typing import List

from django.shortcuts import get_object_or_404
from pydantic import UUID4
from tracker.api.schemas import AreaIn, AreaOut, AreaPatch, DeleteStatus
from django.http import HttpRequest
from ninja import Router
from ninja_crud import views, viewsets
from django.contrib.auth import get_user_model
from tracker.models import Area, Location
from ninja_jwt.authentication import JWTAuth

router = Router()

logger = logging.getLogger(__name__)


@router.get(
    "/area",
    response=List[AreaOut],
    auth=JWTAuth(),
    tags=["Area"],
    description="Arean",
)
def list_areas(request):
    user = get_user_model().objects.get(id=request.user.id)
    areas = Area.objects.filter(user=user)
    return areas


@router.post(
    "/area",
    response=AreaOut,
    auth=JWTAuth(),
    tags=["Area"],
    description="Area",
)
def create_area(request, payload: AreaIn):
    options = payload.dict()
    options["user"] = get_user_model().objects.get(id=request.user.id)
    area = Area.objects.create(**options)
    return area


@router.get(
    "/{area_id}",
    response=AreaOut,
    auth=JWTAuth(),
    tags=["Area"],
    description="Area",
)
def get_area(request, area_id: UUID4):
    user = get_user_model().objects.get(id=request.user.id)
    area = Area.objects.get(user=user, id=area_id)
    return area


@router.patch(
    "/{area_id}",
    response=AreaOut,
    operation_id="area_patch_area",
    auth=JWTAuth(),
    tags=["Area"],
    description="Area",
)
def patch_area(request, area_id: UUID4, payload: AreaPatch):
    user = get_user_model().objects.get(id=request.user.id)
    area = get_object_or_404(Area, id=area_id, user=user)
    for attr, value in payload.dict().items():
        if attr == "user_id":
            new_user = get_user_model().objects.get(id=value)
            area.user = new_user
        else:
            setattr(area, attr, value)
    area.save()
    return area


@router.delete(
    "/{area_id}",
    response=DeleteStatus,
    auth=JWTAuth(),
    tags=["Area"],
    description="Area",
)
def delete_area(request, area_id: UUID4):
    user = get_user_model().objects.get(id=request.user.id)
    area = get_object_or_404(Area, id=area_id, user=user)
    area.delete()
    return {"success": True}
