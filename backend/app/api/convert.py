from __future__ import annotations

from typing import Any, Optional
from uuid import uuid4
import time

from fastapi import APIRouter, HTTPException, UploadFile, File, Form

from ..services.ascii_service import image_to_ascii, ASCIIProfile, estimate_quality
from ..services.media_service import describe_media, sample_stats
from ..services.ml_service import suggest_settings, quality_score

router = APIRouter()


@router.post("/")
async def create_conversion(
    file: Optional[UploadFile] = File(None),
    mode: str = Form("ascii"),
    palette: str = Form("classic"),
    density: int = Form(92),
    brightness: int = Form(0),
    contrast: float = Form(1.08),
    invert: bool = Form(False),
    colorize: bool = Form(True),
    auto_optimize: bool = Form(True),
) -> dict[str, Any]:
    t0 = time.perf_counter()

    profile = ASCIIProfile(
        density=density,
        contrast=contrast,
        brightness=brightness,
        invert=invert,
        colorize=colorize,
        palette=palette,
    )

    if auto_optimize and file:
        try:
            data = await file.read()
            stats = sample_stats(data)
            suggestions = suggest_settings(stats["averageBrightness"], stats["variance"])
            profile.density = int(suggestions["density"])
            profile.brightness = round(suggestions["brightness"])
            profile.contrast = suggestions["contrast"]
        except Exception:
            pass
        await file.seek(0)

    if file:
        try:
            data = await file.read()
            result = image_to_ascii(data, profile)
        except Exception as exc:
            raise HTTPException(status_code=422, detail=str(exc))
    else:
        result = image_to_ascii(b"", profile)

    elapsed = round((time.perf_counter() - t0) * 1000, 1)
    metadata = result["metadata"]

    return {
        "status": "completed",
        "job_id": f"convert_{uuid4().hex[:8]}",
        "mode": mode,
        "palette": palette,
        "rows": result["rows"],
        "metadata": {
            **metadata,
            "elapsedMs": elapsed,
            "quality": estimate_quality(density, contrast),
        },
    }


@router.get("/quality")
async def get_quality_score(
    density: int = 92,
    contrast: float = 1.08,
) -> dict[str, Any]:
    score = estimate_quality(density, contrast)
    return {
        "score": score,
        "grade": "A" if score >= 85 else "B" if score >= 70 else "C" if score >= 50 else "D",
    }


@router.post("/preview")
async def preview_conversion(
    file: UploadFile = File(...),
) -> dict[str, Any]:
    data = await file.read()
    stats = sample_stats(data)
    return {
        "source": {
            "name": file.filename,
            "size": len(data),
            "type": file.content_type,
        },
        "stats": stats,
    }
