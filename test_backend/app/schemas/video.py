from typing import Optional, List
from pydantic import BaseModel
from schemas.image import Image

class Video(BaseModel):
    id: Optional[int]
    title: str
    url: str
    tag: Optional[str]
    hash_tag: Optional[str]
    emotion_score: Optional[float]
    images: Optional[List[Image]]

    class Config:
        orm_mode = True