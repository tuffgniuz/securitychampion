from uuid import UUID
from pydantic import BaseModel


class RequirementResponseSchema(BaseModel):
    id: UUID
    requirement_id: str
    description: str
    level1: bool
    level2: bool
    level3: bool
