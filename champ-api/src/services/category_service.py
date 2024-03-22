from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.dependencies.db import get_async_session
from src.models.category import Category
from src.repositories.category_repository import CategoryRepository

class CategoryService:
    """
    Service class for Category-related operations. This class is responsible for
    business logic that is not just crud related to the Category model.
    
    Attributes:
        session (AsyncSession): An async session for database operations.
        repository (CategoryRepository): A repository for handling Category model operations.
    """

    def __init__(self, session: AsyncSession = Depends(get_async_session)):
        """
        Initializes the CategoryService with dependencies.
        
        Parameters:
            session (AsyncSession): An async session provided by dependency injection.
        """
        self.session = session
        self.repository = CategoryRepository(session)

    async def get_by_id_or_none(self, id: str) -> Category:
        """
        Retrieves a Category by its ID or raises an error if not found.
        
        Parameters:
            id (str): The unique identifier of the category.
            
        Returns:
            Category: The Category instance matching the ID.
        
        Raises:
            ValueError: If no Category is found with the provided ID.
        """
        category = await self.repository.get(id)

        if not category:
            raise ValueError('Category not found')

        return category

    async def get_all(self) -> Sequence[Category]:
        """
        Retrieves all Category instances from the database.
        
        Returns:
            Sequence[Category]: A list of all Category instances.
        """
        return await self.repository.get_all()

    async def get_all_with_sub_categories(self) -> Sequence[Category]:
        """
        Retrieves all categories along with their related sub-categories.
        
        Returns:
            Sequence[Category]: A list of all Category instances with their sub-categories loaded eagerly.
        """
        return await self.repository.get_all_with_sub_categories()

    async def get_all_with_requirements(self) -> Sequence[Category]:
        """
        Retrieves all categories along with their related requirements.
        
        Returns:
            Sequence[Category]: A list of all Category instances with their requirements loaded eagerly.
        """
        return await self.repository.get_all_with_requirements()
