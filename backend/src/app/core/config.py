from enum import Enum
from pathlib import Path
from starlette.config import Config
from pydantic_settings import BaseSettings

config = Config('.env')


class AppSettings(BaseSettings):
    APP_NAME: str = config("APP_NAME", default="FastAPI app")
    APP_DESCRIPTION: str | None = config("APP_DESCRIPTION", default=None)
    APP_VERSION: str | None = config("APP_VERSION", default=None)
    LICENSE_NAME: str | None = config("LICENSE", default="MIT")
    CONTACT_NAME: str | None = config("CONTACT_NAME", default=None)
    CONTACT_EMAIL: str | None = config("CONTACT_EMAIL", default=None)
    
class CryptSettings(BaseSettings):
    SECRET_KEY: str = config("SECRET_KEY")
    ALGORITHM: str = config("ALGORITHM", default="HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = config("ACCESS_TOKEN_EXPIRE_MINUTES",cast=int, default=30)
    REFRESH_TOKEN_EXPIRE_DAYS: int = config("REFRESH_TOKEN_EXPIRE_DAYS", cast=int, default=7)


class PostgresSettings(BaseSettings):
    POSTGRES_USER: str = config("POSTGRES_USER" , default="postgres")
    POSTGRES_PASSWORD: str = config("POSTGRES_PASSWORD" , default="")
    POSTGRES_SERVER: str = config("POSTGRES_SERVER", default="db")
    POSTGRES_PORT: str = config("POSTGRES_PORT", default="5432")
    POSTGRES_DB: str = config("POSTGRES_DB" , default="hackathon")
    POSTGRES_DATABASE_URI: str = config("DATABASE_URI", default=f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}/{POSTGRES_DB}")
    POSTGRES_SYNC_DATABASE_URI: str = config("SYNC_DATABASE_URI", default=f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}/{POSTGRES_DB}")

class SQLiteSettings(BaseSettings):
    SQLITE_URI: str = config("SQLITE_URI", default="./sql_app.db")
    SQLITE_SYNC_PREFIX: str = config("SQLITE_SYNC_PREFIX", default="sqlite:///")
    SQLITE_ASYNC_PREFIX: str = config("SQLITE_ASYNC_PREFIX", default="sqlite+aiosqlite:///")

class RedisSettings(BaseSettings):
    REDIS_HOST : str = config("REDIS_HOST" , cast=str , default="localhost")
    REDIS_PORT : int= config("REDIS_PORT" , cast=int , default=6379)
    REDIS_DECODE_RESPONSES : bool = config("REDIS_DECODE_RESPONSES" , cast=bool , default=True)
    REDIS_DB : int = config("REDIS_DB" , cast=int , default=1)


class EnvironmentOption(Enum):
    LOCAL = "local"
    STAGING = "staging"
    PRODUCTION = "production"

class EnvironmentSettings(BaseSettings):
    ENVIRONMENT: EnvironmentOption = config("ENVIRONMENT", default=EnvironmentOption.LOCAL, cast=EnvironmentOption)

class PublicSettings(BaseSettings):
    BASE_DIR: Path = Path(config("BASE_DIR", default=Path(__file__).resolve().parent.parent))
    STATIC_DIR: Path = Path(config("STATIC_DIR", default=BASE_DIR / "static"))
    IMAGES_DIR: Path = Path(config("IMAGES_DIR", default=STATIC_DIR / "images"))
    IMAGES_URL_PREFIX: str = config("IMAGES_URL_PREFIX", default="/static/images/")
class Settings(AppSettings , CryptSettings , PostgresSettings , SQLiteSettings , RedisSettings , EnvironmentSettings , PublicSettings):
    pass

settings = Settings()
