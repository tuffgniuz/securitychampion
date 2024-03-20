from typing import Sequence
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.dependencies.db import get_async_session
from src.models.sub_category import SubCategory
from src.repositories.sub_category_repository import SubCategoryRepository


class SubCategoryService:

    def __init__(self, session: AsyncSession = Depends(get_async_session)):
        self.session = session
        self.repository = SubCategoryRepository(self.session)

    async def get_by_id_with_requirements_or_none(self, id: str) -> Sequence[SubCategory]:
        sub_category = await self.repository.get_by_id_with_requirements(id)

        if not sub_category:
            raise ValueError('Sub category not found')

        return sub_category
