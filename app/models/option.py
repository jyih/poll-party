from .db import db


class Option(db.Model):
    __tablename__ = 'options'

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(255), nullable=False)
    poll_id = db.Column(db.Integer, db.ForeignKey('polls.id'), nullable=False)

    votes = db.relationship('Vote', cascade="all, delete, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'answer': self.answer,
            'poll_id': self.poll_id,
            'votes': [vote.to_dict() for vote in self.votes],
        }
