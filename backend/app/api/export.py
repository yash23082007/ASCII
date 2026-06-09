from typing import Any

from fastapi import APIRouter

router = APIRouter()


@router.post("/")
def export_render(payload: dict[str, Any] | None = None) -> dict[str, Any]:
    return {
        "status": "ready",
        "export_id": "export_demo_001",
        "format": (payload or {}).get("format", "txt"),
    }
