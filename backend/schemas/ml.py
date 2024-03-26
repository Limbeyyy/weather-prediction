from pydantic import BaseModel
from enum import Enum


class MLModelType(str, Enum):
    LOGISTIC_REGRESSION = "logistic_model"
    DECISION_TREE_CLASSIFIER = "dt_classifier_model"
    RANDOM_FOREST_CLASSIFIER = "rf_classifier_model"
    CATBOOST = "catboost_model"
    XGBOOST = "xgboost_model"
    NEURAL_NETWORK = "mlp_model"


class Locations(str, Enum):
    Albury = 'Albury'
    BadgerysCreek = 'BadgerysCreek'
    Cobar = 'Cobar'
    CoffsHarbour = 'CoffsHarbour'
    Moree = 'Moree'
    Newcastle = 'Newcastle'
    NorahHead = 'NorahHead'
    NorfolkIsland = 'NorfolkIsland'
    Penrith = 'Penrith'
    Richmond = 'Richmond'
    Sydney = 'Sydney'
    SydneyAirport = 'SydneyAirport'
    WaggaWagga = 'WaggaWagga'
    Williamtown = 'Williamtown'
    Wollongong = 'Wollongong'
    Canberra = 'Canberra'
    Tuggeranong = 'Tuggeranong'
    MountGinini = 'MountGinini'
    Ballarat = 'Ballarat'
    Bendigo = 'Bendigo'
    Sale = 'Sale'
    MelbourneAirport = 'MelbourneAirport'
    Melbourne = 'Melbourne'
    Mildura = 'Mildura'
    Nhil = 'Nhil'
    Portland = 'Portland'
    Watsonia = 'Watsonia'
    Dartmoor = 'Dartmoor'
    Brisbane = 'Brisbane'
    Cairns = 'Cairns'
    GoldCoast = 'GoldCoast'
    Townsville = 'Townsville'
    Adelaide = 'Adelaide'
    MountGambier = 'MountGambier'
    Nuriootpa = 'Nuriootpa'
    Woomera = 'Woomera'
    Albany = 'Albany'
    Witchcliffe = 'Witchcliffe'
    PearceRAAF = 'PearceRAAF'
    PerthAirport = 'PerthAirport'
    Perth = 'Perth'
    SalmonGums = 'SalmonGums'
    Walpole = 'Walpole'
    Hobart = 'Hobart'
    Launceston = 'Launceston'
    AliceSprings = 'AliceSprings'
    Darwin = 'Darwin'
    Katherine = 'Katherine'
    Uluru = 'Uluru'


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


class RawInputVector(BaseModel):
    Location: str
    MinTemp: float
    MaxTemp: float
    Rainfall: float
    Evaporation: float
    Sunshine: float
    WindGustDir: str
    WindGustSpeed: float
    WindDir9am: str
    WindDir3pm: str
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
    RainToday: str


class ResponseModelML(BaseML):
    idx: int
    # inputs: InputVector
    inputs: RawInputVector
    target: bool
    prediction: bool
    target_val: float
    prediction_val: float
