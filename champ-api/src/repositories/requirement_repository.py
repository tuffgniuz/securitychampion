from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models.requirement import Requirement


class RequirementRepository:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get(self, id: str) -> Requirement:
        return await self.session.get(Requirement, id)

    async def get_all(self) -> Sequence[Requirement]:
        stmt = select(Requirement)
        result = await self.session.execute(stmt)
        return result.scalars().all()
