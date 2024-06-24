from pydantic import BaseModel

from app.schemas.requirement import ReadRequirementSchema


class ReadSubCategorySchema(BaseModel):
    id: str
    sub_category_key: str
    name: str
    summary: str | None
    requirements: list[ReadRequirementSchema]
