from pydantic import BaseModel


class BaseUser(BaseModel):
    username: str
    email: str
    full_name: str


class InputModelUser(BaseUser):
    password: str


class ResponseModelUser(BaseUser):
    pass


class UserInDB(BaseUser):
    hashed_password: str
