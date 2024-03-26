import csv
import random
from sqlalchemy.orm import Session
from database.models.dataframe import WeatherData


def fill_table_with_csv(session: Session, filename: str) -> None:
    with open(filename, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            weather_data = WeatherData(
                # date_info = row['Date'],
                location = row['Location'],
                min_temp = row['MinTemp'],
                max_temp = row['MaxTemp'],
                rainfall = row['Rainfall'],
                evaporation = row['Evaporation'],
                sunshine = row['Sunshine'],
                wind_gust_dir = row['WindGustDir'],
                wind_gust_speed = row['WindGustSpeed'],
                wind_dir_9am = row['WindDir9am'],
                wind_dir_3pm = row['WindDir3pm'],
                wind_speed_9am = row['WindSpeed9am'],
                wind_speed_3pm = row['WindSpeed3pm'],
                humidity_9am = row['Humidity9am'],
                humidity_3pm = row['Humidity3pm'],
                pressure_9am = row['Pressure9am'],
                pressure_3pm = row['Pressure3pm'],
                cloud_9am = row['Cloud9am'],
                cloud_3pm = row['Cloud3pm'],
                temp_9am = row['Temp9am'],
                temp_3pm = row['Temp3pm'],
                rain_today = row['RainToday'],
                rain_tomorrow = row['RainTomorrow'],
            )
            session.add(weather_data)

        session.commit()


def get_row_by_id(session: Session, id: int) -> WeatherData:
    query = session.query(WeatherData).filter_by(id=id)
    db_sample = query.first()
    return db_sample


def length(session: Session) -> int:
    query = session.query(WeatherData).all()
    return len(query)


def samples_by_location(session: Session, location: str) -> list[WeatherData]:
    query = session.query(WeatherData).filter(WeatherData.location == location)
    db_samples = query.all()
    if not len(db_samples):
        db_samples = [WeatherData(
            location = location,
            min_temp = random.normalvariate(mu=29, sigma=10),
            max_temp = random.normalvariate(mu=32, sigma=10),
            rainfall = random.normalvariate(mu=2.12, sigma=7.13),
            evaporation = random.normalvariate(mu=2.12, sigma=7.13),
            sunshine = random.normalvariate(mu=2.12, sigma=7.13),
            wind_gust_dir = 'N',
            wind_gust_speed = random.normalvariate(mu=2.12, sigma=7.13),
            wind_dir_9am = 'NE',
            wind_dir_3pm = 'SSW',
            wind_speed_9am = random.normalvariate(mu=2.12, sigma=7.13),
            wind_speed_3pm = random.normalvariate(mu=2.12, sigma=7.13),
            humidity_9am = random.normalvariate(mu=2.12, sigma=7.13),
            humidity_3pm = random.normalvariate(mu=2.12, sigma=7.13),
            pressure_9am = random.normalvariate(mu=2.12, sigma=7.13),
            pressure_3pm = random.normalvariate(mu=2.12, sigma=7.13),
            cloud_9am = random.normalvariate(mu=2.12, sigma=7.13),
            cloud_3pm = random.normalvariate(mu=2.12, sigma=7.13),
            temp_9am = random.normalvariate(mu=2.12, sigma=7.13),
            temp_3pm = random.normalvariate(mu=2.12, sigma=7.13),
            rain_today = 'No',
            rain_tomorrow = 'No',
        )]
    return db_samples
