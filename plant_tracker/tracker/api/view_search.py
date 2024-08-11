
import csv
import logging
from typing import List
from ninja.errors import HttpError
from django.shortcuts import get_object_or_404
from pydantic import UUID4
from tracker.api.schemas import (
    EntryOut,
    PlantIn,
    PlantOut,
    PlantPost,
    DeleteStatus,
    PlantSearch,
    RegEnabledSchema,
)
from django.db.models import Q
from django.http import HttpRequest, HttpResponse
from ninja import File, Form, Router
from django.contrib.auth import get_user_model
from tracker.models import Area, Entry, Location, Plant
from ninja_jwt.authentication import JWTAuth
from ninja_extra import status
from ninja_extra.exceptions import APIException
from ninja.files import UploadedFile
from django.forms.models import model_to_dict
from django.contrib.postgres.search import SearchVector

router = Router()

logger = logging.getLogger(__name__)



@router.get(
    "/plant",
    response=List[PlantOut],
    auth=JWTAuth(),
    tags=["Plant", "Search"],
    description="Search plant records",
)
def search_plant(request: HttpRequest, response: HttpResponse, query: str = None, graveyard_only: bool = False, alive_only = False, ):
    user = get_user_model().objects.get(id=request.user.id)


    if graveyard_only and alive_only:
        raise HttpError(404, "Improper parameters specified")
    else:
        # formulate filter
        data_query = {'user': user}
        if query:
            data_query['search_vector__contains'] = query    
        if graveyard_only:
            data_query['graveyard'] = True
        if alive_only:
            data_query['graveyard'] = False
        
        results = Plant.objects.filter(**data_query)
        response['X-SearchResultCount'] = len(results)

        return results
    
@router.get(
    "/entry",
    response=List[EntryOut],
    auth=JWTAuth(),
    tags=["Entry", "Search"],
    description="Search entry records",
)
def search_entry(request: HttpRequest, response: HttpResponse, query: str = None, graveyard_only: bool = False, alive_only = False, ):
    user = get_user_model().objects.get(id=request.user.id)


    if graveyard_only and alive_only:
        raise HttpError(404, "Improper parameters specified")
    else:      
        data_query = {'user': user}
        if graveyard_only:
             data_query['graveyard'] = True
        if alive_only:
             data_query['graveyard'] = False
        
        results = Entry.objects.filter(**data_query)
        if query:
            results = Entry.objects.filter(
                Q(search_vector__icontains=query) |
                Q(plant__name__icontains=query) |
                Q(activities__name=query)
            ).distinct()

            
        
        response['X-SearchResultCount'] = len(results)

        return results


    
   