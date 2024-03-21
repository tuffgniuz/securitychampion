from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.models.issue import Issue


class IssueRepository:
    """
    Repository class for performing database operations related to the issue model.
    
    Provides methods to add, retrieve, update, and delete issue instances, 
    incorporating efficient data access patterns like eager loading of related requirements.
    """

    def __init__(self, session: AsyncSession):
        """
        Initializes the issueRepository with an asynchronous database session.
        
        :param session: An instance of AsyncSession for database operations.
        """
        self.session = session

    def add(self, issue: Issue) -> Issue:
        """
        Adds a new issue instance to the database.
        
        :param issue: The Issue instance to add.
        :return: The added issue instance.
        """
        self.session.add(issue)
        return issue

    async def get(self, id: str) -> Issue:
        """
        Retrieves a single issue by its ID, including all associated requirements.
        
        :param id: The ID of the issue to retrieve.
        :return: The requested issue instance, or None if not found.
        """
        stmt = select(Issue).where(Issue.id == id).options(joinedload(Issue.requirements))
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_all(self) -> Sequence[Issue]:
        """
        Retrieves all issue instances from the database, including their associated requirements.
        
        :return: A sequence of all issue instances.
        """
        stmt = await self.session.execute(select(Issue).options(joinedload(Issue.requirements)))
        return stmt.scalars().all()

    async def update(self, issue: Issue, update_data: dict) -> Issue:
        """
        Updates an existing issue instance with provided data.
        
        :param issue: The Issue instance to update.
        :param update_data: A dictionary containing the fields to update and their new values.
        :return: The updated issue instance.
        """
        for key, value in update_data.items():
            setattr(issue, key, value)
        return issue

    async def delete(self, issue: Issue) -> None:
        """
        Deletes a given issue instance from the database.
        
        :param issue: The Issue instance to delete.
        """
        await self.session.delete(issue)
