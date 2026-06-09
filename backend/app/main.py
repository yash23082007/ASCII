from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import analytics, auth, convert, export, projects, upload

app = FastAPI(title="ASCII Vision Studio AI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(upload.router, prefix="/upload", tags=["upload"])
app.include_router(convert.router, prefix="/convert", tags=["convert"])
app.include_router(export.router, prefix="/export", tags=["export"])
app.include_router(projects.router, prefix="/projects", tags=["projects"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])


@app.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "ascii-vision-studio-ai",
    }
