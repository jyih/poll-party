from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Vote

vote_routes = Blueprint('votes', __name__)

@vote_routes.route('/')
def votes():
  votes = Vote.query.all()
  return {'votes': [vote.to_dict() for vote in votes]}

