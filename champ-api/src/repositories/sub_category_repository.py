from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.models.sub_category import SubCategory


class SubCategoryRepository:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id_with_requirements(self, id: str) -> SubCategory:
        stmt = select(SubCategory).where(
            SubCategory.id == id).options(
            joinedload(SubCategory.requirements)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()
