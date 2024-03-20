from pydantic import BaseModel

from src.schemas.requirement_schemas import RequirementResponseSchema


class SubCategoryResponseSchema(BaseModel):
    id: str
    name: str


class SubCategoryWithRequirementsResponseSchema(SubCategoryResponseSchema):
    requirements: list[RequirementResponseSchema]
