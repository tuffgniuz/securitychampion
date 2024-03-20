from redis import asyncio
from fastapi_users.authentication import AuthenticationBackend, BearerTransport, RedisStrategy

bearer_transport = BearerTransport(tokenUrl='auth/login')
redis = asyncio.from_url('redis://localhost:6379', decode_responses=True)


def get_redis_strategy() -> RedisStrategy:
    return RedisStrategy(redis, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name='redis',
    transport=bearer_transport,
    get_strategy=get_redis_strategy
)
