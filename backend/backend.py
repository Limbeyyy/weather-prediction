import random
from collections import namedtuple
from fastapi import FastAPI
from model_training import load_model, data_processing
from typing import List, Dict

Features = namedtuple("Features", [
    "MinTemp",
    "MaxTemp",
    "Rainfall",
    "Evaporation",
    "Sunshine",
    "WindGustDir",
    "WindGustSpeed",
    "WindDir9am",
    "WindDir3pm",
    "WindSpeed9am",
    "WindSpeed3pm",
    "Humidity9am",
    "Humidity3pm",
    "Pressure9am",
    "Pressure3pm",
    "Cloud9am",
    "Cloud3pm",
    "Temp9am",
    "Temp3pm",
    "RainTommorow",
])

server = FastAPI()
_, x, _, y = data_processing()

models = {
    "Logistic Regression": "logistic_model",
    "Decision Tree Classifier": "dt_classifier_model",
    "Multi Layer Perceptron": "mlp_model",
    "Random Forest Classifier": "rf_classifier_model",
    "CatBoost": "catboost_model",
    "XGBoost": "xgboost_model",
}


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

def generate_sample_features(num_samples: int) -> List[Dict[str, str]]:
    sample_features = []
    for i in range(num_samples):
        sample = {
            "MinTemp",
            "MaxTemp",
            "Rainfall",
            "Evaporation",
            "Sunshine",
            "WindGustDir",
            "WindGustSpeed",
            "WindDir9am",
            "WindDir3pm",
            "WindSpeed9am",
            "WindSpeed3pm",
            "Humidity9am",
            "Humidity3pm",
            "Pressure9am",
            "Pressure3pm",
            "Cloud9am",
            "Cloud3pm",
            "Temp9am",
            "Temp3pm",
            "RainTommorow",
        }
        sample_features.append(sample)
    return sample_features


@server.get("/predict/")
def make_prediction(model: str = "Random Forest Classifier"):
    model = load_model(filename=models[model])
    random_idx = random.randint(0, len(x) - 1)
    print(f"{random_idx = }")
    print(f"{type(random_idx) = }")

    input = x[random_idx]
    print(f"{input = }")
    print(f"{type(input) = }")
    print(f"{input.shape = }")

    target = y[random_idx]
    print(f"{target = }")
    print(f"{type(target) = }")
    print(f"{target.shape = }")
    prediction = model.predict(input.reshape(1, -1))
    # return prediction, target, input
    return {
        "prediction" : prediction.item(),
        "target": target.item(),
        "input": Features(*input.tolist()),
        "idx": random_idx
    }


@server.get("/sample-features/")
async def get_sample_features():
    return generate_sample_features(num_samples=20)


