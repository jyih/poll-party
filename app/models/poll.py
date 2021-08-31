from .db import db


class Poll(db.Model):
    __tablename__ = 'polls'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    options = db.relationship('Option', cascade="all, delete, delete-orphan", order_by='Option.id')

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'user_id': self.user_id,
            'options': self.options,
        }