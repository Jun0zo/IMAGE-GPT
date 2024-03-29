from sqlalchemy import Column, Integer, String, ForeignKey, Float, TIMESTAMP
from sqlalchemy.orm import relationship
from database.session import meta, engine, Base

class Like(Base):
    __tablename__ = 'likes'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    keyword = Column(String(50))

    user = relationship('User', back_populates='likes')