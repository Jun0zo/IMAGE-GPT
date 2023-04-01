from sqlalchemy import Column, Integer, String, ForeignKey, Float, TIMESTAMP
from sqlalchemy.orm import relationship
from database.session import meta, engine, Base

# users = Table(
#     "users",
#     meta,
#     Column("id", Integer, primary_key=True),
#     Column(
#         "name",
#         String(255),
#     ),
#     Column("email", String(255)),
#     Column("password", String(255)),
# ),

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    age = Column(Integer)
    sex = Column(String(10))

    downloads = relationship('Download', back_populates='user')
    searches = relationship('Search', back_populates='user')
    likes = relationship('Like', back_populates='user')

# meta.create_all(engine)