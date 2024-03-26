import random
import numpy as np
from pydantic import BaseModel
from schemas.ml import MLModelType
from schemas.sklearn import ScikitModel
from ml.presistence_manager import load_model
from database.models.dataframe import WeatherData
from schemas.ml import RawInputVector, InputVector


def _get_model(
    type: MLModelType
) -> ScikitModel:
    model_filename: str = type.value
    return load_model(model_filename)


def get_prediction(
    type: MLModelType,
    x: np.ndarray,
):
    model = _get_model(type)
    input = x.reshape(1, -1)
    prediction = model.predict(input)

    return prediction


def sample_to_array(sample: WeatherData) -> np.array:
    sample_dict: dict = sample.__dict__
    arr = np.array( [ sample_dict[col] for col in [n for n in WeatherData.__table__.columns.keys() if n not in ["id", "rain_tomorrow"] ] ] )
    return arr


def pydantic_to_np(sample: BaseModel) -> np.array:
    table = sample.model_dump()
    array = table.values()
    return np.array( list(array) )


def db_model_to_input(sample: WeatherData) -> RawInputVector:
    res = RawInputVector(
        Location = sample.location,
        MinTemp = sample.min_temp,
        MaxTemp = sample.max_temp,
        Rainfall = sample.rainfall,
        Evaporation = sample.evaporation,
        Sunshine = sample.sunshine,
        WindGustDir = sample.wind_gust_dir,
        WindGustSpeed = sample.wind_gust_speed,
        WindDir9am = sample.wind_dir_9am,
        WindDir3pm = sample.wind_dir_3pm,
        WindSpeed9am = sample.wind_speed_9am,
        WindSpeed3pm = sample.wind_speed_3pm,
        Humidity9am = sample.humidity_9am,
        Humidity3pm = sample.humidity_3pm,
        Pressure9am = sample.pressure_9am,
        Pressure3pm = sample.pressure_3pm,
        Cloud9am = sample.cloud_9am,
        Cloud3pm = sample.cloud_3pm,
        Temp9am = sample.temp_9am,
        Temp3pm = sample.temp_3pm,
        RainToday = sample.rain_today
    )

    return res


def raw_to_inputs(sample: RawInputVector) -> np.array:
    le_location = load_model("label_encoder_Location")
    le_wind_dir_9am = load_model("label_encoder_WindDir9am")
    le_wind_dir_3pm = load_model("label_encoder_WindDir3pm")
    le_wind_gust_dir = load_model("label_encoder_WindGustDir")
    imputer = load_model("iterative_imputer")

    res = InputVector(
        Location = le_location.transform([sample.Location]),
        MinTemp = sample.MinTemp,
        MaxTemp = sample.MaxTemp,
        Rainfall = sample.Rainfall,
        Evaporation = sample.Evaporation,
        Sunshine = sample.Sunshine,
        WindGustDir = le_wind_gust_dir.transform([sample.WindGustDir]),
        WindGustSpeed = sample.WindGustSpeed,
        WindDir9am = le_wind_dir_9am.transform([sample.WindDir9am]),
        WindDir3pm = le_wind_dir_3pm.transform([sample.WindDir3pm]),
        WindSpeed9am = sample.WindSpeed9am,
        WindSpeed3pm = sample.WindSpeed3pm,
        Humidity9am = sample.Humidity9am,
        Humidity3pm = sample.Humidity3pm,
        Pressure9am = sample.Pressure9am,
        Pressure3pm = sample.Pressure3pm,
        Cloud9am = sample.Cloud9am,
        Cloud3pm = sample.Cloud3pm,
        Temp9am = sample.Temp9am,
        Temp3pm = sample.Temp3pm,
        RainToday = 1 if sample.RainToday.lower() == "yes" else 0
    )

    res = pydantic_to_np(res)
    # print(res)

    import warnings
    warnings.filterwarnings("ignore")
    res = imputer.transform(res.reshape(1, -1))

    return res
