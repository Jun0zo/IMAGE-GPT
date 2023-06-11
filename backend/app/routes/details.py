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
from schemas.responses.VideoImages import VideoImages

details = APIRouter()

@details.get("/details/image", tags=["details"], response_model=ImageDetails)
def get_videos_by_keyword(id: str, db: Session = Depends(get_db)):
    result = db.query(Image, Video).join(Video, Image.video_id == Video.id).filter(Image.id == id).first()

    if result:
        image_info, video_info = result
        image_and_video = {
            'image_url':image_info.url,
            'image_subtitle':image_info.subtitle,
            'video_id':video_info.id,
            'video_title':video_info.title,
            'video_description':video_info.description,
            'video_tags':video_info.tags
        }

        return {'result': image_and_video}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")

        
@details.get("/details/video_images", tags=["details"], response_model=VideoImages)
def get_images_by_videoid(video_id: str, db: Session = Depends(get_db)):
    results = db.query(Image).filter(Image.video_id == video_id).all()

    if results:
        images = [{'id':result.id, 'url':result.url} for result in results]

        return {'result': images}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")