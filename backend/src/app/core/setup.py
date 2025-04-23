import fastapi
from fastapi.openapi.docs import get_swagger_ui_html , get_redoc_html
from fastapi.openapi.utils import get_openapi
from collections.abc import AsyncGenerator
from typing import Any
from fastapi import APIRouter, FastAPI
from contextlib import  asynccontextmanager
from httpx import AsyncClient
from .config import Settings , EnvironmentOption 
from src.app.db.database import Base , async_engine as engine
from redis.asyncio import Redis

async def create_tables() -> None:
    """
    Create tables in the database using the metadata from the
    Base sqlalchemy class. This function is meant to be used
    as a startup event handler for the FastAPI application.
    """
    async with engine.begin() as conn:
        print("Creating tables")
        await conn.run_sync(Base.metadata.create_all)
        
def lifespan_factory(settings : Settings ,create_tables_on_startup : bool = True ):
    """
    Factory function for creating a lifespan context manager for a FastAPI application.

    This function sets up necessary resources such as an HTTP client, Redis client, 
    and Cloudinary configuration upon application startup. Optionally, it can also 
    create database tables if specified. It ensures proper cleanup and resource 
    shutdown when the application stops.

    Args:
        settings (Settings): Configuration settings for the application.
        create_tables_on_startup (bool): Flag to determine if database tables should 
                                         be created on startup. Defaults to True.

    Returns:
        Callable[..., AsyncGenerator[None, None]]: An async context manager function 
                                                   for application lifespan management.
    """

    @asynccontextmanager
    async def lifespan(app: FastAPI) -> AsyncGenerator[None , None]:
        """
        Lifespan context manager for FastAPI application.

        This context manager is responsible for setting up and tearing down resources such as
        an HTTP client, Redis client, and Cloudinary configuration. Optionally, it can also 
        create database tables if specified.

        Args:
            app (FastAPI): The FastAPI application instance.

        Yields:
            None: This context manager doesn't yield anything.

        Notes:
            This context manager should be used as a startup event handler for the FastAPI application.
        """
        try:
            app.state.httpx_client = AsyncClient(timeout=60)
            app.state.redis = Redis(host=settings.REDIS_HOST , port=settings.REDIS_PORT , db=settings.REDIS_DB , decode_responses=settings.REDIS_DECODE_RESPONSES)
            await app.state.redis.ping() #type:ignore
            if create_tables_on_startup:
                await create_tables() 
            yield
        finally:
            await app.state.httpx_client.aclose()
            await app.state.redis.close()

        print("Application is shutting down")

    return lifespan


def create_application(router : APIRouter , settings : Settings , create_tables_on_startup : bool = True , **kwargs: Any) -> FastAPI:
    """
    Factory function for creating a FastAPI application with necessary resources and configurations.

    This function takes an APIRouter instance for the application routes and an instance of the Settings class
    containing application configuration settings. It sets up an HTTP client, a Redis client, and Cloudinary
    configuration. Optionally, it can create database tables if specified.

    The function returns a configured FastAPI application instance with the specified routes and resources.

    Args:
        router (APIRouter): An APIRouter instance for the application routes.
        settings (Settings): An instance of the Settings class containing application configuration settings.
        create_tables_on_startup (bool): Flag to determine if database tables should be created on startup.
                                          Defaults to True.

    Returns:
        FastAPI: A configured FastAPI application instance with the specified routes and resources.
    """
    to_update : dict[str , Any] = {
            "title": settings.APP_NAME,
            "description": settings.APP_DESCRIPTION,
            "contact": {"name": settings.CONTACT_NAME, "email": settings.CONTACT_EMAIL},
            "license_info": {"name": settings.LICENSE_NAME},
        }
    kwargs.update(to_update)
    kwargs.update({"docs_url": None, "redoc_url": None, "openapi_url": None})

    life_span = lifespan_factory(settings, create_tables_on_startup)


    application = FastAPI(lifespan=life_span , **kwargs)
    application.include_router(router)
    
    if settings.ENVIRONMENT != EnvironmentOption.PRODUCTION:
        docs_router = APIRouter()
        @docs_router.get("/docs", include_in_schema=False)
        async def get_swagger_documentation() -> fastapi.responses.HTMLResponse: #type:ignore
            """
            Return the Swagger UI documentation for the application.

            This endpoint is used when the application is running in a development environment.
            It returns the Swagger UI documentation for the application, which is a human-readable
            representation of the application's API endpoints.

            Returns:
                fastapi.responses.HTMLResponse: The HTML response containing the Swagger UI documentation.
            """
            return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")
        @docs_router.get("/redoc", include_in_schema=False)
        async def get_redoc_documentation() -> fastapi.responses.HTMLResponse: #type: ignore
            return get_redoc_html(openapi_url="/openapi.json", title="docs")

        @docs_router.get("/openapi.json", include_in_schema=False)
        async def openapi() -> dict[str, Any]: #type: ignore
            out: dict[str, Any] = get_openapi(title=application.title, version=application.version, routes=application.routes)
            return out
            
        application.include_router(docs_router)


    return application
