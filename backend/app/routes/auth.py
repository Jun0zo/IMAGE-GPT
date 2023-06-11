import os

from fastapi import APIRouter, Depends, HTTPException
from starlette.config import Config
from database.connection import get_db

from sqlalchemy.orm import Session

# from models.search
from typing import List
from sqlalchemy import func, select, desc
from models.user import User
from models.image import Image
from models.like import Like
from models.video import Video

from schemas.responses.Search import SearchResponse

from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm
from requests_oauthlib import OAuth2Session

auth = APIRouter()

# Google OAuth configuration
client_id =  '121079642070-ba0osda37t6s7op574peuvqrdjpogu99.apps.googleusercontent.com'
client_secret = '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'
redirect_uri = "http://unilab.kro.kr/auth/login/callback"

authorization_base_url = "https://accounts.google.com/o/oauth2/v2/auth"
token_url = "https://oauth2.googleapis.com/token"
scope = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/user.birthday.read",
    "https://www.googleapis.com/auth/user.gender.read",
]

# auth endpoint
# @auth.get("/auth/login/google")
# def login_with_google():
#     google = OAuth2Session(client_id, redirect_uri=redirect_uri, scope=scope)
#     authorization_url, state = google.authorization_url(authorization_base_url, access_type="offline")

#     # Save the session state for later use in the callback
#     # You can store it in the session, a database, or a cookie
#     # For simplicity, we'll store it in a global variable here
#     auth.google_session_state = state

#     return RedirectResponse(authorization_url)


# # Callback endpoint
# @auth.get("/auth/login/google/callback")
# async def google_callback(code: str, state: str):
#     print('callback call!!')
#     # Ensure the session state is the same as the one stored previously
#     if state != auth.google_session_state:
#         raise HTTPException(status_code=400, detail="Invalid session state")

#     google = OAuth2Session(client_id, redirect_uri=redirect_uri, state=state)
#     token = google.fetch_token(token_url, client_secret=client_secret, code=code)

#     # Use the token to make requests to Google APIs
#     response = google.get("https://www.googleapis.com/oauth2/v1/userinfo")
#     user_info = response.json()

#     age = user_info.get("birthday")
#     gender = user_info.get("gender")

#     # Process the user information as needed
#     # For example, you can create a user account or authenticate the user in your application

#     return {"user_info": user_info, "age": age, "gender": gender}
