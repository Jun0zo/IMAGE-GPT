from typing import Dict, List
from pydantic import BaseModel

class SearchResponse(BaseModel):
    result: List[str]