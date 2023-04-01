from typing import List, Tuple
from pydantic import BaseModel

class TrendChartData(BaseModel):
    data: List[Tuple[str, int]]
