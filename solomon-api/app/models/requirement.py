import uuid
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.types import UUID

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.sub_category import SubCategory


class Requirement(Base):
    __tablename__ = "requirement"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    requirement_key: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    level1: Mapped[bool] = mapped_column(Boolean, nullable=False)
    level2: Mapped[bool] = mapped_column(Boolean, nullable=False)
    level3: Mapped[bool] = mapped_column(Boolean, nullable=False)

    sub_category_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("sub_category.id"), nullable=True
    )

    sub_category: Mapped["SubCategory"] = relationship(
        "SubCategory", back_populates="requirements"
    )
