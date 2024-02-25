import json
import uvicorn
import os
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi.middleware.cors import CORSMiddleware
import models
from routers import source, plant, area, user, activity, entry, location
from sqlalchemy import event

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://10.168.1.168:5173",
    "http://10.168.1.173:5173",
    "http://10.168.1.168:8080",
    "http://10.168.1.173:8080",
]


app = FastAPI(title="Plant Tracker API")
app.add_middleware(DBSessionMiddleware, db_url=os.environ["DATABASE_URL"])
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


@app.on_event("startup")
def seed_database():
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
            {"name": "Misting2"},
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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
