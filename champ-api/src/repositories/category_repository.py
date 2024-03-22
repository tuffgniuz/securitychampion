from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.models.category import Category


class CategoryRepository:
    """
    Repository class for performing database operations on Category models.
    
    Attributes:
        session (AsyncSession): The SQLAlchemy async session for database operations.
    """

    def __init__(self, session: AsyncSession):
        """
        Initializes the CategoryRepository with an async database session.
        
        Parameters:
            session (AsyncSession): The async session used for database queries.
        """
        self.session = session

    async def get(self, id: str) -> Category:
        """
        Retrieves a single Category by its id.
        
        Parameters:
            id (str): The unique identifier of the category to retrieve.
            
        Returns:
            Category: An instance of the Category model if found, else None.
        """
        return await self.session.get(Category, id)

    async def get_all(self) -> Sequence[Category]:
        """
        Retrieves all categories from the database.
        
        Returns:
            Sequence[Category]: A list of all Category instances.
        """
        stmt = select(Category)
        result = await self.session.execute(stmt) 
        return result.scalars().all()
    
    async def get_all_with_sub_categories(self) -> Sequence[Category]:
        """
        Retrieves all categories along with their related sub-categories.
        
        Returns:
            Sequence[Category]: A list of all Category instances including their sub-categories loaded eagerly.
        """
        stmt = select(Category).options(joinedload(Category.sub_categories))
        result = await self.session.execute(stmt)
        return result.scalars().unique().all()

    async def get_all_with_requirements(self) -> Sequence[Category]:
        """
        Retrieves all categories along with their related requirements.
        
        Returns:
            Sequence[Category]: A list of all Category instances including their requirements loaded eagerly.
        """
        stmt = select(Category).options(joinedload(Category.requirements))
        result = await self.session.execute(stmt)
        return result.scalars().unique().all()
