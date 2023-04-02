# main.py
import os
import sys

if '/' not in sys.path: sys.path.append('/')
if '/app' not in sys.path: sys.path.append('/app')

from fastapi import FastAPI
from routes.user import user
from routes.statistics import statistics
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Users API",
    description="a REST API using python and mysql",
    version="0.0.1",
    # openapi_tags=tags_metadata,
)

app.mount("/public", StaticFiles(directory="public"), name="public")

app.include_router(user)
app.include_router(statistics)