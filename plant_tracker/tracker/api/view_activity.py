import logging
from typing import List

from django.shortcuts import get_object_or_404
from pydantic import UUID4
from tracker.api.schemas import ActivityOut, DeleteStatus
from django.http import HttpRequest
from ninja import File, Form, Router
from ninja_crud import views, viewsets
from django.contrib.auth import get_user_model
from tracker.models import Location, Activity
from ninja_jwt.authentication import JWTAuth
from ninja_extra import status
from ninja_extra.exceptions import APIException
from ninja.files import UploadedFile
from django.forms.models import model_to_dict

router = Router()

logger = logging.getLogger(__name__)


@router.get(
    "/activity",
    response=List[ActivityOut],
    auth=JWTAuth(),
    tags=["Activity"],
    description="Activity",
)
def list_activities(request):
    entries = Activity.objects.all()
    return entries


# @router.post(
#     "/activity",
#     response=ActivityOut,
#     auth=JWTAuth(),
#     tags=["Activity"],
#     description="Activity",
# )
# def create_activity(request, payload: Form[ActivityIn], file: File[UploadedFile] = None):
#     options = payload.dict(exclude_unset=True)
#     options["user"] = get_user_model().objects.get(id=request.user.id)
#     activity = Activity.objects.create(**options)

#     if file:
#         activity.photo.save(file.name, file)
#     return activity


# @router.get(
#     "/{activity_id}",
#     response=ActivityOut,
#     auth=JWTAuth(),
#     tags=["Activity"],
#     description="Activity",
# )
# def get_activity(request, activity_id: UUID4):
#     user = get_user_model().objects.get(id=request.user.id)
#     activity = Activity.objects.get(user=user, id=activity_id)
#     return activity


# @router.post(
#     "/{activity_id}",
#     response=ActivityOut,
#     auth=JWTAuth(),
#     tags=["Activity"],
#     description="Activity",
# )
# def post_activity(
#     request, activity_id: UUID4, payload: Form[ActivityPost], file: File[UploadedFile] = None
# ):
#     user = get_user_model().objects.get(id=request.user.id)
#     activity = get_object_or_404(Activity, id=activity_id, user=user)
#     for attr, value in payload.dict(exclude_unset=True).items():
#         if attr == "user_id":
#             new_user = get_user_model().objects.get(id=value)
#             if user != new_user:
#                 activity.user = new_user
#         else:
#             setattr(activity, attr, value)
#     if file:
#         activity.main_photo.save(file.name, file)
#     activity.save()
#     return activity


# @router.delete(
#     "/{activity_id}",
#     response=DeleteStatus,
#     auth=JWTAuth(),
#     tags=["Activity"],
#     description="Activity",
# )
# def delete_activity(request, activity_id: UUID4):
#     user = get_user_model().objects.get(id=request.user.id)
#     queryset = Activity.objects.filter(id=activity_id)
#     activity = get_object_or_404(queryset, user=user)
#     activity.delete()
#     return {"success": True}
