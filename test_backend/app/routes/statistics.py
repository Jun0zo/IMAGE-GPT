from fastapi import APIRouter, Depends
# from config.db import conn
from database.connection import get_db

from sqlalchemy.orm import Session

# from schemas.video import UserCount as UserCountSchema

from typing import List
from sqlalchemy import func, select
from models.user import User
from models.image import Image
from models.video import Video
from models.like import Like
from models.download import Download
from models.search import Search

from schemas.user import User as UserSchema
from schemas.image import Image as ImageSchema
from schemas.video import Video as VideoSchema
from schemas.download import Download as DownloadSchema


statistics = APIRouter()


# @statistics.get("/videos", tags=["statistics"]) #, response_model=List[Video]) response_model=VideosSchema)
# def read_videos(skip: int = 0, limit: int = 100):
#     result = conn.execute(select(Video.__table__))
#     # print(tuple(result))
#     return {"total": tuple(result)[0]}

@statistics.get("/videos", response_model=List[VideoSchema], tags=["videos"])
def get_videos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    videos = db.query(Video).offset(skip).limit(limit).all()
    print('videos :', videos)
    return videos

# @statistics.get("/likes", tags=["statistics"]) #, response_model=List[Like])
# def read_likes(skip: int = 0, limit: int = 100):
#     stmt = select([Like]).offset(skip).limit(limit)
#     return conn.execute(stmt).scalars().all()