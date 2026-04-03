# Job Application Tracker

A full-stack web application to track job applications, built with React, FastAPI, and PostgreSQL.

## Tech Stack

**Frontend:** React, Tailwind CSS, React Router, Axios  
**Backend:** FastAPI (Python), SQLAlchemy, JWT Authentication  
**Database:** PostgreSQL  
**DevOps:** Docker, GitHub Actions CI/CD  

## Features

- User authentication with JWT (register/login)
- Add, edit, delete job applications
- Track status: Applied → OA → Interview → Offer / Rejected
- Dashboard with real-time stats (total, response rate, by domain)
- Filter applications by domain (SE, DA, DE, BIE, BA)

## Running Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create `backend/.env`:
```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/jobtracker
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

## API Docs
Swagger UI available at `http://localhost:8000/docs`

## Tests
```bash
cd backend
pytest tests/ -v
```
