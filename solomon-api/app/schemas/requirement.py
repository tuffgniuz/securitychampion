from pydantic import BaseModel


class ReadRequirementSchema(BaseModel):
    id: str
    requirement_key: str
    description: str
    level1: bool
    level2: bool
    level3: bool
