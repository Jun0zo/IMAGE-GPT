from typing import Dict, List
from pydantic import BaseModel

class SimilarKeywordsResponse(BaseModel):
    result: List[str]
    