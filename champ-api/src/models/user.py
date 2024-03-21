from fastapi_users.db import SQLAlchemyBaseOAuthAccountTableUUID, SQLAlchemyBaseUserTableUUID
from sqlalchemy.orm import Mapped, relationship

from src.models.base import Base
from src.models.issue import Issue


class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, Base):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
    oath_accounts: Mapped[list[OAuthAccount]] = relationship('OAuthAccount', lazy='joined')
    issues: Mapped[list['Issue']] = relationship('Issue', back_populates='user')
