from src.app.api.v1.oauth import router as oauth_router
from src.app.api.v1.user import router as user_router
from src.app.api.v1.question import router as question_router
from src.app.api.v1.answer_submission import router as answer_submission_router
from fastapi.routing import APIRouter

router = APIRouter(prefix="/v1")
router.include_router(oauth_router)
router.include_router(user_router)
router.include_router(question_router)
router.include_router(answer_submission_router)
