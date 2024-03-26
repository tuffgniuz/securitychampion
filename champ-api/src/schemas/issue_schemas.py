from uuid import UUID
from typing import Optional
from pydantic import BaseModel

from src.schemas.requirement_schemas import RequirementResponseSchema


class IssueCreateSchema(BaseModel):
    name: str
    description: Optional[str] = None


class IssueUpdateSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class IssueResponseSchema(BaseModel):
    id: UUID
    name: str 
    description: str


class IssueWithRequirementsResponseSchema(BaseModel):
    id: UUID
    name: str
    description: str
    requirements: list[RequirementResponseSchema] = []
