# CodingGeeks Backend

The backend API for the Coding Geeks platform, built with FastAPI and PostgreSQL.

## Features

- RESTful API with FastAPI
- PostgreSQL database with SQLAlchemy ORM
- Redis for caching and session management
- JWT authentication with Google OAuth
- Real-time code evaluation
- File upload and management with Cloudinary
- CORS support for cross-origin requests

## Tech Stack

- FastAPI
- PostgreSQL
- Redis
- SQLAlchemy
- JWT Authentication
- Google OAuth
- Cloudinary
- Docker

## Project Structure

```
backend/
├── src/
│   ├── app/
│   │   ├── api/          # API routes and endpoints
│   │   ├── core/         # Core functionality and configuration
│   │   ├── crud/         # Database operations
│   │   ├── db/           # Database models and connection
│   │   └── schemas/      # Pydantic models
│   └── main.py           # Application entry point
├── requirements.txt      # Python dependencies
└── Dockerfile           # Docker configuration
```

## Getting Started

### Prerequisites
- Python 3.11+
- PostgreSQL
- Redis
- Docker (optional)

### Installation

1. Create and activate virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .local.env.example .local.env
```

4. Start the development server:
```bash
uvicorn src.app.main:app --reload
```

## Development

### Database Setup

1. Create PostgreSQL database:
```bash
createdb hackathon
```

2. Run migrations:
```bash
alembic upgrade head
```

### API Documentation

Access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Authentication

The API uses JWT tokens for authentication:
1. Login with Google OAuth
2. Receive access and refresh tokens
3. Use access token in Authorization header
4. Refresh token when access token expires

### Environment Variables

Required environment variables:
```
DATABASE_URL=postgresql+asyncpg://user:password@localhost/hackathon
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## API Endpoints

### Authentication
- `POST /api/v1/login/google` - Google OAuth login
- `POST /api/v1/logout` - Logout
- `POST /api/v1/token` - Get new access token

### Users
- `GET /api/v1/user/me` - Get current user
- `PATCH /api/v1/user/me` - Update user profile

### Questions
- `GET /api/v1/questions` - Get all questions
- `GET /api/v1/question/{id}` - Get question by ID
- `POST /api/v1/submissions/{question_id}` - Submit code

## Docker Deployment

1. Build the Docker image:
```bash
docker build -t coding-geeks-backend .
```

2. Run the container:
```bash
docker run -p 8000:8000 coding-geeks-backend
```

Or use docker-compose:
```bash
docker-compose up -d
```

## Testing

Run tests with pytest:
```bash
pytest
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 