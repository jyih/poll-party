"""fixed options table

Revision ID: 3e1a83db5efe
Revises: 9c26263a36e0
Create Date: 2021-08-30 22:20:00.504127

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '3e1a83db5efe'
down_revision = '9c26263a36e0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('options', sa.Column('answer', sa.String(length=255), nullable=False))
    op.drop_column('options', 'option')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('options', sa.Column('option', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
    op.drop_column('options', 'answer')
    # ### end Alembic commands ###
