from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Poll, Answer
from app.forms import PollForm
from .auth_routes import validation_errors_to_error_messages

poll_routes = Blueprint('polls', __name__)

@poll_routes.route('/')
def polls():
  polls = Poll.query.all()
  return {'polls': [poll.to_dict() for poll in polls]}

@poll_routes.route('/<int:id>')
def poll(id):
  poll = Poll.query.get(id)
  return poll.to_dict()

@poll_routes.route('/', methods=['POST'])
# @login_required
def poll_create():
  # data = request.json
  form = PollForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    poll = Poll(
      question=form.data['question'],
      user_id=form.data['user_id']
    )
    db.session.add(poll)
    # db.session.flush()
    # db.session.refresh(poll)
    db.session.commit()
    # print (poll.to_dict())
    return poll.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401