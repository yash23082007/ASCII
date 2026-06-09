from typing import Any

from fastapi import APIRouter

router = APIRouter()


@router.post("/login")
def login(payload: dict[str, Any] | None = None) -> dict[str, Any]:
    return {
        "status": "ok",
        "token": "demo-token",
        "user": payload or {"email": "demo@ascii.vision"},
    }


@router.post("/register")
def register(payload: dict[str, Any] | None = None) -> dict[str, Any]:
    return {
        "status": "ok",
        "user": payload or {"email": "new@ascii.vision"},
    }
