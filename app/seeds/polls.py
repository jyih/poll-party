from app.models import db, Poll
# from datetime import datetime

def seed_polls():
  poll_seeds = []

  poll_seeds.append(Poll(user_id=1, question='''What is your dominant hand?'''))
  poll_seeds.append(Poll(user_id=1, question='''Would you rather get $1,000,000 or $10,000? If you choose the more popular option, you get nothing.'''))
  poll_seeds.append(Poll(user_id=2, question='''Which job would you rather have?'''))
  poll_seeds.append(Poll(user_id=3, question='''Which streaming service do you prefer?'''))
  poll_seeds.append(Poll(user_id=5, question='''I can't stand Daylight Savings. How about you?'''))
  poll_seeds.append(Poll(user_id=8, question='''Out of the following, what sport do you like watching most on TV?'''))
  poll_seeds.append(Poll(user_id=13, question='''How do you pose when you take a photo for school, work, id, etc?'''))
  poll_seeds.append(Poll(user_id=1, question='''Be honest, have you ever gone through someone else's medicine cabinet?'''))
  poll_seeds.append(Poll(user_id=1, question='''Do you sleep with a blanket, even if it's hot?'''))
  poll_seeds.append(Poll(user_id=2, question='''Have you ever accidentally bit your dentist's finger?'''))
  poll_seeds.append(Poll(user_id=3, question='''What do you think about spoilers (for books, tv shows, movies, etc)?'''))
  poll_seeds.append(Poll(user_id=5, question='''Have you ever clicked the wrong answer on a poll?'''))
  poll_seeds.append(Poll(user_id=8, question='''Favorite Beyonce album?'''))
  poll_seeds.append(Poll(user_id=13, question='''Would you rather...'''))
  poll_seeds.append(Poll(user_id=1, question='''Who is your favorite character from The Office?'''))


  for poll in poll_seeds:
    db.session.add(poll)

  db.session.commit()


def undo_polls():
  db.session.execute('TRUNCATE polls RESTART IDENTITY CASCADE;')
  db.session.commit()
