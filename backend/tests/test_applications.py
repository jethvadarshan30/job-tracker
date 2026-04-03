import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base, get_db
from main import app

SQLALCHEMY_TEST_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_TEST_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
Base.metadata.create_all(bind=engine)
client = TestClient(app)

def get_token():
    client.post("/auth/register", json={"email": "test@test.com", "password": "testpass"})
    r = client.post("/auth/login", data={"username": "test@test.com", "password": "testpass"})
    return r.json()["access_token"]

def test_create_application():
    token = get_token()
    r = client.post("/applications/", json={
        "company": "Google", "role": "SWE", "domain": "SE", "status": "Applied"
    }, headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert r.json()["company"] == "Google"

def test_get_applications():
    token = get_token()
    r = client.get("/applications/", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert isinstance(r.json(), list)

def test_get_stats():
    token = get_token()
    r = client.get("/applications/stats", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert "total" in r.json()

def test_delete_nonexistent():
    token = get_token()
    r = client.delete("/applications/9999", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 404
