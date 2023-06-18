from fastapi import APIRouter, Depends, HTTPException

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

search = APIRouter()

@search.get("/images", tags=["search"], response_model=SearchResponse)
def get_videos_by_keyword(keyword: str, db: Session = Depends(get_db)):
    images = db.query(Image).filter(Image.subtitle.like(f'%{keyword}%')).all()
    results = [{'id':image.id, 'url':image.url} for image in images]
    
    return {'result' : results}