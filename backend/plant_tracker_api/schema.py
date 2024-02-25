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


class ActivityBase(BaseModel):
    name: str


class ActivityCreate(ActivityBase):
    pass


class Activity(ActivityBase):
    id: UUID4


class ActivityReturn(BaseModel):
    count: int
    results: List[Activity]


class ActivityPatch(ActivityBase):
    pass


class EntryBase(BaseModel):
    timestamp: datetime.datetime
    activities: List[UUID4]
    plant_id: UUID4
    notes: Optional[str]
    plant_health: int


class EntryCreate(EntryBase):
    pass


class Entry(BaseModel):
    id: UUID4
    activities: List[Activity]
    plant_id: UUID4
    notes: Optional[str]
    plant_health: int
    timestamp: datetime.datetime


class EntryPatch(EntryBase):
    pass


class EntryReturn(BaseModel):
    count: int
    results: List[Entry]


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
    purchase_date: Optional[datetime.date]
    sources: Optional[List[Source]] = None
    trefle_id: Optional[int]
    id: UUID4
    user_id: UUID4
    entries: List[Entry] = None
    graveyard: Optional[bool]
    death_date: Optional[datetime.date]


class PlantPatch(BaseModel):
    # __annotations__ = {k: Optional[v] for k, v in Plant.__annotations__.items()}
    purchase_date: Optional[datetime.date]
    # sources: Optional[List[Source]]
    trefle_id: Optional[int]
    user_id: Optional[UUID4]
    graveyard: Optional[bool]
    death_date: Optional[datetime.date]
    name: Optional[str]
    photo_url: Optional[str]
    location_id: Optional[UUID4]
    common_name: Optional[str]
    scientific_name: Optional[str]
    photo_url: str = Optional[None]


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
