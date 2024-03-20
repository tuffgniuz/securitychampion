from typing import TYPE_CHECKING
from sqlalchemy import UUID, ForeignKey, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base

if TYPE_CHECKING:
    from src.models.category import Category
    from src.models.requirement import Requirement


class SubCategory(Base):
    __tablename__ = 'sub_categories'

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text('gen_random_uuid()'))
    name: Mapped[str] = mapped_column(String)

    category_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('categories.id'))
    category: Mapped['Category'] = relationship('Category', back_populates='sub_categories')

    requirements: Mapped[list['Requirement']] = relationship('Requirement', back_populates='sub_category')
