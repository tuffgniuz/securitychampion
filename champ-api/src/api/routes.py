from fastapi import FastAPI

from src.api.v1.category_router import router as category_router
from src.api.v1.sub_category_router import router as sub_category_router
from src.api.v1.requirement_router import router as requirement_router
from src.api.v1.issue_router import router as issue_router
from src.core.auth.auth_backend import auth_backend
from src.core.auth.user_manager import fastapi_users, SECRET
from src.core.auth.oauth_clients import (
    google_oauth_client,
    github_oauth_client,
    linkedin_oauth_client
)


def include_routes(app: FastAPI):
    app.include_router(category_router)
    app.include_router(sub_category_router)
    app.include_router(requirement_router)
    app.include_router(issue_router)

    # oauth auth routes
    app.include_router(
        fastapi_users.get_oauth_router(google_oauth_client, auth_backend, SECRET),
        prefix='/auth/google',
        tags=['auth']
    )
    app.include_router(
        fastapi_users.get_oauth_router(github_oauth_client, auth_backend, SECRET),
        prefix='/auth/github',
        tags=['auth']
    )
    app.include_router(
        fastapi_users.get_oauth_router(linkedin_oauth_client, auth_backend, SECRET),
        prefix='/auth/linked',
        tags=['auth']
    )
