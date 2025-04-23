from src.app.api.v1 import router as v1_router
from fastapi.routing import APIRouter

router = APIRouter(prefix="/api")
router.include_router(v1_router)
