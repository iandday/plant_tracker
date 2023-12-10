import uvicorn
import os
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware
from fastapi.middleware.cors import CORSMiddleware


from routers import source, plant, location, user, login

origins = [
    "http://localhost:5173",
    "http://10.168.1.168:5173",
    "http://10.168.1.200:5173",
]


app = FastAPI(title="Plant Tracker API")
app.add_middleware(DBSessionMiddleware, db_url=os.environ["DATABASE_URL"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(source.router)
app.include_router(location.router)
app.include_router(plant.router)
app.include_router(user.router)
app.include_router(login.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
