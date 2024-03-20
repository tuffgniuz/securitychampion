from pydantic import BaseModel


class RequirementResponseSchema(BaseModel):
    id: str
    requirement_id: str
    description: str
    level1: bool
    level2: bool
    level3: bool
