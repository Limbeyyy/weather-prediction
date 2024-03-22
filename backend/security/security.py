from datetime import datetime, timedelta, timezone
from typing import Annotated
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import JWTError, jwt
from schemas.token import TokenData
from crud.user import get_user
from database.dependency import get_session


P_SECRET_KEY = "0afa11235d9f0dba15bb82bd208db084e07304c5481f5d1e51b9c16352dfbcb8" # openssl rand -hex 32
P_ALGORITHM = "HS256"
P_ACCESS_TOKEN_EXPIRE_MINUTES = 30


pwd_context = CryptContext(
    schemes = ["bcrypt"],
    deprecated = "auto",
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl = "token"
)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(username: str, password: str):
    user = get_user(next(get_session()), username)
    if not user:
        return False

    if not verify_password(password, user.hashed_password):
        return False

    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=P_ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, P_SECRET_KEY, algorithm=P_ALGORITHM)

    return encoded_jwt


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)]
):
    credentials_exception = HTTPException(
        status_code = 401,
        detail = "Could not validate credentials",
        headers = { "WWW-Authenticate": "Bearer" },
    )

    try:
        payload = jwt.decode(token, P_SECRET_KEY, algorithms=[P_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user = get_user(next(get_session()), username=token_data.username)
    if not user:
        raise credentials_exception

    return user
