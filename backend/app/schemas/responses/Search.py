from typing import Dict, List
from pydantic import BaseModel

class SearchResult(BaseModel):
    id: str
    url: str

class SearchResponse(BaseModel):
    result: List[SearchResult]