from datetime import datetime, timezone
from typing import Optional
from sqlmodel import SQLModel, Field

class Vibe(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str = Field(max_length=280)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    likes: int = 0


class VibeCreate(SQLModel):
    content: str


class VibeRead(SQLModel):
    id: int
    content: str
    created_at: datetime
    likes: int


class VibeUpdate(SQLModel):
    content: Optional[str] = None
    likes: Optional[int] = None