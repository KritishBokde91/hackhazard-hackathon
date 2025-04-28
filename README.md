# CodingGeek
<img style="width: 100%" src="https://github.com/KritishBokde91/hackhazard-hackathon/blob/main/assets/codinggeek.png" alt="CodingGeek Homepage">


A full-stack web application for practicing frontend development challenges with AI-powered feedback.

## Project Overview

This project consists of a Next.js frontend and a FastAPI backend, providing a platform for users to:
- Practice frontend development challenges
- Receive AI-powered feedback on their solutions
- Track their progress and achievements
- Connect with other developers

## Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Zustand for state management
- Axios for API calls
- NextAuth.js for authentication

### Backend
- FastAPI
- PostgreSQL
- Redis
- SQLAlchemy
- JWT Authentication
- Google OAuth

## Project Structure

```
.
├── frontend-nextjs/     # Next.js frontend application
├── backend/            # FastAPI backend application
├── docker-compose.yml  # Docker configuration
└── deploy.sh          # Deployment script
```

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- Python 3.11+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KritishBokde91/hackhazard-hackathon.git
cd coding-geeks
```

2. Set up environment variables:
```bash
cp backend/.local.env.example backend/.local.env
```

3. Start the development environment:
```bash
docker-compose up -d
```

4. Access the applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Development

### Frontend Development
```bash
cd frontend-nextjs
npm install
npm run dev
```

### Backend Development
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.app.main:app --reload
```

## Deployment

1. Build and deploy using Docker:
```bash
./deploy.sh
```

2. Or deploy manually:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
