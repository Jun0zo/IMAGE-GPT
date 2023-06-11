# main.py
import os
import sys

if '/' not in sys.path: sys.path.append('/')
if '/app' not in sys.path: sys.path.append('/app')

from fastapi import FastAPI
# from routes.user import user
from routes.statistics import statistics
from routes.search import search
from routes.auth import auth

from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from middleware.SearchHistoryMiddleware import SearchHistoryMiddleware

app = FastAPI(
    title="Users API",
    description="a REST API using python and mysql",
    version="0.0.1",
    # openapi_tags=tags_metadata,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up the middleware to read the request session
# SECRET_KEY = os.environ.get('SECRET_KEY') or None
# if SECRET_KEY is None:
#     raise 'Missing SECRET_KEY'

# auth_app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

# app.add_middleware(SearchHistoryMiddleware)

app.mount("/public", StaticFiles(directory="public"), name="public")

# app.include_router(user)
app.include_router(statistics)
app.include_router(search)
app.include_router(auth)