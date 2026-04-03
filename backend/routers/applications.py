from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Application, User
from schemas import ApplicationCreate, ApplicationUpdate, ApplicationOut
from routers.auth import get_current_user

router = APIRouter(prefix="/applications", tags=["applications"])

@router.get("/stats")
def get_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    apps = db.query(Application).filter(Application.user_id == current_user.id).all()
    total = len(apps)
    by_status, by_domain = {}, {}
    for a in apps:
        by_status[a.status] = by_status.get(a.status, 0) + 1
        by_domain[a.domain] = by_domain.get(a.domain, 0) + 1
    responded = sum(v for k, v in by_status.items() if k not in ["Applied", "Ghosted"])
    return {
        "total": total,
        "by_status": by_status,
        "by_domain": by_domain,
        "response_rate": round(responded / total * 100, 1) if total else 0
    }

@router.get("/", response_model=List[ApplicationOut])
def get_applications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Application).filter(Application.user_id == current_user.id).all()

@router.post("/", response_model=ApplicationOut)
def create_application(app: ApplicationCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_app = Application(**app.dict(), user_id=current_user.id)
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app

@router.put("/{app_id}", response_model=ApplicationOut)
def update_application(app_id: int, update: ApplicationUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    app = db.query(Application).filter(Application.id == app_id, Application.user_id == current_user.id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in update.dict(exclude_unset=True).items():
        setattr(app, key, value)
    db.commit()
    db.refresh(app)
    return app

@router.delete("/{app_id}")
def delete_application(app_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    app = db.query(Application).filter(Application.id == app_id, Application.user_id == current_user.id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(app)
    db.commit()
    return {"message": "Deleted"}
