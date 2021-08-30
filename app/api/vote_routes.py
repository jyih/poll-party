from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Vote, Poll

vote_routes = Blueprint('votes', __name__)

@vote_routes.route('/')
def votes():
  votes = Vote.query.all()
  return {'votes': [vote.to_dict() for vote in votes]}

@vote_routes.route('/<int:id>')
def vote(id):
  vote = Vote.query.get(id)
  return vote.to_dict()

@vote_routes.route('/', methods=['POST', 'PATCH'])
@login_required
def vote_cast():
  data = request.json
  user_id = data['user_id']
  poll_id = data['poll_id']
  answer_id = data['answer_id']

  vote = Vote.get_by_user_poll(user_id, poll_id)
  print('vote:', vote)
  if vote:
    print('yes vote')
    vote.answer_id = answer_id
  else:
    poll = Poll.query.get(poll_id)
    if poll:
      print('no vote')
      vote = Vote(
        user_id=user_id,
        answer_id=answer_id,
        poll_id=poll_id
      )
      db.session.add(vote)
    else:
      return {'message': 'Poll does not exist'}

  db.session.commit()
  return vote.to_dict()