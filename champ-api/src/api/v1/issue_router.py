from fastapi import APIRouter, Depends, HTTPException

from src.schemas.issue_schemas import IssueCreateSchema, IssueResponseSchema, IssueUpdateSchema, IssueWithRequirementsResponseSchema
from src.services.issue_service import IssueService


router = APIRouter(prefix='/api/v1', tags=['issues'])


@router.post('/issues')
async def create_issue(create_schema: IssueCreateSchema, service: IssueService = Depends(IssueService)):
    return await service.add(create_schema.model_dump())


@router.get('/issues')
async def get_all(service: IssueService = Depends(IssueService)):
    return await service.get_all()


@router.get('/issues/{id}', response_model=IssueWithRequirementsResponseSchema)
async def get_issue_by_id_or_404(id: str, service: IssueService = Depends(IssueService)):
    return await service.get_by_id_or_none(id)


@router.patch('/issues/{id}', response_model=IssueWithRequirementsResponseSchema)
async def update_issue(id: str, update_schema: IssueUpdateSchema, service: IssueService = Depends(IssueService)):
    return await service.update(id, update_schema.model_dump(exclude_unset=True))


@router.delete('/issues/{id}')
async def delete(id: str, service: IssueService = Depends(IssueService)):
    return await service.delete(id)


@router.post('/issues/{issue_id}/requirements/{requirement_id}')
async def add_requirement_to_issue(issue_id: str, requirement_id: str, service: IssueService = Depends(IssueService)):
    return await service.add_requirement_to_issue(issue_id, requirement_id)
