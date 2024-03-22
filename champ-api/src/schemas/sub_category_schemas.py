from uuid import UUID
from pydantic import BaseModel

from src.schemas.requirement_schemas import RequirementResponseSchema


class SubCategoryResponseSchema(BaseModel):
    id: UUID
    name: str
    category_id: UUID


class SubCategoryWithRequirementsResponseSchema(SubCategoryResponseSchema):
    requirements: list[RequirementResponseSchema]
