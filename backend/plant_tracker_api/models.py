import uuid
from pydantic import validator
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import UUID, Boolean, Column, DateTime, ForeignKey, Integer, String, Date, Table, UniqueConstraint

Base = declarative_base()


class Source(Base):
    __tablename__ = "source"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    url = Column(String)
    plants = relationship("Plant", secondary="plant_source", back_populates="sources")


plant_source = Table(
    "plant_source",
    Base.metadata,
    Column("plant_id", ForeignKey("plant.id"), primary_key=True),
    Column("source_id", ForeignKey("source.id"), primary_key=True),
)


class Location(Base):
    __tablename__ = "location"
    __table_args__ = (UniqueConstraint("name"),)
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)


class Area(Base):
    __tablename__ = "area"
    __table_args__ = (UniqueConstraint("name"),)
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    location_id = Column("location_id", UUID, ForeignKey("location.id"), nullable=False)


class Activity(Base):
    __tablename__ = "activity"
    __table_args__ = (UniqueConstraint("name"),)
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    entries = relationship("Entry", secondary="entry_activity", back_populates="activities")


entry_activity = Table(
    "entry_activity",
    Base.metadata,
    Column("activity_id", ForeignKey("activity.id"), primary_key=True),
    Column("entry_id", ForeignKey("entry.id"), primary_key=True),
)


class Entry(Base):
    __tablename__ = "entry"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    timestamp = Column(DateTime, nullable=False)
    activities = relationship("Activity", secondary="entry_activity", back_populates="entries")
    plant_id = Column("plant_id", UUID, ForeignKey("plant.id"), nullable=False)
    notes = Column(String, nullable=True)
    plant_health = Column(Integer)

    @validator("plant_health")
    def clean_space(cls, value, values):
        if values.get("plant_health") < 0 or values.get("plant_health") > 5:
            raise ValueError("plant_health must be from 1-5")


# entry_plant = Table(
#     "entry_plant",
#     Base.metadata,
#     Column("plant_id", ForeignKey("plant.id"), primary_key=True),
#     Column("entry_id", ForeignKey("entry.id"), primary_key=True),
# )


class User(Base):
    __tablename__ = "user"
    __table_args__ = (UniqueConstraint("email"),)
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String)
    hashed_password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    disabled = Column(Boolean)


class Plant(Base):
    __tablename__ = "plant"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    trefle_id = Column(Integer)
    purchase_date = Column(Date, nullable=True)
    name = Column(String, nullable=False, unique=True)
    photo_url = Column(String, nullable=True, unique=False)
    common_name = Column(String)
    scientific_name = Column(String)
    graveyard = Column(Boolean, default=False)
    death_date = Column(Date, nullable=True)
    user_id = Column("user_id", UUID, ForeignKey("user.id"), nullable=False)
    area_id = Column("area_id", UUID, ForeignKey("area.id"), nullable=False)
    sources = relationship(
        "Source",
        secondary="plant_source",
        back_populates="plants",
    )
    # entries = relationship(
    #     "Entry",
    #     secondary="entry_plant",
    #     back_populates="plants",
    # )
