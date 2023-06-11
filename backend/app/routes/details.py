from fastapi import APIRouter, Depends, HTTPException

from database.connection import get_db

from sqlalchemy.orm import Session, joinedload

# from models.search
from typing import List
from sqlalchemy import func, select, desc

from fastapi import HTTPException, status

from models.user import User
from models.image import Image
from models.like import Like
from models.video import Video

from schemas.responses.ImageDetails import ImageDetails

details = APIRouter()

@details.get("/details/image", tags=["details"], response_model=ImageDetails)
def get_videos_by_keyword(id: str, db: Session = Depends(get_db)):
    result = db.query(Image, Video).options(joinedload(Image.video)).filter(Image.id == id).first()

    if result:
        image_info, video_info = result
        image_and_video = {
            'subtitle':image_info.subtitle,
            'video_title':video_info.title,
            'video_description':video_info.description,
            'video_tags':video_info.tags
        }

        return {'result': image_and_video}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")

        
