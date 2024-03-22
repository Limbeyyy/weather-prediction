from database.db import engine, Base

from database.models.dataframe import WeatherData
from database.models.user import User
# WeatherData.__table__.create(engine)
# User.__table__.create(engine)


def create_tables() -> None:
    Base.metadata.create_all(bind=engine)
