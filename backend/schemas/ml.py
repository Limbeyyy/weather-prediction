from pydantic import BaseModel
from enum import Enum


class MLModelType(str, Enum):
    LOGISTIC_REGRESSION = "logistic_model"
    DECISION_TREE_CLASSIFIER = "dt_classifier_model"
    RANDOM_FOREST_CLASSIFIER = "rf_classifier_model"
    CATBOOST = "catboost_model"
    XGBOOST = "xgboost_model"
    NEURAL_NETWORK = "mlp_model"


class BaseML(BaseModel):
    type: MLModelType


class InputVector(BaseModel):
    Location: float
    MinTemp: float
    MaxTemp: float
    Rainfall: float
    Evaporation: float
    Sunshine: float
    WindGustDir: float
    WindGustSpeed: float
    WindDir9am: float
    WindDir3pm: float
    WindSpeed9am: float
    WindSpeed3pm: float
    Humidity9am: float
    Humidity3pm: float
    Pressure9am: float
    Pressure3pm: float
    Cloud9am: float
    Cloud3pm: float
    Temp9am: float
    Temp3pm: float
    RainToday: float


class ResponseModelML(BaseML):
    idx: int
    inputs: InputVector
    target: bool
    prediction: bool
    target_val: float
    prediction_val: float
