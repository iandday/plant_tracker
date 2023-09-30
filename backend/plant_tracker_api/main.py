import uvicorn
import os
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware

from routers import source, plant


app = FastAPI(title="Plant Tracker API")
app.add_middleware(DBSessionMiddleware, db_url=os.environ["DATABASE_URL"])

app.include_router(source.router)
app.include_router(plant.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
