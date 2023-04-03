from typing import Dict, List
from pydantic import BaseModel

class AgeData(BaseModel):
    age_group: str
    count: int


class AgeResponse(BaseModel):
    result: List[AgeData]