from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine  , async_sessionmaker
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass


from src.app.core.config import settings


class Base(MappedAsDataclass, DeclarativeBase):
    pass
# DATABASE_URI = settings.SQLITE_URI
# DATABASE_PREFEX = settings.SQLITE_ASYNC_PREFIX
# DATABASE_URL = f"{DATABASE_PREFEX}{DATABASE_URI}"


DATABASE_URL = settings.POSTGRES_DATABASE_URI
async_engine = create_async_engine(DATABASE_URL , echo = True)

local_session = async_sessionmaker(async_engine, expire_on_commit=False , class_=AsyncSession , autoflush=False , autocommit=False)

async def async_get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Provide a database session for dependency injection.

    This function creates an asynchronous database session using the local_session
    factory. It ensures that the session is properly committed and closed after use.

    Yields:
        AsyncSession: The active database session.
    """
    async with local_session() as session:
        try:
            await session.commit()
            yield session
        finally:
            await session.close()
