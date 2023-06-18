from typing import Dict, List
from pydantic import BaseModel

class AgeData(BaseModel):
    age_group: str
    male: str
    female: str
    other: str

class AgeResponse(BaseModel):
    result: List[AgeData]