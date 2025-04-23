from src.app.db.database import Base
from sqlalchemy.orm import Mapped , mapped_column
from sqlalchemy_utils import URLType # type: ignore
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column("id", autoincrement=True, nullable=False, unique=True, primary_key=True, init=False)
    name: Mapped[str] = mapped_column(nullable=False)
    profile : Mapped[str | None] = mapped_column(URLType, nullable=True)
    email: Mapped[str] = mapped_column(nullable=False , unique=True)
    is_superuser : Mapped[bool] = mapped_column(nullable=False , default=False)
