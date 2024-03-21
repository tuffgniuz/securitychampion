from typing import Sequence
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.dependencies.db import get_async_session
from src.models.issue import Issue
from src.repositories.issue_repository import IssueRepository
from src.services.requirement_service import RequirementService


class IssueService:
    
    def __init__(self, session: AsyncSession = Depends(get_async_session)):
        self.session = session
        self.repository = IssueRepository(self.session)
        self.requirement_service = RequirementService(self.session)

    async def add(self, issue_data: dict) -> Issue:
        issue = Issue(**issue_data)
        issue = self.repository.add(issue)
        await self.session.commit()
        return issue

    async def get_by_id_or_none(self, id: str) -> Issue:
        issue = await self.repository.get(id)

        if not issue:
            raise HTTPException(status_code=404, detail='issue not found')

        return issue

    async def get_all(self) -> Sequence[Issue]:
        return await self.repository.get_all()

    async def update(self, id: str, update_data: dict) -> Issue:
        issue = await self.get_by_id_or_none(id)
        updated_issue = await self.repository.update(issue, update_data)
        await self.session.commit()
        return updated_issue

    async def delete(self, id: str) -> None:
        issue = await self.get_by_id_or_none(id)
        await self.repository.delete(issue)
        await self.session.commit()

    async def add_requirement_to_issue(self, issue_id: str, requirement_id: str) -> Issue:
        issue = await self.get_by_id_or_none(issue_id)
        requirement = await self.requirement_service.get_by_id_or_none(requirement_id)
        
        if requirement not in issue.requirements:
            issue.requirements.append(requirement)
        else:
            raise ValueError(f'Requirement with ID {requirement_id} is already added to this issue')

        await self.session.commit()

        return issue
