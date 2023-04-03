from typing import Dict, List
from pydantic import BaseModel

class SatisfactionResponse(BaseModel):
    result: float