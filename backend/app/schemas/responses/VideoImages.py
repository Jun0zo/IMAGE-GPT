from typing import Dict, List
from pydantic import BaseModel

class ImageResult(BaseModel):
    id: str
    url: str

class VideoImages(BaseModel):
    result: List[ImageResult]
    

