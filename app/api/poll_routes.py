from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Poll, Answer
from app.forms import PollForm

poll_routes = Blueprint('polls', __name__)

@poll_routes.route('/')
def polls():
  polls = Poll.query.all()
  return {'polls': [poll.to_dict() for poll in polls]}

@poll_routes.route('/<int:id>')
def poll(id):
  poll = Poll.query.get(id)
  return poll.to_dict()

@poll_routes.route('/', methods=['POST', 'PATCH'])
@login_required
def poll_create():
  data = request.json
  answers = data['answers']
  form = PollForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    poll = Poll(
      question=form.data['question'],
      user_id=form.data['user_id']
    )
    db.session.add(poll)
    db.session.commit()

    for option in answers:
      if option:
        answer = Answer(
          answer=option,
          poll_id=poll.id
        )
        db.session.add(answer)

    db.session.commit()
    return poll.to_dict()
  return form.errors

@poll_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def poll_delete(id):
  poll = Poll.query.get(id)
  db.session.delete(poll)
  db.session.commit()
  return {'message': f'Poll ${id} deleted'}