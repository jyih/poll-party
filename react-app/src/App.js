import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/user/UsersList';
import User from './components/user/User';
import * as sessionActions from './store/session';
import VoteForm from './components/poll/VoteForm';
import PollResults from './components/poll/PollResults';
import PollCreate from './components/poll/PollCreate';
import Splash from './components/Splash';
import Footer from './components/footer/Footer';
// import PollEdit from './components/poll/PollEdit';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />

      <div className='content-container'>
        <Switch>
          <ProtectedRoute path='/' exact={true} >
            <h1>My Home Page</h1>
          </ProtectedRoute>

          <Route path='/splash' exact={true}>
            <Splash />
          </Route>

          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>

          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>

          <Route path='/create' exact={true}>
            <PollCreate />
          </Route>
          <Route path='/polls/:pollId/' exact={true}>
            <VoteForm />
          </Route>
          <Route path='/polls/:pollId/results' exact={true}>
            <PollResults />
          </Route>
          {/* <Route path='/polls/:pollId/edit' exact={true}>
            <PollEdit handleCancel={(e) => <Redirect to='/polls/:pollId' />} />
          </Route> */}
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
