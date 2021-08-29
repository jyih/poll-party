#!! delete this form

from flask_wtf import FlaskForm
from wtforms import (StringField, IntegerField)
from wtforms.validators import DataRequired, ValidationError

def answer_length(form, field):
  answer = field.data
  if answer.length > 255:
    raise ValidationError('Answer length cannot exceed 255 characters.')

class AnswerForm(FlaskForm):
  answer = StringField('answer', validators=[DataRequired(), answer_length])
  poll_id = IntegerField('user_id', validators=[DataRequired()])