from .db import db, environment, SCHEMA, add_prefix_for_prod


class Poll(db.Model):
    __tablename__ = 'polls'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    options = db.relationship('Option', cascade="all, delete, delete-orphan", order_by='Option.id')

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'user_id': self.user_id,
        }

    def get_options(self):
        return {
            'id': self.id,
            'question': self.question,
            'user_id': self.user_id,
            'options': {option.to_dict()['id']:option.get_votes() for option in self.options},
            'total_votes': sum([option.get_votes()['count'] for option in self.options])
        }