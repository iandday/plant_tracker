import datetime
from typing import List, Optional
from fastapi import Query
from pydantic import BaseModel, UUID4, constr
from datetime import date
from sqlalchemy import Date
from uuid import UUID


class SourceBase(BaseModel):
    name: str
    url: str


class SourceCreate(SourceBase):
    pass


class Source(SourceBase):
    id: UUID4


class LocationBase(BaseModel):
    name: str


class LocationCreate(LocationBase):
    pass


class Location(LocationBase):
    id: UUID4


class LocationReturn(BaseModel):
    count: int
    results: List[Location]


class LocationPatch(LocationBase):
    pass


class PlantBase(BaseModel):
    name: str
    photo_url: Optional[str]
    location_id: UUID4
    common_name: str
    scientific_name: str
    photo_url: str = None


class PlantCreate(PlantBase):
    sources: List[SourceCreate] = None
    purchase_date: datetime.date = None
    location_id: UUID4


class Plant(PlantBase):
    purchase_date: datetime.date = None
    sources: Optional[List[Source]]
    trefle_id: Optional[int]
    id: UUID4
    user_id: UUID4


class PlantPatch(PlantBase):
    purchase_date: datetime.date = None
    trefle_id: Optional[int]
    id: UUID4


class PlantReturn(BaseModel):
    count: int
    results: List[Plant]


class PlantCreateTrefle(BaseModel):
    id: int
    name: str
    location: UUID4
    purchase_date: datetime.date = None


class PlantSearchResultsTrefle(BaseModel):
    id: int
    common_name: Optional[str]
    scientific_name: str
    photo_url: Optional[str]


class PlantSearchTrefle(BaseModel):
    query: str


class ItemDelete(BaseModel):
    deleted: bool
    id: UUID4


class UserCreate(BaseModel):
    email: str
    password: str
    first_name: str | None = None
    last_name: str | None = None
    disabled: bool | None = None


class UserUpdate(BaseModel):
    email: str | None = None
    password: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    disabled: bool | None = None


class User(BaseModel):
    id: UUID4
    email: str
    first_name: str | None = None
    last_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str


class UserReturn(BaseModel):
    count: int
    results: List[User]


class LoginReturn(BaseModel):
    access_token: str
    refresh_token: str


class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None


class UserOut(BaseModel):
    id: UUID
    email: str


class SystemUser(UserOut):
    password: str


class LoginRefresh(BaseModel):
    refresh_token: str
