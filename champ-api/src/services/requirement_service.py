from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.dependencies.db import get_async_session
from src.models.requirement import Requirement
from src.repositories.requirement_repository import RequirementRepository


class RequirementService:

    def __init__(self, session: AsyncSession = Depends(get_async_session)):
        self.session = session
        self.repository = RequirementRepository(self.session)

    async def get_by_id_or_none(self, id: str) -> Requirement:
        requirement = await self.repository.get(id)

        if not requirement:
            raise HTTPException(status_code=404, detail='Requirement not found')

        return requirement
