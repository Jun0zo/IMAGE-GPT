from typing import Dict, List
from pydantic import BaseModel, Field

class DownloadResult(BaseModel):
    keyword: int = Field(..., description="The count of searches made by male users")
    ratio: float = Field(..., description="The count of searches made by female users")

class DownloadResponse(BaseModel):
    result: List[DownloadResult]