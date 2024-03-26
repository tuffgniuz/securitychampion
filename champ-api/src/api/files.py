from fastapi import APIRouter, HTTPException

from src.utils.markdown_helper import read_markdown_file


router = APIRouter(prefix='/files', tags=['files'])


@router.get('/introduction')
def get_introduction():
    file_path = '/app/docs/introduction.md'
    file_content = read_markdown_file(file_path)

    if not file_content:
        raise HTTPException(status_code=404, detail='Markdown file not found')

    return {'content': file_content}
