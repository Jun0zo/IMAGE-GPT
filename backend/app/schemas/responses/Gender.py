from typing import Dict, List
from pydantic import BaseModel, Field

class GenderResult(BaseModel):
    male: int = Field(..., description="The count of searches made by male users")
    female: int = Field(..., description="The count of searches made by female users")
    other: int = Field(..., description="The count of searches made by users who do not identify as male or female")

class GenderResponse(BaseModel):
    result: GenderResult