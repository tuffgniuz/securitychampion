from typing import Optional
from pydantic import BaseModel

from src.schemas.requirement_schemas import RequirementResponseSchema


class FeatureCreateSchema(BaseModel):
    name: str
    description: Optional[str] = None


class FeatureUpdateSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class FeatureResponseSchema(BaseModel):
    name: str 
    description: str


class FeatureWithRequirementsResponseSchema(BaseModel):
    name: str
    description: str
    requirements: list[RequirementResponseSchema] = []
