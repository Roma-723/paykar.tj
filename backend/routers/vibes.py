from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models import Vibe, VibeCreate, VibeRead
from database import get_session

router = APIRouter(prefix="/api/vibes", tags=["vibes"])

@router.get("", response_model=list[VibeRead])
def get_vibes(session: Session = Depends(get_session)):
    statement = select(Vibe).order_by(Vibe.created_at.desc())
    vibes = session.exec(statement).all()
    return vibes

@router.post("", response_model=VibeRead)
def create_vibe(vibe: VibeCreate, session: Session = Depends(get_session)):
    db_vibe = Vibe.from_orm(vibe)
    session.add(db_vibe)
    session.commit()
    session.refresh(db_vibe)
    return db_vibe

@router.patch("/{vibe_id}/like", response_model=VibeRead)
def like_vibe(vibe_id: int, session: Session = Depends(get_session)):
    vibe = session.get(Vibe, vibe_id)
    if not vibe:
        raise HTTPException(status_code=404, detail="Vibe not found")
    vibe.likes += 1
    session.add(vibe)
    session.commit()
    session.refresh(vibe)
    return vibe
