from typing import Annotated
from datetime import timedelta
from fastapi import APIRouter, status, HTTPException, Depends, Body
from fastapi.security import OAuth2PasswordRequestForm
from security.security import authenticate_user, create_access_token
from schemas.token import Token
from schemas.user import InputModelUser, ResponseModelUser, UserInDB
from database.dependency import MySqlDB
from crud.user import get_user, insert_user
from security.security import get_password_hash


router = APIRouter(
    prefix = "/token",
    tags = ["token"],
)


@router.post("/")
async def login(
    form_data: Annotated[
        OAuth2PasswordRequestForm,
        Depends()
    ],
) -> Token:
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Incorrect username or passwrod",
            headers = { "WWW-Authenticate": "Bearer" },
        )

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data = { "sub": user.user_name },
        expires_delta = access_token_expires,
    )

    return Token(
        access_token = access_token,
        token_type = "bearer"
    )


@router.post("/signup")
async def signup(
    user: Annotated[
        InputModelUser,
        Body()
    ],
    session: MySqlDB,
) -> ResponseModelUser:
    db_user = get_user(session, user.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="username already registered",
        )

    hashed_password = get_password_hash(user.password)
    db_user = UserInDB(
        username = user.username,
        email = user.email,
        full_name = user.full_name,
        hashed_password = hashed_password,
    )

    res:ResponseModelUser = insert_user(session, db_user)
    res.username = res.user_name
    return res
