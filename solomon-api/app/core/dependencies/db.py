from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config.settings import db_settings

DATABASE_URL = f"postgresql+asyncpg://{db_settings.POSTGRES_USER}:{db_settings.POSTGRES_PASSWORD}@{db_settings.POSTGRES_HOST}/{db_settings.POSTGRES_DB}"

# Create the async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create the session factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)


# Dependency to get DB session
async def get_async_session():
    async with AsyncSessionLocal() as session:
        yield session
