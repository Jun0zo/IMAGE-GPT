from typing import Optional
from pydantic import BaseModel


class Search(BaseModel):
    id: Optional[int]
    user_id: int
    keyword: str
    searched_time: Optional[str]

    class Config:
        orm_mode = True
