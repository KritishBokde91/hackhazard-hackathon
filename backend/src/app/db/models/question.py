from typing import Literal

from sqlalchemy import ForeignKey
from src.app.db.database import Base
from sqlalchemy.orm import Mapped , mapped_column

class Question(Base):
    __tablename__ = "questions"
    id : Mapped[int] = mapped_column("id", autoincrement=True, nullable=False, unique=True, primary_key=True, init=False)
    content : Mapped[str] = mapped_column(nullable=False)
    image : Mapped[str | None] = mapped_column(nullable=True)
    difficulty : Mapped[Literal["easy" , "medium" , "hard"]] = mapped_column(nullable=False)
    author_id : Mapped[int] = mapped_column(ForeignKey("users.id") , nullable=False) 
