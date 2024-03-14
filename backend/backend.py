import random
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model_training import load_model, data_processing

server = FastAPI()
server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
_, x, _, y = data_processing()


models = {
    "Logistic Regression": "logistic_model",
    "Decision Tree Classifier": "dt_classifier_model",
    "Multi Layer Perceptron": "mlp_model",
    "Random Forest Classifier": "rf_classifier_model",
    "CatBoost": "catboost_model",
    "XGBoost": "xgboost_model",
}

class InputVector(BaseModel):
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

class PredictionType(BaseModel):
    prediction: bool
    target: bool
    input: InputVector
    idx: int


@server.get("/models/")
def avialable_models():
    models_list = [
        "Logistic Regression",
        "Decision Tree Classifier",
        "Multi Layer Perceptron",
        "Random Forest Classifier",
        "CatBoost",
        "XGBoost",
    ]

    return { "models_list": models_list }


@server.get("/predict/", response_model=PredictionType)
def make_prediction(model: str = "Random Forest Classifier"):
    model = load_model(filename=models[model])
    random_idx = random.randint(0, len(x) - 1)
    input = x[random_idx]
    target = y[random_idx]
    prediction = model.predict(input.reshape(1, -1))

    return {
        "prediction" : True if prediction.item() else False,
        "target": True if target.item() else False,
        "input": InputVector( **{ attr: val for attr, val in zip(InputVector.__fields__.keys(), input.tolist()) } ),
        "idx": random_idx
    }
