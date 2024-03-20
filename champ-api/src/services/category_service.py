from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.dependencies.db import get_async_session
from src.models.category import Category
from src.repositories.category_repository import CategoryRepository


class CategoryService:

    def __init__(self, session: AsyncSession = Depends(get_async_session)):
        self.session = session
        self.repository = CategoryRepository(session)

    async def get_by_id_or_none(self, id: str) -> Category:
        category = await self.repository.get(id)

        if not category:
            raise ValueError('Category not found')

        return category

    async def get_all(self) -> Sequence[Category]:
        return await self.repository.get_all()

    async def get_all_with_sub_categories(self) -> Sequence[Category]:
        return await self.repository.get_all_with_sub_categories()

    async def get_all_with_requirements(self) -> Sequence[Category]:
        return await self.repository.get_all_with_requirements()
