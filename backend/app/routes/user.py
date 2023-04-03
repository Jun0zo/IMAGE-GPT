# from fastapi import APIRouter
# # from config.db import conn
# # from database.session import
# from models.user import User as UserModel
# from schemas.user import UserCount as UserCountSchema
# from typing import List
# from sqlalchemy import func, select


# user = APIRouter()

# @user.get("/users/count", tags=["users"], response_model=UserCountSchema)
# def get_users_count():
#     # result = conn.execute(select(func.count()).select_from(UserModel.__table__).limit(10).offset(0))
#     result = conn.execute(select(func.count()).select_from(UserModel.__table__))
#     return {"total": tuple(result)[0][0]}