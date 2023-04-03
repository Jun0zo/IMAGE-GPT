from typing import Dict, List
from pydantic import BaseModel, Field

class TrendResult(BaseModel):
    date: str = Field(..., description="The count of searches made by male users")
    count: int = Field(..., description="The count of searches made by female users")

class TrendResponse(BaseModel):
    result: List[TrendResult]