<!-- <p align='center'>
  <img src='./react-app/src/assets/images/logo.png' height='200px'>
</p> -->
<iframe
    title='splash-banner'
    src="https://ntmaker.gfto.ru/newneontexten/?image_height=200&image_width=600&image_font_shadow_width=30&image_font_size=111&image_background_color=03045E&image_text_color=FDFD96&image_font_shadow_color=5E89FF&image_url=https://cdn.mos.cms.futurecdn.net/rumru4mYc6NnKVY9rLeUs8-970-80.jpg.webp&image_text=Poll Party&image_font_family=Nickainley&"
    frameBorder='no'
    scrolling='no'
    width="600"
    height="200">
</iframe>

# Poll Party
<!-- Poll Party is a full stack web application that allows logged in users to create public polls where other logged in users of the website are able to cast their votes. Results of the polls are updated in real time. Poll Party was created as a solution for audience engagement, interactive meetings, and scaled feedback. Use Poll Party for fun quizzes, collect thoughts and opinions, and to show your audience you are listening by allowing them to ask questions and receive answers from other users. -->
Poll Party is a full stack web application that allows logged in users to create public polls where other logged in users of the website are able to cast their votes.  Poll Party was created as a solution for audience engagement, interactive meetings, and scaled feedback. Use Poll Party for fun quizzes, collect thoughts and opinions, and to show your audience you are listening by allowing them to ask questions and receive answers from other users.

* View the <a href='https://poll-party.herokuapp.com/'>Poll Party</a> App Live

<!-- * Reference to the Poll Party <a href='https://www.github.com/{github-handle}/poll-party/wiki'>Wiki Docs</a> -->

| Table of Contents |
| ----------------- |
| 1. [Features & Site Walkthrough](#features) |
| 2. [Installation](#installation) |
<!-- | 3. [Technical Implementation Details](#technical-implementation-details) | -->
| 3. [Future Features](#future-features) |
| 4. [Contact](#contact) |
| 5. [Special Thanks](#special-thanks) |


## Technologies
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
* <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL&logoColor=white" /></a>
* <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"></a>
* <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
* <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
* <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" /></a>
* <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" /></a>
* <a href="https://www.heroku.com/home"><img src="https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white" /></a>


## Features & Site Walkthrough

### Landing Page, Log In, and Sign Up
Landing page allows users to access login, sign up, or use a Demo account to check out the app and includes a quick breakdown of the app's main features:
1. Create poll questions
2. Add custom voting options
3. Vote on each other's polls
<!-- ![Splash](https://poll-party.s3.us-west-1.amazonaws.com/readme-assets/splash-page.png) -->


### Navigation: Users, All Polls, and Users's Polls
Once logged in, users can explore the user's own polls, other users and their polls, and create new polls via the navigation bar.
![Welcome Page](https://poll-party.s3.us-west-1.amazonaws.com/readme-assets/welcome-page.png)

### Creating a Poll
Poll creation is quick and straightforward. Only a question and at least two answer options are needed. Users can enter as many answer options as they'd like.
![Create Poll](https://poll-party.s3.us-west-1.amazonaws.com/readme-assets/create-poll.png)

### Voting
After creating a poll or clicking a poll link, users are directed to the voting page where they may select one option to vote on or proceed directly to the results page. If the poll belongs to the user, the user is presented an option to edit the poll.
If the user has previously voted on the poll, then the voting form is populated with the user's previous selection. Users may also return to this page to change their vote.
![Vote](https://poll-party.s3.us-west-1.amazonaws.com/readme-assets/vote-poll.png)

### Editing a Poll
The edit button opens the poll editing form where users can edit the poll title and answer options. Users may also add additional options or delete the poll entirely.
![Edit Poll](https://poll-party.s3.us-west-1.amazonaws.com/readme-assets/edit-poll.png)

### Poll Results
The results page displays the vote % and count for each answer option. If the user has previously voted on the poll, then a blue check will mark the user's selection.
![Results](https://poll-party.s3.us-west-1.amazonaws.com/readme-assets/results.png)

<!-- * Add any more features here -->

## Installation
To build/run project locally, please follow these steps:

1. Clone this repository

```shell
git clone https://github.com/{github-handle}/poll-party.git
```

2. Install Pipfile dependencies and create the virtual environment
```shell
pipenv install
```

2. Install npm dependencies for the `/react-app`

```shell
cd react-app
npm install
```

3. In the `/` root directory, create a `.env` based on the `.env.example` with proper settings

4. Setup your PostgreSQL user, password and database and ensure it matches your `.env` file

5. Before running any flask commands, confirm you are in the pipenv virtual env. If not, run the command:
```shell
pipenv shell
```

5. In the root folder, create the database by running in the terminal:
```shell
flask db create
```

6. In the root folder, migrate tables to the database by running in the terminal:
```shell
flask db migrate
```

7. In the root folder, seed the database by running in the terminal:
```shell
flask seed all
```

8. Start the flask backend in the `/` root directory
```shell
flask run
```

9. Start the frontend in the `/react-app` directory

```javascript
npm start
```

<!-- 
## Technical Implementation Details

### {Detail 1}
Description 1

Part of code is shown below:

```python
print('add code snippet 1 here')
```

Description 2

```javascript
print('add code snippet 2 here')
```

### {Detail 2}
Description 1

Code snippet is shown here:

```javascript
print('add code snippet 1 here')
``` -->


## Future Features

1. __Search__ - search by poll title

2. __Graphed Vote Results__ - bar chart representation of vote %


## Contact

### {Your Name}
<a href="https://www.linkedin.com/in/johnathanyih/"><img src="https://poll-party.s3.us-west-1.amazonaws.com/linkedin-logo.png" height="32" align="middle" /></a>
<!-- <a href="https://angel.co/u/{angel-list-handle}"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a> -->
<a href="https://github.com/jyih"><img src="https://poll-party.s3.us-west-1.amazonaws.com/GitHub-Mark-Light-32px.png" height="32" align="middle" /></a>
<a href="johnathanyih@gmail.com"><img src="https://poll-party.s3.us-west-1.amazonaws.com/email-icon-gray-circle.png" height="32" align="middle" /></a>



## Special Thanks
* Fellow peers who have given me support and community: [Ji](https://github.com/ji-k), [Brandon](https://github.com/Omstachu), [Michelle](https://github.com/michellekontoff), [Nico](https://github.com/nicopierson), and [Monte](https://github.com/theflaggship)
* Mentors who have given me their time and effort: [Peter](https://github.com/lazytangent), [Warren](https://github.com/tamagrijr), [Olivia](https://github.com/OByrnes) and [Javier](https://github.com/javiermortiz)
