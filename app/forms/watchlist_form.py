from flask_wtf import FlaskForm
from wtforms import (StringField, IntegerField)
from wtforms.validators import DataRequired, Length, ValidationError


class WatchlistForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  poll_id = IntegerField('poll_id', validators=[DataRequired()])