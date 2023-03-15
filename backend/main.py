from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"연구실 컴퓨터로": "환경설정해보기"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}