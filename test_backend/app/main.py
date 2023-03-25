import os
from fastapi import FastAPI

app = FastAPI()

print(os.environ['MYSQL_HOST'])
print(os.environ['MYSQL_USER'])
print(os.environ['MYSQL_PASSWORD'])

@app.get("/")
def read_root():
    return {"Hello": "test"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}