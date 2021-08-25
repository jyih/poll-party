from flask.cli import AppGroup
from .users import seed_users, undo_users
from .polls import seed_polls, undo_polls
from .answers import seed_answers, undo_answers
from .votes import seed_votes, undo_votes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_polls()
    seed_answers()
    seed_votes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_polls()
    undo_answers()
    undo_votes()
    # Add other undo functions here
