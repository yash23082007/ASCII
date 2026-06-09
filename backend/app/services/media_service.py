from __future__ import annotations

from typing import Optional
import io

try:
    from PIL import Image
    import numpy as np

    HAS_PIL = True
except ImportError:
    HAS_PIL = False


def describe_media(filename: str, mime_type: str, data: Optional[bytes] = None) -> dict:
    result: dict = {
        "filename": filename,
        "mime_type": mime_type,
        "status": "accepted",
    }

    if not HAS_PIL or not data:
        result["dimensions"] = {"width": 0, "height": 0}
        return result

    try:
        img = Image.open(io.BytesIO(data))
        result["dimensions"] = {"width": img.width, "height": img.height}
        result["mode"] = img.mode
        result["format"] = img.format or mime_type
    except Exception:
        result["dimensions"] = {"width": 0, "height": 0}

    return result


def extract_frame(data: bytes, timestamp_ms: float = 0) -> Optional[bytes]:
    if not HAS_PIL:
        return None
    try:
        img = Image.open(io.BytesIO(data))
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        return buf.getvalue()
    except Exception:
        return None


def sample_stats(data: bytes) -> dict:
    if not HAS_PIL:
        return {"averageBrightness": 128, "variance": 0, "contrastSpan": 128}

    try:
        img = Image.open(io.BytesIO(data)).convert("L")
        arr = np.array(img, dtype=np.float32)
        avg = float(np.mean(arr))
        var = float(np.var(arr))
        return {
            "averageBrightness": round(avg, 1),
            "variance": round(var, 1),
            "contrastSpan": round(float(arr.max() - arr.min()), 1),
        }
    except Exception:
        return {"averageBrightness": 128, "variance": 0, "contrastSpan": 128}
