import csv
import datetime
from io import StringIO
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
    BulkPlantCreateResponse,
)
from django.http import HttpRequest
from ninja import File, Form, Router
from ninja_crud import views, viewsets
from django.contrib.auth import get_user_model
from tracker.models import Location, Plant, Area
from ninja_jwt.authentication import JWTAuth
from ninja_extra import status
from ninja_extra.exceptions import APIException
from ninja.files import UploadedFile
from django.forms.models import model_to_dict

router = Router()

logger = logging.getLogger(__name__)


@router.post(
    "/plant",
    response=BulkPlantCreateResponse,
    auth=JWTAuth(),
    tags=["Bulk"],
    description="Bulk",
)
def bulk_create_plant(request, file: UploadedFile = File(...)):
    user = get_user_model().objects.get(id=request.user.id)
    error_dict = {}
    added = []
    csv_reader = csv.DictReader(StringIO(file.read().decode("utf-8-sig")))
    for row in csv_reader:
        errors = []
        try:
            date = row["purchase_date"].replace("-", "").replace("/", "")

            try:
                location = Location.objects.get(name=row.get("location"), user=user)
            except Exception as e:
                location = Location.objects.create(name=row.get("location"), user=user)
                errors.append(str(e))
            try:
                area = Area.objects.get(
                    name=row.get("area"), location=location, user=user
                )
            except Exception as e:
                area = Area.objects.create(
                    name=row.get("area"), location=location, user=user
                )
                errors.append(str(e))

            new_plant = Plant.objects.create(
                name=row["name"],
                common_name=row.get("common_name", ""),
                scientific_name=row.get("scientific_name", ""),
                purchase_date=datetime.datetime.strptime(date, "%Y%m%d"),
                area=area,
                user=user,
            )
            added.append(new_plant)
        except Exception as e:
            errors.append(str(e))
        if errors:
            error_dict[row["name"]] = " | ".join(errors)
            logger.info(errors)

    plants = Plant.objects.filter(user=user, graveyard=True)
    return {"created": added, "errors": error_dict}
