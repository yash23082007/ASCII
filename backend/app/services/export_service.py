from __future__ import annotations

from typing import Optional


def build_export_payload(
    format_name: str,
    project_id: str,
    content: Optional[str] = None,
) -> dict:
    return {
        "format": format_name,
        "project_id": project_id,
        "status": "ready",
        "content_type": _mime_for(format_name),
        "size_bytes": len(content or ""),
    }


def _mime_for(fmt: str) -> str:
    return {
        "txt": "text/plain",
        "html": "text/html",
        "png": "image/png",
        "pdf": "application/pdf",
        "gif": "image/gif",
    }.get(fmt, "application/octet-stream")
