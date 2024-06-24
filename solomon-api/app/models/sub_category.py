import uuid
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.types import UUID

from app.models.base import Base
from app.models.requirement import Requirement

if TYPE_CHECKING:
    from app.models.category import Category


class SubCategory(Base):
    __tablename__ = "sub_category"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    sub_category_key: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    summary: Mapped[str] = mapped_column(String, nullable=True)

    category_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("category.id"), nullable=True
    )

    category: Mapped["Category"] = relationship(
        "Category", back_populates="sub_categories"
    )
    requirements: Mapped[list["Requirement"]] = relationship(
        "Requirement", back_populates="sub_category"
    )
