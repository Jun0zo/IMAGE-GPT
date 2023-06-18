from typing import Dict, List
from pydantic import BaseModel, Field

# class GenderResult(BaseModel):
#     male: int = Field(..., description="The count of searches made by male users")
#     female: int = Field(..., description="The count of searches made by female users")
#     others: int = Field(..., description="The count of searches made by users who do not identify as male or female")

class GenderResult(BaseModel):
    count: int
    ratio: float

class GenderDictResult(BaseModel):
    male: GenderResult
    female: GenderResult
    others: GenderResult

class GenderResponse(BaseModel):
    result: GenderDictResult