from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy.orm import Mapped, relationship

from src.models.base import Base
from src.models.feature import Feature


class User(SQLAlchemyBaseUserTableUUID, Base):
    features: Mapped[list['Feature']] = relationship('Feature', back_populates='user')
