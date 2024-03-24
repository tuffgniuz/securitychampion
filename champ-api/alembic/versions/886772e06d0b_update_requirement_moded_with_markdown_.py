"""Update Requirement moded with markdown_path field

Revision ID: 886772e06d0b
Revises: f7b00917aeba
Create Date: 2024-03-22 16:10:06.430049

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '886772e06d0b'
down_revision: Union[str, None] = 'f7b00917aeba'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('requirements', sa.Column('markdown_path', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('requirements', 'markdown_path')
    # ### end Alembic commands ###