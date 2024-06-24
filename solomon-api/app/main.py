from app.api.v1.category_router import router as category_router
from fastapi import FastAPI

app = FastAPI()

app.include_router(router=category_router)
