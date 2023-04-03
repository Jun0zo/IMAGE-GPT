from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    id: Optional[int]
    name: str
    email: str
    password: str
    age: Optional[int]
    sex: Optional[str]

    class Config:
        orm_mode = True

class UserCount(BaseModel):
    total: int