import logging
from typing import List

from django.shortcuts import get_object_or_404
from pydantic import UUID4
from tracker.api.schemas import EntryOut, EntryIn, DeleteStatus
from django.http import HttpRequest
from ninja import File, Form, Router
from ninja_crud import views, viewsets
from django.contrib.auth import get_user_model
from tracker.models import Activity, Location, Entry, Plant
from ninja_jwt.authentication import JWTAuth
from ninja_extra import status
from ninja_extra.exceptions import APIException
from ninja.files import UploadedFile
from django.forms.models import model_to_dict

router = Router()

logger = logging.getLogger(__name__)


@router.get(
    "/entry",
    response=List[EntryOut],
    auth=JWTAuth(),
    tags=["Entry"],
    description="Entry",
)
def list_entries(request):
    user = get_user_model().objects.get(id=request.user.id)
    entries = Entry.objects.filter(user=user)
    return entries


@router.post(
    "/entry",
    response=EntryOut,
    auth=JWTAuth(),
    tags=["Entry"],
    description="Entry",
)
def create_entry(request, payload: Form[EntryIn], file: File[UploadedFile] = None):
    options = payload.dict(exclude_unset=True)
    data = {"user": get_user_model().objects.get(id=request.user.id)}

    for option in options:
        logger.info(option)
        if option == "plant":
            data["plant"] = get_object_or_404(Plant, id=options["plant"])
        elif option == "activities":
            continue
        else:
            data[option] = options[option]
    entry = Entry.objects.create(**data)
    for act in options["activities"]:
        entry.activities.add(get_object_or_404(Activity, id=act))
    entry.save()

    if file:
        entry.photo.save(file.name, file)
    return entry


@router.get(
    "/plant/{plant_id}",
    response=List[EntryOut],
    auth=JWTAuth(),
    tags=["Entry"],
    description="Entry",
)
def get_plant_entries(request, plant_id: UUID4):
    user = get_user_model().objects.get(id=request.user.id)
    entry = Entry.objects.filter(user=user, plant_id=plant_id)
    return entry


@router.get(
    "/{entry_id}",
    response=EntryOut,
    auth=JWTAuth(),
    tags=["Entry"],
    description="Entry",
)
def get_entry(request, entry_id: UUID4):
    queryset = Entry.objects.filter(id=entry_id)
    entry = get_object_or_404(
        queryset, user=get_user_model().objects.get(id=request.user.id)
    )
    return entry


# @router.post(
#     "/{entry_id}",
#     response=EntryOut,
#     auth=JWTAuth(),
#     tags=["Entry"],
#     description="Entry",
# )
# def post_entry(
#     request, entry_id: UUID4, payload: Form[EntryPost], file: File[UploadedFile] = None
# ):
#     user = get_user_model().objects.get(id=request.user.id)
#     entry = get_object_or_404(Entry, id=entry_id, user=user)
#     for attr, value in payload.dict(exclude_unset=True).items():
#         if attr == "user_id":
#             new_user = get_user_model().objects.get(id=value)
#             if user != new_user:
#                 entry.user = new_user
#         else:
#             setattr(entry, attr, value)
#     if file:
#         entry.main_photo.save(file.name, file)
#     entry.save()
#     return entry


@router.delete(
    "/{entry_id}",
    response=DeleteStatus,
    auth=JWTAuth(),
    tags=["Entry"],
    description="Entry",
)
def delete_entry(request, entry_id: UUID4):
    user = get_user_model().objects.get(id=request.user.id)
    queryset = Entry.objects.filter(id=entry_id)
    entry = get_object_or_404(queryset, user=user)
    entry.delete()
    return {"success": True}
