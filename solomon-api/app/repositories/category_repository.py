from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.category import Category
from app.models.sub_category import SubCategory


class CategoryRepository:

    @staticmethod
    async def get_all_with_relations(session: AsyncSession) -> Sequence[Category]:
        query = select(Category).options(
            selectinload(Category.sub_categories).selectinload(SubCategory.requirements)
        )
        result = await session.execute(query)
        return result.scalars().all()
