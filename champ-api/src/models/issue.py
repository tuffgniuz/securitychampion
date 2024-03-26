from typing import TYPE_CHECKING
from sqlalchemy import UUID, ForeignKey, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base
from src.models.association_tables.issue_requirement_association import issue_requirement_association

if TYPE_CHECKING:
    from src.models.requirement import Requirement
    from src.models.user import User


class Issue(Base):
    __tablename__ = 'issues'

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text('gen_random_uuid()'))
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)

    requirements: Mapped[list['Requirement']] = relationship('Requirement', secondary=issue_requirement_association, back_populates='issues')
