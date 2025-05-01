import os
from starlette.middleware.sessions import SessionMiddleware 
from starlette.middleware.cors import CORSMiddleware

from src.app.api import router
from src.app.core.config import settings
from src.app.core.setup import create_application
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = create_application(router=router, settings=settings)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://back-hack.codeltix.com" , "http://127.0.0.1:3000" , "https://codinggeek.codeltix.com" , "http://127.0.0.1:4000" , "https://codeltix.com" , "http://127.0.0.1:5000" , "http://127.0.0.1:8000"],
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

