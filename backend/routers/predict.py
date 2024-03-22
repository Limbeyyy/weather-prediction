import random
import numpy as np
from typing import Annotated
from fastapi import APIRouter, Query, Depends
from schemas.ml import MLModelType, ResponseModelML, InputVector
from security.security import oauth2_scheme
from crud import dataframe
from database.dependency import MySqlDB, get_session
from database.models.dataframe import WeatherData
from .utilities import get_prediction, sample_to_array


router = APIRouter(
    prefix = "/predict",
    tags = ["prediction"],
    dependencies = [Depends(oauth2_scheme)],
)

N:int = dataframe.length(next(get_session()))


@router.get("/")
async def make_prediction(
    session: MySqlDB,
    model: Annotated[
        MLModelType,
        Query()
    ] = MLModelType.RANDOM_FOREST_CLASSIFIER,
) ->  ResponseModelML:
    idx: int = random.randint(1, N)

    sample: WeatherData = dataframe.get_row_by_id(session, idx)
    target: float = sample.rain_tomorrow

    inputs: np.array = sample_to_array(sample)
    prediction: float = get_prediction(model, inputs)

    return {
        "idx": idx,
        "type": model.value,
        "inputs": InputVector( **{ attr: val for attr, val in zip(InputVector.model_fields.keys(), inputs.tolist()) } ),
        "target": True if target != 0 else False,
        "prediction" : True if prediction.item() else False,
        "target_val": target,
        "prediction_val" : prediction.item(),
    }
