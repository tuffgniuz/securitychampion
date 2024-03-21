from typing import AsyncGenerator
from fastapi import Depends
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from src.core.config.settings import get_db_settings as db
from src.models.user import OAuthAccount, User

DB_URL = f'postgresql+asyncpg://{db.POSTGRES_USER}:{db.POSTGRES_PASSWORD}@{db.POSTGRES_HOST}:{db.POSTGRES_PORT}/{db.POSTGRES_DB}'

async_engine  = create_async_engine(DB_URL)
async_session_maker = async_sessionmaker(async_engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User, OAuthAccount)
