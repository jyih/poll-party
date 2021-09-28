from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Poll, Option
from app.forms import PollForm

poll_routes = Blueprint('polls', __name__)

#To be added: Backend User ID Validation for Edit/Delete features

@poll_routes.route('/')
def polls():
  polls = Poll.query.all()
  return {poll.to_dict()['id']:poll.to_dict() for poll in polls}
  # return {'polls': [poll.to_dict() for poll in polls]}

@poll_routes.route('/<int:id>')
def poll(id):
  poll = Poll.query.get(id)
  print ('poll:', poll)
  if not poll:
    return {'errors': 'Poll not found'}
  return {**poll.get_options() }

@poll_routes.route('/', methods=['POST'])
@login_required
def poll_create():
  data = request.json
  options = data['options']
  form = PollForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    poll = Poll(
      question=form.data['question'],
      user_id=form.data['user_id']
    )
    db.session.add(poll)
    db.session.commit()

    for option in options:
      if option:
        option = Option(
          answer=option,
          poll_id=poll.id
        )
        db.session.add(option)

    db.session.commit()
    return poll.to_dict()
  return form.errors

@poll_routes.route('/<int:id>', methods=['PUT'])
@login_required
def poll_edit(id):
  data = request.json
  options = data['options']
  form = PollForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    poll = Poll.query.get(id)
    poll.question=form.data['question']
    poll.user_id=form.data['user_id']
    # db.session.commit()

    for (idx, answer) in enumerate(options):
      if answer:
        if idx < len(poll.options):
          option = poll.options[idx]
          option.answer = answer
          # db.session.add(option)
          # db.session.commit()

        else:
          answer = Option(
            answer=answer,
            poll_id=poll.id
          )
          db.session.add(answer)

    db.session.commit()
    return poll.get_options()
  return form.errors

@poll_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def poll_delete(id):
  poll = Poll.query.get(id)
  db.session.delete(poll)
  db.session.commit()
  return {'message': f'Poll ${id} deleted'}