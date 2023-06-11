from typing import Dict, List
from pydantic import BaseModel

class DetailedImageResult(BaseModel):
    subtitle: str
    video_title: str
    video_description: str
    video_tags: str

class ImageDetails(BaseModel):
    result: DetailedImageResult
    