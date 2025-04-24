from starlette.middleware.sessions import SessionMiddleware 
from starlette.middleware.cors import CORSMiddleware

from src.app.api import router
from src.app.core.config import settings
from src.app.core.setup import create_application

app = create_application(router=router, settings=settings)
from starlette.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY,
)
