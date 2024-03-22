from typing import Annotated
from fastapi import APIRouter, Depends
from schemas.user import ResponseModelUser
from security.security import get_current_user, oauth2_scheme
from database.models.user import User


router = APIRouter(
    prefix = "/users",
    tags = ["users"],
    dependencies = [Depends(oauth2_scheme)],
)


@router.get("/me")
async def get_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
) -> ResponseModelUser:
    res: ResponseModelUser = current_user
    res.username = current_user.user_name
    return res
