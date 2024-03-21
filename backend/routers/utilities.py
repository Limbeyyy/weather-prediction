import random
import numpy as np
from schemas.ml import MLModelType
from schemas.sklearn import ScikitModel
from ml.presistence_manager import load_model
from database.models.dataframe import WeatherData


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
