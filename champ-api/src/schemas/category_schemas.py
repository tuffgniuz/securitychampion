from pydantic import BaseModel

from src.schemas.requirement_schemas import RequirementResponseSchema
from src.schemas.sub_category_schemas import SubCategoryResponseSchema


class CategoryResponseSchema(BaseModel):
    id: str
    name: str
    description: str


class CategoryWithSubCategoriesResponseSchema(CategoryResponseSchema):
    sub_categories: list[SubCategoryResponseSchema]


class CategoryWithRequirementsResponseSchema(CategoryResponseSchema):
    requirements: list[RequirementResponseSchema]
