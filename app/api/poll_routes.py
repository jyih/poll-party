from flask import Blueprint
# from flask_login import login_required
from app.models import Poll

poll_routes = Blueprint('polls', __name__)

@poll_routes.route('/')
def polls():
  polls = Poll.query.all()
  return {'polls': [poll.to_dict() for poll in polls]}

@poll_routes.route('/<int:id>')
def poll(id):
  poll = Poll.query.get(id)
  return poll.to_dict()