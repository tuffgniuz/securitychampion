from typing import TYPE_CHECKING
from sqlalchemy import UUID, String, text
from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy.orm.base import Mapped

from src.models.base import Base

if TYPE_CHECKING:
    from src.models.sub_category import SubCategory
    from src.models.requirement import Requirement


class Category(Base):
    __tablename__ = 'categories'

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text('gen_random_uuid()'))
    name: Mapped[str] = mapped_column(String)
    summary: Mapped[str] = mapped_column(String)

    sub_categories: Mapped[list['SubCategory']] = relationship('SubCategory', back_populates='category')
    requirements: Mapped[list['Requirement']] = relationship('Requirement', back_populates='category')
    
