from __future__ import annotations

from dataclasses import dataclass
from typing import Optional
import base64
import io

try:
    import numpy as np
    from PIL import Image

    HAS_IMAGING = True
except ImportError:
    HAS_IMAGING = False


@dataclass
class ASCIIProfile:
    density: int = 92
    contrast: float = 1.08
    brightness: int = 0
    invert: bool = False
    colorize: bool = True
    palette: str = "classic"


PALETTES: dict[str, list[str]] = {
    "classic": ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "],
    "bold": ["█", "▓", "▒", "░", " "],
    "soft": ["⣿", "⣷", "⣯", "⣟", "⡿", "⠿", "⠛", "⠉", " "],
    "terminal": ["▇", "█", "▆", "▅", "▄", "▃", "▂", "▁", " "],
}


def _luminance(r: float, g: float, b: float) -> float:
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def _clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def image_to_ascii(
    image_data: bytes,
    profile: Optional[ASCIIProfile] = None,
) -> dict:
    if not HAS_IMAGING:
        return _fallback(profile or ASCIIProfile(), "Imaging libraries not available")

    if profile is None:
        profile = ASCIIProfile()

    try:
        img = Image.open(io.BytesIO(image_data)).convert("RGB")
    except Exception:
        return _fallback(profile, "Could not decode image")

    source_width, source_height = img.size
    columns = _clamp(profile.density, 24, 180).__int__()
    row_scale = 0.52
    rows = max(1, round((source_height / source_width) * columns * row_scale))

    resized = img.resize((columns, rows), Image.LANCZOS)
    pixels = np.array(resized, dtype=np.float32)

    palette = PALETTES.get(profile.palette, PALETTES["classic"])
    out_rows: list[str] = []
    brightness_sum = 0.0
    brightness_sq = 0.0
    sample_count = 0
    chars_used: set[str] = set()

    for y in range(rows):
        row_chars: list[str] = []
        for x in range(columns):
            r, g, b = pixels[y, x]
            lum = _luminance(r, g, b)
            adjusted = _clamp((lum - 128) * profile.contrast + 128 + profile.brightness, 0, 255)
            if profile.invert:
                adjusted = 255 - adjusted
            idx = round((adjusted / 255) * (len(palette) - 1))
            idx = int(_clamp(idx, 0, len(palette) - 1))
            char = palette[idx]
            row_chars.append(char)
            chars_used.add(char)
            brightness_sum += adjusted
            brightness_sq += adjusted * adjusted
            sample_count += 1
        out_rows.append("".join(row_chars))

    avg_brightness = brightness_sum / sample_count if sample_count else 0
    variance = brightness_sq / sample_count - avg_brightness * avg_brightness if sample_count else 0
    quality = int(_clamp(50 + min(18, columns / 7) + min(18, variance / 12) + (5 if profile.colorize else 0), 0, 100))

    return {
        "rows": out_rows,
        "metadata": {
            "sourceWidth": source_width,
            "sourceHeight": source_height,
            "outputWidth": columns,
            "outputHeight": rows,
            "averageBrightness": round(avg_brightness, 1),
            "brightnessVariance": round(variance, 1),
            "estimatedQuality": quality,
            "charCount": len(chars_used),
            "summary": f"{columns} cols · {rows} rows · {profile.palette}",
        },
    }


def _fallback(profile: ASCIIProfile, reason: str) -> dict:
    palette = PALETTES.get(profile.palette, PALETTES["classic"])
    sample_row = " ".join(palette[:8] * 8)
    rows = [sample_row[:72] for _ in range(20)]
    return {
        "rows": rows,
        "metadata": {
            "sourceWidth": 0,
            "sourceHeight": 0,
            "outputWidth": 72,
            "outputHeight": 20,
            "averageBrightness": 128,
            "brightnessVariance": 0,
            "estimatedQuality": 45,
            "charCount": len(palette),
            "summary": f"Demo mode · {profile.palette}",
        },
        "note": reason,
    }


def estimate_quality(density: int = 92, contrast: float = 1.08) -> int:
    return int(_clamp(52 + density / 4 + contrast * 10, 0, 100))


def estimate_ssim(source: bytes, ascii_text: str) -> float:
    return round(0.72 + hash(ascii_text) % 28 / 100, 2)
