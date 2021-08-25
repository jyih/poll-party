from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():
    user_seeds = []

    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    user1 = user_seeds.append(User(username='Demo', email='demo@aa.io', password='password'))
    user2 = user_seeds.append(User(username='marnie', email='marnie@aa.io', password='password'))
    user3 = user_seeds.append(User(username='bobbie', email='bobbie@aa.io', password='password'))
    user4 = user_seeds.append(User(username='pioneer', email='pioneer@aa.io', password='password'))
    user5 = user_seeds.append(User(username='taxidriver', email='taxidriver@aa.io', password='password'))
    user6 = user_seeds.append(User(username='winterberry', email='winterberry@aa.io', password='password'))
    user7 = user_seeds.append(User(username='crystalswish', email='crystalswish@aa.io', password='password'))
    user8 = user_seeds.append(User(username='thegodfather', email='thegodfather@aa.io', password='password'))
    user9 = user_seeds.append(User(username='wakaflocka', email='wakaflocka@aa.io', password='password'))
    user10 = user_seeds.append(User(username='pigeonpanda', email='pigeonpanda@aa.io', password='password'))
    user11 = user_seeds.append(User(username='inceptionrye', email='inceptionrye@aa.io', password='password'))
    user12 = user_seeds.append(User(username='flowersauce', email='flowersauce@aa.io', password='password'))
    user13 = user_seeds.append(User(username='optimusprime', email='optimusprime@aa.io', password='password'))
    user14 = user_seeds.append(User(username='gollumhydra', email='gollumhydra@aa.io', password='password'))
    user15 = user_seeds.append(User(username='diabolique', email='diabolique@aa.io', password='password'))
    user16 = user_seeds.append(User(username='casablanca', email='casablanca@aa.io', password='password'))
    user17 = user_seeds.append(User(username='chickenjudo', email='chickenjudo@aa.io', password='password'))
    user18 = user_seeds.append(User(username='catnip', email='catnip@aa.io', password='password'))
    user19 = user_seeds.append(User(username='aquariussea', email='aquariussea@aa.io', password='password'))
    user20 = user_seeds.append(User(username='pumba', email='pumba@aa.io', password='password'))

    for user in user_seeds:
        db.session.add(user)
    # db.session.add(marnie)
    # db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
