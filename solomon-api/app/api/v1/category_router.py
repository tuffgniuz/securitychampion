from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies.db import get_async_session
from app.schemas.category import ReadCategorySchema
from app.services.category_service import CategoryService

router = APIRouter(tags=["categories"])


@router.get("/categories")
async def read_categories_with_relations(
    session: AsyncSession = Depends(get_async_session),
):
    category_service = CategoryService(session)
    return await category_service.get_all_with_relations()
