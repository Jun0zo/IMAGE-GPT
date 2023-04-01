from sqlalchemy import Column, Integer, String, ForeignKey, Float, TIMESTAMP
from sqlalchemy.orm import relationship
from config.db import meta, engine, Base

class Search(Base):
    __tablename__ = 'searches'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    keyword = Column(String(50), nullable=False)
    searched_time = Column(TIMESTAMP, nullable=False)

    user = relationship('User', back_populates='searches')