from fastapi import APIRouter
from config.db import conn

from schemas.video import UserCount as UserCountSchema

from typing import List
from sqlalchemy import func, select
from models import User, Video, Like


router = APIRouter()


@router.get("/videos", response_model=List[Video], response_model=VideosSchema)
def read_videos(skip: int = 0, limit: int = 100):
    stmt = select([Video]).offset(skip).limit(limit)
    return conn.execute(stmt).scalars().all()

@router.get("/likes", response_model=List[Like])
def read_likes(skip: int = 0, limit: int = 100):
    stmt = select([Like]).offset(skip).limit(limit)
    return conn.execute(stmt).scalars().all()