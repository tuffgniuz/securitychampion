from fastapi import FastAPI

from src.api.v1.category_router import router as category_router
from src.api.v1.sub_category_router import router as sub_category_router
from src.api.v1.requirement_router import router as requirement_router
from src.api.v1.issue_router import router as issue_router
from src.api.files import router as file_router


def include_routes(app: FastAPI):
    app.include_router(category_router)
    app.include_router(sub_category_router)
    app.include_router(requirement_router)
    app.include_router(issue_router)
    app.include_router(file_router)
