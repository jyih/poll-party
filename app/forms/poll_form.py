from flask_wtf import FlaskForm
from wtforms import (StringField, IntegerField)
from wtforms.validators import DataRequired, Length, ValidationError


class PollForm(FlaskForm):
  question = StringField('Title', validators=[
    DataRequired(),
    Length(max=255, message='Title must be 255 characters or less.')
    ])
  user_id = IntegerField('user_id', validators=[DataRequired()])