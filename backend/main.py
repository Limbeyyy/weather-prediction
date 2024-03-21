import os.path as path
from ml.csv_generator import preprocess_csv
from crud.dataframe import fill_table_with_csv
from database.dependency import get_session

from database.create_tables import create_tables
create_tables()

if not path.exists(path.join("ml", "weather.csv")):
    preprocess_csv()
    fill_table_with_csv(next(get_session()), path.join("ml", "weather.csv"))



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import login, user, predict

server = FastAPI()

server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

server.include_router(login.router)
server.include_router(user.router)
server.include_router(predict.router)
