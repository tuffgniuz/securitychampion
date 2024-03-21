from sqlalchemy import UUID, Column, ForeignKey, Table

from src.models.base import Base


issue_requirement_association = Table(
    'issue_requirement_association',
    Base.metadata,
    Column('issue_id', UUID(as_uuid=True), ForeignKey('issues.id'), primary_key=True),
    Column('requirement_id', UUID(as_uuid=True), ForeignKey('requirements.id'), primary_key=True)
)
