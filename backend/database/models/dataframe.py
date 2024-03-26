from sqlalchemy import String, Integer, Float
from sqlalchemy.orm import Mapped, mapped_column
from ..db import Base


class WeatherData(Base):
    __tablename__ = 'weather'

    id: Mapped[int]                 = mapped_column(Integer, primary_key=True)
    # date_info: Mapped[date]         = mapped_column(Date)
    location: Mapped[str]           = mapped_column(String(100))
    min_temp: Mapped[float]         = mapped_column(Float)
    max_temp: Mapped[float]         = mapped_column(Float)
    rainfall: Mapped[float]         = mapped_column(Float)
    evaporation: Mapped[float]      = mapped_column(Float)
    sunshine: Mapped[float]         = mapped_column(Float)
    wind_gust_dir: Mapped[str]      = mapped_column(String(10))
    wind_gust_speed: Mapped[float]  = mapped_column(Float)
    wind_dir_9am: Mapped[str]       = mapped_column(String(10))
    wind_dir_3pm: Mapped[str]       = mapped_column(String(10))
    wind_speed_9am: Mapped[float]   = mapped_column(Float)
    wind_speed_3pm: Mapped[float]   = mapped_column(Float)
    humidity_9am: Mapped[float]     = mapped_column(Float)
    humidity_3pm: Mapped[float]     = mapped_column(Float)
    pressure_9am: Mapped[float]     = mapped_column(Float)
    pressure_3pm: Mapped[float]     = mapped_column(Float)
    cloud_9am: Mapped[float]        = mapped_column(Float)
    cloud_3pm: Mapped[float]        = mapped_column(Float)
    temp_9am: Mapped[float]         = mapped_column(Float)
    temp_3pm: Mapped[float]         = mapped_column(Float)
    rain_today: Mapped[str]         = mapped_column(String(10))
    rain_tomorrow: Mapped[str]      = mapped_column(String(10))
