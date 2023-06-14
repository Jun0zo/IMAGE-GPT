from typing import Dict, List
from pydantic import BaseModel

class DetailedImageResult(BaseModel):
    image_url: str
    image_subtitle: str
    video_id: str
    video_title: str
    video_url: str
    video_description: str
    video_tags: str

class ImageDetails(BaseModel):
    result: DetailedImageResult
    