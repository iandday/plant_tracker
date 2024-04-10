from datetime import datetime, date
from typing import Optional
from uuid import uuid4
from ninja import ModelSchema, Schema, File
from pydantic import UUID4, validator
from ninja_jwt.schema import TokenObtainPairInputSchema, TokenRefreshInputSchema
from tracker.models import Plant
from django.contrib.auth import get_user_model
from typing import Annotated, TypeVar
from pydantic import WrapValidator
from pydantic_core import PydanticUseDefault


def _empty_str_to_default(v, handler, info):
    if isinstance(v, str) and v == "":
        raise PydanticUseDefault
    return handler(v)


T = TypeVar("T")
EmptyStrToDefault = Annotated[T, WrapValidator(_empty_str_to_default)]


class DeleteStatus(Schema):
    success: bool


### Start User
class UserSchema(ModelSchema):
    class Meta:
        model = get_user_model()
        fields = ["email", "id"]


class TokenObtainPairOut(Schema):
    access: str
    refresh: str
    user: UserSchema


class TokenObtainPair(TokenObtainPairInputSchema):
    def output_schema(self):
        out_dict = self.get_response_schema_init_kwargs()
        out_dict.update(user=UserSchema.from_orm(self._user))
        return TokenObtainPairOut(**out_dict)


class TokenRefreshPair(TokenRefreshInputSchema):
    def output_schema(self):
        out_dict = self.get_response_schema_init_kwargs()
        out_dict.update(user=UserSchema.from_orm(self._user))
        return TokenObtainPairOut(**out_dict)


class RegisterIn(Schema):

    email: str
    password: str
    password_verify: str


class RegisterOut(UserSchema):
    pass


### End user


class LocationIn(Schema):
    name: str


class LocationOut(Schema):
    name: str
    id: UUID4
    user: UserSchema


class LocationPatch(Schema):
    name: str


class AreaIn(Schema):
    name: str
    location_id: UUID4


class AreaOut(Schema):
    name: str
    id: UUID4
    location: LocationOut
    user: UserSchema


class AreaPatch(Schema):
    name: str
    location_id: UUID4


class PlantIn(ModelSchema):
    class Meta:
        model = Plant
        fields = [
            "name",
            "common_name",
            "scientific_name",
            "purchase_date",
            "graveyard",
            "death_date",
        ]
        fields_optional = [
            "common_name",
            "scientific_name",
            "purchase_date",
            "graveyard",
            "death_date",
        ]

    # name: str
    area_id: UUID4
    # common_name: Optional[str] = None
    # scientific_name: Optional[str] = None
    purchase_date: EmptyStrToDefault[date] = None
    graveyard: EmptyStrToDefault[bool] = False
    death_date: EmptyStrToDefault[date] = None


class PlantPost(ModelSchema):
    class Meta:
        model = Plant
        fields = [
            "name",
            "common_name",
            "scientific_name",
            "purchase_date",
            "graveyard",
            "death_date",
        ]
        fields_optional = "__all__"  # [
        #     "common_name",
        #     "scientific_name",
        #     "purchase_date",
        #     "graveyard",
        #     "death_date",
        #     "name",
        # ]

    # name: str
    area_id: UUID4 = None
    # common_name: Optional[str] = None
    # scientific_name: Optional[str] = None
    purchase_date: EmptyStrToDefault[date] = None
    graveyard: EmptyStrToDefault[bool] = False
    death_date: EmptyStrToDefault[date] = None


class PlantOut(ModelSchema):
    class Meta:
        model = Plant
        fields = "__all__"

    # id: UUID4
    # main_photo_url: str = None


class MeOut(Schema):
    name: str


# class UserRetrieveSchema(ModelSchema):
#     groups: List[GroupSchema]

#     class Config:
#         model = UserModel
#         include = ("email", "first_name", "last_name", "username", "id", "is_active")


class UserTokenOutSchema(Schema):
    token: str
    user: UserSchema
    token_exp_date: Optional[datetime]
