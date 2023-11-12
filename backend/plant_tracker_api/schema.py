import datetime
from typing import List, Optional
from pydantic import BaseModel, UUID4
from datetime import date
from sqlalchemy import Date


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


class PlantBase(BaseModel):
    name: str
    photo_url: Optional[str]
    location: Location
    common_name: str
    scientific_name: str
    photo_url: str = None


class PlantCreate(PlantBase):
    sources: List[SourceCreate] = None
    purchase_year: int = None
    purchase_month: int = None
    purchase_day: int = None


class Plant(PlantBase):
    purchase_date: Optional[datetime.date]
    sources: Optional[List[Source]]
    trefle_id: Optional[int]
    id: UUID4


class PlantPatch(PlantBase):
    purchase_date: Optional[datetime.date]
    trefle_id: Optional[int]
    id: UUID4


class PlantReturn(BaseModel):
    count: int
    results: List[Plant]


class PlantCreateTrefle(BaseModel):
    id: int
    name: str
    location: Location
    purchase_year: int = None
    purchase_month: int = None
    purchase_day: int = None


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
