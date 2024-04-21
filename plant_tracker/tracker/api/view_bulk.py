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
    errors = []
    added = []
    csv_reader = csv.DictReader(StringIO(file.read().decode("utf-8-sig")))
    for row in csv_reader:

        try:
            area = Area.objects.get(name=row["area"])
            new_plant = Plant.objects.create(
                name=row["name"],
                common_name=row["common_name"],
                scientific_name=row["scientific_name"],
                purchase_date=datetime.datetime.strptime(
                    row["purchase_date"], "%Y%m%d"
                ),
                area=area,
                user=user,
            )
            added.append(new_plant)
        except Exception as e:
            errors.append(row["name"])
            logger.info(e)

    plants = Plant.objects.filter(user=user, graveyard=True)
    return {"created": added, "errors": errors}
