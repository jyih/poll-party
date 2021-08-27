from flask_wtf import FlaskForm
from wtforms import (StringField, IntegerField)
from wtforms.validators import DataRequired, ValidationError

# def question_length(form, field):
#   question = field.data
#   if question.length > 255:
#     raise ValidationError('Question length cannot exceed 255 characters.')

class PollForm(FlaskForm):
  question = StringField('question', validators=[DataRequired()])
  user_id = IntegerField('user_id', validators=[DataRequired()])