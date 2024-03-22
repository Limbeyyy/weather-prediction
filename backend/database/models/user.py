from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from ..db import Base


class User(Base):
    __tablename__ = "user"

    user_name: Mapped[str] = mapped_column(String(100), primary_key=True)
    email: Mapped[str] = mapped_column(String(100))
    full_name: Mapped[str] = mapped_column(String(100))
    hashed_password: Mapped[str] = mapped_column(String(300))
