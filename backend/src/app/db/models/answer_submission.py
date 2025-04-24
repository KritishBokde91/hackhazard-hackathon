from src.app.db.database import Base
from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column


class AnswerSubmission(Base):
    __tablename__ = "answer_submissions"

    id: Mapped[int] = mapped_column("id", autoincrement=True, nullable=False, unique=True, primary_key=True, init=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    question_id: Mapped[int] = mapped_column(ForeignKey("questions.id"), nullable=False)
    code: Mapped[str] = mapped_column(Text, nullable=False)
    marks_simplicity: Mapped[int] = mapped_column(nullable=False, default=0, doc="Marks for code simplicity")
    marks_output: Mapped[int] = mapped_column(nullable=False, default=0, doc="Marks for output match")
    marks_responsiveness: Mapped[int] = mapped_column(nullable=False, default=0, doc="Marks for responsiveness")

