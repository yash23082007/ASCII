from __future__ import annotations

from typing import Any
from datetime import datetime, timezone

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_analytics() -> dict[str, Any]:
    return {
        "total_conversions": 1248,
        "average_latency_ms": 28,
        "favorite_mode": "ascii",
        "favorite_palette": "classic",
        "total_exports": 389,
        "export_breakdown": {
            "txt": 52,
            "html": 28,
            "png": 20,
        },
        "mode_distribution": {
            "ascii": 88,
            "unicode": 72,
            "braille": 61,
            "emoji": 49,
        },
        "quality_averages": {
            "ascii": 91,
            "unicode": 85,
            "braille": 78,
            "emoji": 82,
        },
        "period": {
            "start": "2025-01-01",
            "end": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        },
    }
