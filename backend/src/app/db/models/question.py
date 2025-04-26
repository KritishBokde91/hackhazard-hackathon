from typing import List, Literal

from sqlalchemy import JSON, ForeignKey
from src.app.db.database import Base
from sqlalchemy.orm import Mapped , mapped_column

class Question(Base):
    __tablename__ = "questions"
    id : Mapped[int] = mapped_column("id", autoincrement=True, nullable=False, unique=True, primary_key=True, init=False)
    title : Mapped[str] = mapped_column(nullable=False)
    answer : Mapped[str] = mapped_column(nullable=False)
    content : Mapped[str] = mapped_column(nullable=False)
    image : Mapped[str | None] = mapped_column(nullable=True)
    difficulty : Mapped[Literal["easy" , "medium" , "hard"]] = mapped_column(nullable=False)
    tags : Mapped[List[str]] = mapped_column(JSON , nullable=False)
    author_id : Mapped[int] = mapped_column(ForeignKey("users.id") , nullable=False)
    acceptance : Mapped[float] = mapped_column(nullable=False , default=0.0)

