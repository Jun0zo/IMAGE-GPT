from typing import Optional
from pydantic import BaseModel


class Like(BaseModel):
    id: Optional[int]
    user_id: int
    keyword: Optional[str]

    class Config:
        orm_mode = True