from typing import Annotated
from fastapi import Depends
from sqlalchemy.orm import Session
from .db import SessionLocal


def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


MySqlDB = Annotated[
    Session,
    Depends(get_session)
]
