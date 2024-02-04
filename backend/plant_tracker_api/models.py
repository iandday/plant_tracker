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
    # plants = relationship("Plant", back_populates="location")


class User(Base):
    __tablename__ = "user"
    __table_args__ = (UniqueConstraint("email"),)
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String)
    hashed_password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    disabled = Column(Boolean)
    # plants = relationship("Plant", back_populates="user")


class Plant(Base):
    __tablename__ = "plant"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    trefle_id = Column(Integer)
    purchase_date = Column(Date, nullable=True)
    name = Column(String, nullable=False, unique=True)
    photo_url = Column(String, nullable=True, unique=False)
    common_name = Column(String)
    scientific_name = Column(String)
    # user = relationship(
    #    "User",
    #    back_populates="plants",
    # )
    user_id = Column("user_id", UUID, ForeignKey("user.id"), nullable=False)
    # location = relationship(
    #    "Location",
    #    back_populates="plants",
    # )
    location_id = Column("location_id", UUID, ForeignKey("location.id"), nullable=False)
    sources = relationship(
        "Source",
        secondary="plant_source",
        back_populates="plants",
    )
