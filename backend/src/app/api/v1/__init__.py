from src.app.api.v1.oauth import router as oauth_router
from fastapi.routing import APIRouter

router = APIRouter(prefix="/v1")
router.include_router(oauth_router)
