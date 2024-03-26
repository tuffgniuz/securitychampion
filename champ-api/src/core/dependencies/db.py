from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from src.core.config.settings import get_db_settings as db

DB_URL = f'postgresql+asyncpg://{db.POSTGRES_USER}:{db.POSTGRES_PASSWORD}@{db.POSTGRES_HOST}:{db.POSTGRES_PORT}/{db.POSTGRES_DB}'

async_engine  = create_async_engine(DB_URL)
async_session_maker = async_sessionmaker(async_engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
