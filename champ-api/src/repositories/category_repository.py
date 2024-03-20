from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.models.category import Category


class CategoryRepository:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get(self, id: str) -> Category:
        return await self.session.get(Category, id)

    async def get_all(self) -> Sequence[Category]:
        stmt = select(Category)
        result = await self.session.execute(stmt) 
        return result.scalars().all()
    
    async def get_all_with_sub_categories(self) -> Sequence[Category]:
        stmt = select(Category).options(joinedload(Category.sub_categories))
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def get_all_with_requirements(self) -> Sequence[Category]:
        stmt = select(Category).options(joinedload(Category.requirements))
        result = await self.session.execute(stmt)
        return result.scalars().all()
