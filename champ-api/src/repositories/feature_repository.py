from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.models.feature import Feature

class FeatureRepository:
    """
    Repository class for performing database operations related to the Feature model.
    
    Provides methods to add, retrieve, update, and delete Feature instances, 
    incorporating efficient data access patterns like eager loading of related requirements.
    """

    def __init__(self, session: AsyncSession):
        """
        Initializes the FeatureRepository with an asynchronous database session.
        
        :param session: An instance of AsyncSession for database operations.
        """
        self.session = session

    def add(self, feature: Feature) -> Feature:
        """
        Adds a new Feature instance to the database.
        
        :param feature: The Feature instance to add.
        :return: The added Feature instance.
        """
        self.session.add(feature)
        return feature

    async def get(self, id: str) -> Feature:
        """
        Retrieves a single Feature by its ID, including all associated requirements.
        
        :param id: The ID of the Feature to retrieve.
        :return: The requested Feature instance, or None if not found.
        """
        stmt = select(Feature).where(Feature.id == id).options(joinedload(Feature.requirements))
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_all(self) -> Sequence[Feature]:
        """
        Retrieves all Feature instances from the database, including their associated requirements.
        
        :return: A sequence of all Feature instances.
        """
        stmt = await self.session.execute(select(Feature).options(joinedload(Feature.requirements)))
        return stmt.scalars().all()

    async def update(self, feature: Feature, update_data: dict) -> Feature:
        """
        Updates an existing Feature instance with provided data.
        
        :param feature: The Feature instance to update.
        :param update_data: A dictionary containing the fields to update and their new values.
        :return: The updated Feature instance.
        """
        for key, value in update_data.items():
            setattr(feature, key, value)
        return feature

    async def delete(self, feature: Feature) -> None:
        """
        Deletes a given Feature instance from the database.
        
        :param feature: The Feature instance to delete.
        """
        await self.session.delete(feature)
