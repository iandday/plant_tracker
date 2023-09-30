import uuid
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import UUID, Column, ForeignKey, Integer, String, Date, Table

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


class Plant(Base):
    __tablename__ = "plant"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    trefle_id = Column(Integer)
    purchase_date = Column(Date, nullable=True)
    name = Column(String, nullable=False, unique=True)
    photo_url = Column(String, nullable=True, unique=False)
    location = Column(String, nullable=False)
    common_name = Column(String)
    scientific_name = Column(String)
    sources = relationship(
        "Source",
        secondary="plant_source",
        back_populates="plants",
    )
