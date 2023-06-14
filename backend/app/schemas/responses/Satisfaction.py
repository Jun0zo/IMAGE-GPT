from typing import Dict, List
from pydantic import BaseModel

class SatisfactionResult(BaseModel):
     likes_count: str
     searches_count: str 
     ratio: str

class SatisfactionResponse(BaseModel):
    result: SatisfactionResult