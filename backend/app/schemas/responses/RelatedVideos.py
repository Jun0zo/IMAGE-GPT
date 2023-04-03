from typing import Dict, List
from pydantic import BaseModel

class RelatedVideosResponse(BaseModel):
    result: List[str]
    