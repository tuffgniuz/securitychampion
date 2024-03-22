from typing import TYPE_CHECKING
from sqlalchemy import UUID, Boolean, ForeignKey, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base
from src.models.association_tables.issue_requirement_association import issue_requirement_association

if TYPE_CHECKING:
    from src.models.category import Category
    from src.models.sub_category import SubCategory
    from src.models.issue import Issue


class Requirement(Base):
    __tablename__ = 'requirements'

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text('gen_random_uuid()'))
    requirement_id: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    level1: Mapped[bool] = mapped_column(Boolean)
    level2: Mapped[bool] = mapped_column(Boolean)
    level3: Mapped[bool] = mapped_column(Boolean)
    markdown_path: Mapped[str] = mapped_column(String, nullable=True)

    category_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('categories.id'))
    category: Mapped['Category'] = relationship('Category', back_populates='requirements')

    sub_category_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('sub_categories.id'))
    sub_category: Mapped['SubCategory'] = relationship('SubCategory', back_populates='requirements')

    issues: Mapped[list['Issue']] = relationship(
        'Issue', secondary=issue_requirement_association, back_populates='requirements')
