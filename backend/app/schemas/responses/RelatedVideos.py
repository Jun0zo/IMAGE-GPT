from typing import Dict, List
from pydantic import BaseModel

class VideoResult(BaseModel):
    id: str
    title: str
    url: str

class RelatedVideosResponse(BaseModel):
    result: List[VideoResult]
    