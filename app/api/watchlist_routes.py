from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Watchlist, Poll, Option
from app.forms import WatchlistForm

watchlist_routes = Blueprint('watchlists', __name__)

@watchlist_routes.route('/')
# @login_required
def watchlists():
  watchlists = Watchlist.query.all()
  return {watchlist.to_dict()['id']:watchlist.to_dict() for watchlist in watchlists}

@watchlist_routes.route('/')
# @login_required
def watchlist():
  data = request.json
  id = data['watchlist_id']
  watchlist = Watchlist.query.get(id)
  return watchlist.to_dict() if watchlist else none

@watchlist_routes.route('/', methods=['POST'])
# @login_required
def watchlist_add():
  data = request.json
  form = WatchlistForm()
  if form.validate_on_submit():
    watchlist = Watchlist(
      user_id=form.data['user_id'],
      poll_id=form.data['poll_id']
    )
    db.session.add(watchlist)
    db.session.commit()

    return watchlist.to_dict()
  return form.errors

@watchlist_routes.route('/<int:id>/<int:user_id>', methods=['DELETE'])
# @login_required
def watchlist_remove(id, user_id):
  # data = request.json
  # id = data['watchlist_id']
  watchlist = Watchlist.query.get(id)
  # if watchlist['user_id'] == data['user_id']:
  if watchlist['user_id'] == user_id:
    db.session.delete(watchlist)
    db.session.commit()
    return {'message': f'Watchlist ${id} deleted'}