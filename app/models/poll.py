from .db import db


class Poll(db.Model):
    __tablename__ = 'polls'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    options = db.relationship('Option', cascade="all, delete, delete-orphan")

    def to_dict(self):
        options_list = [option.to_dict() for option in self.options]
        options_list.sort(key=lambda option: option['id'])
        return {
            'id': self.id,
            'question': self.question,
            'user_id': self.user_id,
            'options': options_list,
        }
