import random
from fastapi import FastAPI
from model_training import load_model, data_processing

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
        "input": input.tolist(),
        "idx": random_idx
    }
