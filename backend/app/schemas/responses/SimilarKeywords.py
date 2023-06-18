from typing import Dict, List
from pydantic import BaseModel

class KeywordResult(BaseModel):
    subtitle: str
    distance: str
    similarity: str

class SimilarKeywordsResponse(BaseModel):
    result: List[KeywordResult]
    