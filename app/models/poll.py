from .db import db


class Poll(db.Model):
    __tablename__ = 'polls'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    answers = db.relationship('Answer', cascade="all, delete, delete-orphan")

    def to_dict(self):
        answers_list = [answer.to_dict() for answer in self.answers]
        answers_list.sort(key=lambda answer: answer['id'])
        return {
            'id': self.id,
            'question': self.question,
            'user_id': self.user_id,
            'answers': answers_list,
        }
