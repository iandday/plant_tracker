"""migration

Revision ID: d5d37b9d185a
Revises: 2fcc676b4621
Create Date: 2023-09-16 20:48:19.513060

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd5d37b9d185a'
down_revision: Union[str, None] = '2fcc676b4621'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('plant_photo_url_key', 'plant', type_='unique')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('plant_photo_url_key', 'plant', ['photo_url'])
    # ### end Alembic commands ###
