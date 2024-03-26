import random
import numpy as np
from typing import Annotated
from fastapi import APIRouter, Query, Depends, Body, Path
from schemas.ml import MLModelType, ResponseModelML, RawInputVector, Locations
from security.security import oauth2_scheme
from crud import dataframe
from database.dependency import MySqlDB, get_session
from database.models.dataframe import WeatherData
from .utilities import get_prediction, db_model_to_input, raw_to_inputs


router = APIRouter(
    prefix = "/predict",
    tags = ["prediction"],
    dependencies = [Depends(oauth2_scheme)],
)

N:int = dataframe.length(next(get_session()))


@router.post("/{location}")
async def make_prediction_by_location(
    session: MySqlDB,
    location: Annotated[
        Locations,
        Path()
    ],
    model: Annotated[
        MLModelType,
        Query()
    ] = MLModelType.RANDOM_FOREST_CLASSIFIER,
) ->  ResponseModelML:
    samples = dataframe.samples_by_location(session, location.value)
    counts: int = len(samples)
    idx: int = random.randint(1, counts) - 1
    sample: WeatherData = samples[idx]
    target: float = 1 if sample.rain_tomorrow.lower() == "yes" else 0
    parameters: RawInputVector = db_model_to_input(sample)

    inputs: np.array = raw_to_inputs(parameters)
    prediction: float = get_prediction(model, inputs)

    return {
        "idx": idx,
        "type": model.value,
        "inputs": parameters,
        "target": True if target != 0 else False,
        "prediction" : True if prediction.item() else False,
        "target_val": target,
        "prediction_val" : prediction.item(),
    }


@router.post("/")
async def make_prediction(
    session: MySqlDB,
    model: Annotated[
        MLModelType,
        Query()
    ] = MLModelType.RANDOM_FOREST_CLASSIFIER,
    parameters: Annotated[
        RawInputVector | None,
        Body()
    ] = None,
) ->  ResponseModelML:
    if parameters is None:
        idx: int = random.randint(1, N) - 1
        sample: WeatherData = dataframe.get_row_by_id(session, idx)
        target: float = 1 if sample.rain_tomorrow.lower() == "yes" else 0
        parameters: RawInputVector = db_model_to_input(sample)

    inputs: np.array = raw_to_inputs(parameters)
    prediction: float = get_prediction(model, inputs)

    return {
        "idx": idx,
        "type": model.value,
        "inputs": parameters,
        "target": True if target != 0 else False,
        "prediction" : True if prediction.item() else False,
        "target_val": target,
        "prediction_val" : prediction.item(),
    }
