from ninja_extra import NinjaExtraAPI
from http import HTTPStatus
from django.core.exceptions import (
    FieldError,
    ObjectDoesNotExist,
    PermissionDenied,
    ValidationError,
)

from ninja.errors import ValidationError as NinjaValidationError
from tracker.api.view_location import router as location_router
from tracker.api.view_area import router as area_router
from tracker.api.view_user import router as user_router
from tracker.api.view_plant import router as plant_router
from tracker.api.view_entry import router as entry_router
from tracker.api.view_activity import router as activity_router
from tracker.api.view_bulk import router as bulk_router
from tracker.api.view_search import router as search_router

api = NinjaExtraAPI(
    title="Plant Tracker API",
    description="API for interacting with the Plant Tracker application",
    urls_namespace="api",
)

api.add_router("/location/", location_router)
api.add_router("/area/", area_router)
api.add_router("/user/", user_router)
api.add_router("/plant/", plant_router)
api.add_router("/entry/", entry_router)
api.add_router("/activity/", activity_router)
api.add_router("/bulk/", bulk_router)
api.add_router("/search/", search_router)


@api.exception_handler(ObjectDoesNotExist)
def handle_object_does_not_exist(request, exc):
    return api.create_response(
        request,
        {"message": "ObjectDoesNotExist", "detail": str(exc)},
        status=HTTPStatus.NOT_FOUND,
    )


@api.exception_handler(PermissionDenied)
def handle_permission_error(request, exc: PermissionDenied):
    return api.create_response(
        request,
        {
            "message": "PermissionDenied",
            "detail": "You don't have the permission to access this resource.",
        },
        status=HTTPStatus.FORBIDDEN,
    )


@api.exception_handler(NinjaValidationError)
def handle_ninja_validation_error(request, exc: NinjaValidationError):
    mapped_msg = {error["loc"][-1]: error["msg"] for error in exc.errors}
    return api.create_response(
        request,
        data={"message": "NinjaValidationError", "detail": mapped_msg},
        status=HTTPStatus.BAD_REQUEST,
    )


@api.exception_handler(ValidationError)
def handle_validation_error(request, exc: ValidationError):
    status = HTTPStatus.BAD_REQUEST
    for field, errors in exc.error_dict.items():
        for error in errors:
            if error.code in ["unique", "unique_together"]:
                status = HTTPStatus.CONFLICT
    return api.create_response(
        request,
        data={"message": "ValidationError", "detail": exc.message_dict},
        status=status,
    )


@api.exception_handler(FieldError)
def handle_field_error(request, exc: FieldError):
    return api.create_response(
        request,
        data={"message": "FieldError", "detail": str(exc)},
        status=HTTPStatus.BAD_REQUEST,
    )
