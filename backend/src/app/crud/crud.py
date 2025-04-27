from fastrdb import FastRDB 
from src.app.db.models.question import Question
from src.app.schemas.question import  QuestionCreateInternal, QuestionResponse,  QuestionUpdateInternal
from src.app.db.models.user import User
from src.app.schemas.user import UserCreate, UserResponse, UserUpdate 
from src.app.db.models.answer_submission import AnswerSubmission
from src.app.schemas.answer_submission import AnswerSubmissionCreateInternal, AnswerSubmissionUpdateInternal, AnswerSubmissionResponse


user_crud = FastRDB[User , UserCreate , UserUpdate , UserResponse](
    User , UserResponse , pattern="user:email:{email}" , list_pattern="user:page{page}:limit:{limit}" , invalidate_pattern_prefix="" , exp=60
)

question_crud = FastRDB[Question , QuestionCreateInternal , QuestionUpdateInternal , QuestionResponse](
    Question,
    QuestionResponse,
    pattern="todo" , 
    list_pattern="question:page{page}:limit:{limit}", 
    invalidate_pattern_prefix="todo",
    exp=60)

answer_submission_crud = FastRDB[AnswerSubmission, AnswerSubmissionCreateInternal, AnswerSubmissionUpdateInternal, AnswerSubmissionResponse](
    AnswerSubmission,
    AnswerSubmissionResponse,
    pattern="submission:user:{user_id}",
    list_pattern="submission:user:{user_id}:question:{question_id}",
    invalidate_pattern_prefix="submission:user:{user_id}:question:{question_id}*",
    exp=600,
)
