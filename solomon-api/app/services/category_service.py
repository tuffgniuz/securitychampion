from typing import Sequence

from app.models.category import Category
from app.repositories.category_repository import CategoryRepository
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession


class CategoryService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all_with_relations(self) -> Sequence[Category]:
        return await CategoryRepository.get_all_with_relations(self.session)
