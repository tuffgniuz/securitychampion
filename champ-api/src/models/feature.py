from typing import TYPE_CHECKING
from sqlalchemy import UUID, ForeignKey, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base
from src.models.association_tables.feature_requirement_association import feature_requirement_association

if TYPE_CHECKING:
    from src.models.requirement import Requirement
    from src.models.user import User


class Feature(Base):
    __tablename__ = 'features'

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text('gen_random_uuid()'))
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)

    user_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('users.id'))
    user: Mapped['User'] = relationship('User', back_populates='features')

    requirements: Mapped[list['Requirement']] = relationship('Requirement', secondary=feature_requirement_association, back_populates='features')
