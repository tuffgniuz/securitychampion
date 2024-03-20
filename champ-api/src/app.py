from fastapi import FastAPI

from src.api.routes import include_routes
from src.core.security.cors import cors_middleware


app = FastAPI()

include_routes(app)
cors_middleware(app)
