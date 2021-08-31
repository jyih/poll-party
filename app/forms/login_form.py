from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

login_error_msg = 'Incorrect login credentials. Please try again.'

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        # raise ValidationError('Email provided not found.')
        raise ValidationError(login_error_msg)


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        # raise ValidationError('No such user exists.')
        raise ValidationError(login_error_msg)
    if not user.check_password(password):
        # raise ValidationError('Password was incorrect.')
        raise ValidationError(login_error_msg)


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
