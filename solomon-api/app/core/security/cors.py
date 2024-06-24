from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config.settings import cors_settings


def allowed_origins(app: FastAPI):
    origins = [cors_settings.ALLOW_ORIGINS]
    print(f"ALLOW_ORIGINS: {cors_settings.ALLOW_ORIGINS}")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
