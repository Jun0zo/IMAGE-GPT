# db.py

from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import declarative_base

DB = {
    'user':'root',
    'password':'test',
    'host':'db',
    'database':'service',
}

engine = create_engine(
    f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}/{DB['database']}?charset=utf8"
)

meta = MetaData()
Base = declarative_base()
conn = engine.connect()
