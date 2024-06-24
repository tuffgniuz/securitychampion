from pydantic import BaseModel

from app.schemas.sub_category import ReadSubCategorySchema


class ReadCategorySchema(BaseModel):
    id: str
    category_key: str
    name: str
    summary: str
    sub_categories: list[ReadSubCategorySchema]
