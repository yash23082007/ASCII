from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    project_name: str = "ASCII Vision Studio AI"
    api_prefix: str = "/api"
    cors_origin: str = "*"


settings = Settings()
