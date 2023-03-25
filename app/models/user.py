from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    polls = db.relationship('Poll', order_by='Poll.id')
    votes = db.relationship('Vote', order_by='Vote.id')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'polls': {poll.to_dict()['id']:poll.to_dict() for poll in self.polls},
            'votes': {vote.to_dict()['poll_id']:vote.to_dict() for vote in self.votes},
        }

    def get_polls(self):
        return [poll.to_dict() for poll in self.polls]

    def get_votes(self):
        return [vote.to_dict() for vote in self.votes]