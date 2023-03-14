from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

db = [
    {"id": "choiwonjun", "pw": "1234"},
    {"id": "jun0jo", "pw": "12345"},
    {"id": "jeong1park", "pw": "321"},
]


class Login(BaseModel):
    id: str
    pw: str


@app.post("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/login")
async def read_login(login: Login):
    print({"login_id": login.id, "login_pw": login.pw})
    for user in db:
        if login.id == user["id"] and login.pw == user["pw"]:
            print(login.id, login.pw)
            return {"로그인 성공"}
    print(login.id, login.pw)
    return {"로그인 실패"}
