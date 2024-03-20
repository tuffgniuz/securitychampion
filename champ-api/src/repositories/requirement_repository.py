from sqlalchemy.ext.asyncio import AsyncSession

from src.models.requirement import Requirement


class RequirementRepository:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get(self, id: str) -> Requirement:
        return await self.session.get(Requirement, id)
