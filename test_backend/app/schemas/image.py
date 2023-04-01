from typing import Optional, List
from pydantic import BaseModel
from schemas import Download

class Image(BaseModel):
    id: Optional[int]
    url: Optional[str]
    video_id: int
    subtitle: Optional[str]
    emotion_score: Optional[float]
    downloads: Optional[List[Download]]

    class Config:
        orm_mode = True