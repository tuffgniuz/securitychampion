import json
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.dependencies.db import get_async_session  # Make sure to replace with your actual module import
from src.models.category import Category
from src.models.sub_category import SubCategory
from src.models.requirement import Requirement


async def load_json_data(filename) -> list:
    """Asynchronously load JSON data from a file."""
    with open(filename, 'r') as file:
        return json.load(file)


async def seed_data(data: list, async_session_generator):
    async for session in async_session_generator():
        for category_data in data:
            category = Category(
                name=category_data["category_name"],
                summary=category_data["summary"]
            )
            session.add(category)
            await session.flush()  # Ensures 'category' is inserted
            
            for sub_cat_data in category_data.get("sub_categories", []):
                sub_category = SubCategory(
                    name=sub_cat_data["sub_category_name"],
                    category=category
                )
                session.add(sub_category)
                await session.flush()  # Ensures 'sub_category' is inserted
                
                for req_data in sub_cat_data.get("requirements", []):
                    requirement = Requirement(
                        requirement_id=req_data["requirement_id"],
                        description=req_data["description"],
                        level1=req_data.get("level1", False),
                        level2=req_data.get("level2", False),
                        level3=req_data.get("level3", False),
                        category=category,
                        sub_category=sub_category
                    )
                    session.add(requirement)
            await session.commit()


async def main():
    """Main asynchronous entry point for the seeding script."""
    filename = "docs/asvs.json"  # Make sure this points to the actual location of your JSON file
    data = await load_json_data(filename)
    await seed_data(data, get_async_session)

if __name__ == "__main__":
    asyncio.run(main())