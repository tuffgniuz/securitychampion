from fastapi import APIRouter, Depends, HTTPException

from src.schemas.requirement_schemas import RequirementResponseSchema
from src.services.requirement_service import RequirementService
from src.utils.markdown_helper import read_markdown_file


router = APIRouter(prefix='/api/v1/asvs', tags=['requirements'])


@router.get('/requirements', response_model=list[RequirementResponseSchema])
async def get_all(service: RequirementService = Depends(RequirementService)):
    return await service.get_all()


@router.get('/requirements/{id}', response_model=RequirementResponseSchema)
async def get_by_id_404(id: str, service: RequirementService = Depends(RequirementService)):
    return await service.get_by_id_or_none(id)


@router.get('/requirements/{requirement_id}/markdown')
async def get_requirement_markdow(requirement_id: str):
    markdown_path = f'/app/docs/asvs/4.0.3/{requirement_id}.md'
    markdown_content = read_markdown_file(markdown_path)

    if not markdown_content:
        raise HTTPException(status_code=404, detail='Markdown file not found')

    return {'content': markdown_content}
