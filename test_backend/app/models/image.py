from sqlalchemy import Column, Integer, String, ForeignKey, Float, TIMESTAMP
from sqlalchemy.orm import relationship
from database.session import meta, engine, Base

class Image(Base):
    __tablename__ = 'images'

    id = Column(Integer, primary_key=True, autoincrement=True)
    url = Column(String(255))
    video_id = Column(Integer, ForeignKey('videos.id'), nullable=False)
    subtitle = Column(String(255))
    emotion_score = Column(Float)

    downloads = relationship('Download', back_populates='image')
    video = relationship('Video', back_populates='images')
