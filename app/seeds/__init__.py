from flask.cli import AppGroup
from .users import seed_users, undo_users
from .polls import seed_polls, undo_polls
from .options import seed_options, undo_options
from .votes import seed_votes, undo_votes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_polls()
    seed_options()
    seed_votes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_polls()
    undo_options()
    undo_votes()
    # Add other undo functions here
