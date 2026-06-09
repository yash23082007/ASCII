from __future__ import annotations

from typing import Any, Optional
from uuid import uuid4

from fastapi import APIRouter, UploadFile, File

from ..services.media_service import describe_media

router = APIRouter()


@router.post("/")
async def upload_media(file: Optional[UploadFile] = File(None)) -> dict[str, Any]:
    data = None
    if file:
        data = await file.read()

    description = describe_media(
        filename=file.filename if file else "unknown",
        mime_type=file.content_type if file else "application/octet-stream",
        data=data,
    )

    return {
        "status": "accepted",
        "upload_id": f"upload_{uuid4().hex[:8]}",
        "file": description,
    }
