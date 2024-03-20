from fastapi import APIRouter, Depends

from src.schemas.requirement_schemas import RequirementResponseSchema
from src.services.requirement_service import RequirementService


router = APIRouter(prefix='/api/v1/asvs', tags=['requirements'])


@router.get('/requirements/{id}', response_model=RequirementResponseSchema)
async def get_by_id_404(id: str, service: RequirementService = Depends(RequirementService)):
    return await service.get_by_id_or_none(id)
