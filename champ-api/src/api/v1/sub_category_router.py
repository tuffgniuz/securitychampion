from fastapi import APIRouter, Depends

from src.schemas.sub_category_schemas import SubCategoryWithRequirementsResponseSchema
from src.services.sub_category_service import SubCategoryService


router = APIRouter(prefix='/api/v1/asvs', tags=['sub-categories'])


@router.get('/sub-categories/{id}', response_model=SubCategoryWithRequirementsResponseSchema)
async def get_by_id_with_requirements(id: str, service: SubCategoryService = Depends(SubCategoryService)):
    return await service.get_by_id_with_requirements_or_none(id)
