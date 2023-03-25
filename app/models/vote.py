from .db import db, environment, SCHEMA, add_prefix_for_prod


class Vote(db.Model):
    __tablename__ = 'votes'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    option_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('options.id')), nullable=False)
    poll_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('polls.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'option_id': self.option_id,
            'poll_id': self.poll_id
        }

    @staticmethod
    def get_by_user_poll(user_id, poll_id):
        votes = Vote.query.filter(
            (Vote.poll_id == poll_id) &
            (Vote.user_id == user_id)
        ).first()
        return votes