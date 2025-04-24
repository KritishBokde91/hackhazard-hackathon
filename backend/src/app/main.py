import os
from starlette.middleware.sessions import SessionMiddleware 
from starlette.middleware.cors import CORSMiddleware

from src.app.api import router
from src.app.core.config import settings
from src.app.core.setup import create_application

app = create_application(router=router, settings=settings)
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
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

if not os.path.exists(settings.STATIC_DIR):
    os.makedirs(settings.STATIC_DIR)
    os.makedirs(settings.IMAGES_DIR)

app.mount("/static" , StaticFiles(directory=settings.STATIC_DIR) , name="static")

