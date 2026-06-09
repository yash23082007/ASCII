from __future__ import annotations


def suggest_settings(average_brightness: float, variance: float) -> dict:
    brightness = round((128 - average_brightness) * 0.22, 2)
    contrast = round(1.0 + variance / 6500, 2)
    density_boost = min(22, max(8, round(variance / 8)))
    density = min(150, max(42, 92 + density_boost))
    return {
        "brightness": max(-28, min(28, brightness)),
        "contrast": max(0.84, min(1.68, contrast)),
        "density": density,
        "autoOptimize": True,
    }


def quality_score(average_brightness: float, variance: float, density: int) -> dict:
    base = 50
    density_score = min(18, density / 7)
    variance_score = min(18, variance / 12)
    brightness_penalty = abs(128 - average_brightness) * 0.04
    score = base + density_score + variance_score - brightness_penalty
    return {
        "score": round(max(0, min(100, score)), 1),
        "factors": {
            "densityContribution": round(density_score, 1),
            "varianceContribution": round(variance_score, 1),
            "brightnessPenalty": round(brightness_penalty, 1),
        },
    }
