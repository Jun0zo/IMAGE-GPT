from typing import Optional
from pydantic import BaseModel


class Download(BaseModel):
    id: Optional[int]
    user_id: int
    image_id: int
    downloaded_time: Optional[str]
    keyword: Optional[str]

    class Config:
        orm_mode = True