from typing import Any

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def list_projects() -> dict[str, Any]:
    return {
        "items": [
            {
                "id": "project_001",
                "name": "Neon portrait",
                "format": "ascii",
            },
            {
                "id": "project_002",
                "name": "Braille skyline",
                "format": "braille",
            },
        ]
    }
