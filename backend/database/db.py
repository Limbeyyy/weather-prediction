from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


user: str = "root"
password: str = ""
host: str = "localhost"
port: int = 3306
database_name: str = "weather_prediction"


SQLALCHEMY_DATABASE_URL = "mysql://{0}:{1}@{2}:{3}".format(user, password, host, port)


engine = create_engine(SQLALCHEMY_DATABASE_URL)
with engine.begin() as conn:
    conn.execute( text(f"CREATE DATABASE IF NOT EXISTS {database_name}") )


engine = create_engine(f"{SQLALCHEMY_DATABASE_URL}/{database_name}")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
Base.metadata.create_all(engine)
