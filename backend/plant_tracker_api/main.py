from contextlib import asynccontextmanager
import json
import sys
import uvicorn
import os
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi.middleware.cors import CORSMiddleware
import models
from routers import source, plant, area, user, activity, entry, location
from sqlalchemy import event
from alembic.config import Config
from alembic import command
from logging.config import dictConfig
import logging
from config import LogConfig

dictConfig(
    config={
        # Logging config
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": {
                "()": "uvicorn.logging.DefaultFormatter",
                "fmt": "%(levelprefix)s | %(asctime)s | %(message)s",
                "datefmt": "%Y-%m-%d %H:%M:%S",
            },
        },
        "handlers": {
            "default": {
                "formatter": "default",
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stderr",
            },
        },
        "loggers": {"mycoolapp": {"handlers": ["default"], "level": "DEBUG"}},
    }
)
logger = logging.getLogger("mycoolapp")


def seed_database():
    logger.info("Seeding the database")
    initial_data = {
        "Activity": [
            {"name": "Water"},
            {"name": "Fertilizer Application"},
            {"name": "Biostimulant Application"},
            {"name": "Prune"},
            {"name": "Re-pot"},
            {"name": "Quarantine Start"},
            {"name": "Quarantine End"},
            {"name": "Insecticide Treatment"},
            {"name": "Observation"},
            {"name": "Cleaning"},
            {"name": "Misting"},
        ]
    }
    with db():
        for model, data in initial_data.items():
            db_model = getattr(models, model)
            for entry in data:
                db_check = db.session.query(db_model).filter(db_model.name == entry["name"])
                if db_check.count() == 0:
                    db.session.add(db_model(**entry))
        db.session.commit()


def run_migrations():
    logger.info("run alembic upgrade head...")
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


@asynccontextmanager
async def lifespan(app_: FastAPI):
    logger.info("Starting up...")
    run_migrations()
    seed_database()
    yield
    logger.info("Shutting down...")


app = FastAPI(title="Plant Tracker API", lifespan=lifespan)
app.add_middleware(DBSessionMiddleware, db_url=os.environ["DATABASE_URL"])


origins = [os.getenv("FRONTEND_URL")]
logger.info(origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(plant.router)
app.include_router(entry.router)
app.include_router(source.router)
app.include_router(area.router)
app.include_router(location.router)
app.include_router(activity.router)
app.include_router(user.router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
