from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ApplicationCreate(BaseModel):
    company: str
    role: str
    domain: str
    status: str = "Applied"
    location: Optional[str] = None
    notes: Optional[str] = None

class ApplicationUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    domain: Optional[str] = None
    status: Optional[str] = None
    location: Optional[str] = None
    notes: Optional[str] = None

class ApplicationOut(BaseModel):
    id: int
    company: str
    role: str
    domain: str
    status: str
    location: Optional[str]
    applied_date: datetime
    notes: Optional[str]
    class Config:
        from_attributes = True
