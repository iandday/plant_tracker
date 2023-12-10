import uuid
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import UUID, Boolean, Column, ForeignKey, Integer, String, Date, Table, UniqueConstraint

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
    plants = relationship("Plant", secondary="plant_location", back_populates="location")


plant_location = Table(
    "plant_location",
    Base.metadata,
    Column("plant_id", ForeignKey("plant.id"), primary_key=True),
    Column("location_id", ForeignKey("location.id"), primary_key=True),
)


class User(Base):
    __tablename__ = "user"
    __table_args__ = (UniqueConstraint("email"),)
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String)
    hashed_password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    disabled = Column(Boolean)
    plants = relationship("Plant", secondary="plant_user", back_populates="user")


plant_user = Table(
    "plant_user",
    Base.metadata,
    Column("plant_id", ForeignKey("plant.id"), primary_key=True),
    Column("user_id", ForeignKey("user.id"), primary_key=True),
)


class Plant(Base):
    __tablename__ = "plant"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    trefle_id = Column(Integer)
    purchase_date = Column(Date, nullable=True)
    name = Column(String, nullable=False, unique=True)
    photo_url = Column(String, nullable=True, unique=False)
    common_name = Column(String)
    scientific_name = Column(String)
    sources = relationship(
        "Source",
        secondary="plant_source",
        back_populates="plants",
    )
    location = relationship(
        "Location",
        secondary="plant_location",
        back_populates="plants",
    )
    user = relationship(
        "User",
        secondary="plant_user",
        back_populates="plants",
    )
