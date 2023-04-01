from sqlalchemy import Column, Integer, String, ForeignKey, Float, TIMESTAMP
from sqlalchemy.orm import relationship
from database.session import meta, engine, Base

class Download(Base):
    __tablename__ = 'downloads'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    image_id = Column(Integer, ForeignKey('images.id'), nullable=False)
    downloaded_time = Column(TIMESTAMP, nullable=False)
    keyword = Column(String(50))

    user = relationship('User', back_populates='downloads')
    image = relationship('Image', back_populates='downloads')