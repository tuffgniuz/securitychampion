from typing import Optional
from uuid import UUID
from pydantic import BaseModel

from src.schemas.requirement_schemas import RequirementResponseSchema


class IssueCreateSchema(BaseModel):
    name: UUID
    description: Optional[str] = None


class IssueUpdateSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class IssueResponseSchema(BaseModel):
    name: str 
    description: str


class IssueWithRequirementsResponseSchema(BaseModel):
    name: str
    description: str
    requirements: list[RequirementResponseSchema] = []
