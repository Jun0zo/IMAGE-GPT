from typing import Dict, List
from pydantic import BaseModel, Field

class DownloadResult(BaseModel):
    downloads_count: int = Field(..., description="The count of downloads")
    searches_count: int = Field(..., description="The count of searches")
    ratio: float = Field(..., description="The ratio of downloads and searches")

class DownloadResponse(BaseModel):
    result: DownloadResult