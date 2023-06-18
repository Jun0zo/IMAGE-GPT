from sqlalchemy import Column, Integer, String, ForeignKey, Float, TIMESTAMP
from sqlalchemy.orm import relationship
from database.session import meta, engine, Base

class Video(Base):
    __tablename__ = 'videos'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    url = Column(String(255), unique=True, nullable=False)
    tags = Column(String(255))
    description = Column(String(255))
    emotion_score = Column(Float)

    images = relationship('Image', back_populates='video')