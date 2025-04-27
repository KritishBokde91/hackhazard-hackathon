from src.app.db.database import Base
from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column


class AnswerSubmission(Base):
    __tablename__ = "answer_submissions"

    id: Mapped[int] = mapped_column("id", autoincrement=True, nullable=False, unique=True, primary_key=True, init=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    question_id: Mapped[int] = mapped_column(ForeignKey("questions.id"), nullable=False)
    code: Mapped[str] = mapped_column(Text, nullable=False)
    status : Mapped[str] = mapped_column(nullable=False, doc="Status of the answer submission")
    marks_simplicity: Mapped[int] = mapped_column(nullable=False, default=0, doc="Marks for code simplicity")
    marks_output: Mapped[int] = mapped_column(nullable=False, default=0, doc="Marks for output match")
    total_score : Mapped[float] = mapped_column(nullable=False, default=0, doc="Total score")
    marks_responsiveness: Mapped[float] = mapped_column(nullable=False, default=0, doc="Marks for responsiveness")
    date: Mapped[datetime] = mapped_column(DateTime,server_default=func.now(), init=False)

