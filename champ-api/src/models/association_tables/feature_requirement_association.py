from sqlalchemy import UUID, Column, ForeignKey, Table

from src.models.base import Base


feature_requirement_association = Table(
    'feature_requirement_association',
    Base.metadata,
    Column('feature_id', UUID(as_uuid=True), ForeignKey('features.id'), primary_key=True),
    Column('requirement_id', UUID(as_uuid=True), ForeignKey('requirements.id'), primary_key=True)
)
