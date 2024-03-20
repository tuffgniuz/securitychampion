from fastapi import APIRouter, Depends

from src.services.category_service import CategoryService
from src.schemas.category_schemas import CategoryResponseSchema, CategoryWithRequirementsResponseSchema, CategoryWithSubCategoriesResponseSchema

router = APIRouter(prefix='/api/v1/asvs', tags=["categories"])


@router.get('/categories/{id}', response_model=CategoryResponseSchema)
async def get_by_id_or_404(id: str, service: CategoryService = Depends(CategoryService)):
    return await service.get_by_id_or_none(id)


@router.get('/categories', response_model=list[CategoryResponseSchema])
async def get_all(service: CategoryService = Depends(CategoryService)):
    return await service.get_all()


@router.get('/categories/sub-categories', response_model=list[CategoryWithSubCategoriesResponseSchema])
async def get_all_with_sub_categories(service: CategoryService = Depends(CategoryService)):
    return await service.get_all_with_sub_categories()


@router.get('/categories/requirements', response_model=list[CategoryWithRequirementsResponseSchema])
async def get_all_with_requirements(service: CategoryService = Depends(CategoryService)):
    return await service.get_all_with_requirements()
