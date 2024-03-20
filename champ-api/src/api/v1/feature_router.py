from fastapi import APIRouter, Depends, HTTPException

from src.schemas.feature_schemas import FeatureCreateSchema, FeatureResponseSchema, FeatureUpdateSchema, FeatureWithRequirementsResponseSchema
from src.services.feature_service import FeatureService


router = APIRouter(prefix='/api/v1', tags=['features'])


@router.post('/features', response_model=FeatureResponseSchema)
async def create_feature(create_schema: FeatureCreateSchema, service: FeatureService = Depends(FeatureService)):
    return await service.add(create_schema.model_dump())


@router.get('/features', response_model=FeatureWithRequirementsResponseSchema)
async def get_all(service: FeatureService = Depends(FeatureService)):
    return await service.get_all()


@router.get('/features/{id}', response_model=FeatureWithRequirementsResponseSchema)
async def get_feature_by_id_or_404(id: str, service: FeatureService = Depends(FeatureService)):
    return await service.get_by_id_or_none(id)


@router.patch('/features/{id}', response_model=FeatureWithRequirementsResponseSchema)
async def update_feature(id: str, update_schema: FeatureUpdateSchema, service: FeatureService = Depends(FeatureService)):
    return await service.update(id, update_schema.model_dump(exclude_unset=True))


@router.delete('/features/{id}')
async def delete(id: str, service: FeatureService = Depends(FeatureService)):
    return await service.delete(id)


@router.post('/features/{feature_id}/requirements/{requirement_id}')
async def add_requirement_to_feature(feature_id: str, requirement_id: str, service: FeatureService = Depends(FeatureService)):
    try:
        return await service.add_requirement_to_feature(feature_id, requirement_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
