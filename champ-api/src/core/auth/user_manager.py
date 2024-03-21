import uuid
from fastapi import Depends
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.db import SQLAlchemyUserDatabase

from src.core.dependencies.db import get_user_db
from src.core.auth.auth_backend import auth_backend
from src.models.user import User

SECRET = ''


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    pass


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])
current_active_user = fastapi_users.current_user(active=True)
