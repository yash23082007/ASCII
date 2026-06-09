from __future__ import annotations

from typing import Any, Optional
from uuid import uuid4

from fastapi import APIRouter, HTTPException, UploadFile, File, Form

from ..services.ascii_service import image_to_ascii, ASCIIProfile
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

    return {
        "status": "completed",
        "job_id": f"convert_{uuid4().hex[:8]}",
        "mode": mode,
        "palette": palette,
        "rows": result["rows"],
        "metadata": result["metadata"],
    }
