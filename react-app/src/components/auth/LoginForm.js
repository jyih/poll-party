import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  // const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  // const poll = useSelector(state => state.poll)
  const dispatch = useDispatch();

  const onLogin = async (e, pEmail = email, pPassword = password) => {
    e.preventDefault();
    const data = await dispatch(login(pEmail, pPassword));
    if (data || errors) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
    // return poll.id
    //   ? <Redirect to={`/polls/${poll?.id}`} />
    //   : <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
      <h1 className='form-title'>Welcome Back!</h1>
      <div >Login to your Poll Party account</div>
      <form onSubmit={onLogin}>
        {/* <div>
          {errors.map((error, ind) => (
            <div className='error-message' key={ind}>{error}</div>
          ))}
        </div> */}
        <div>
          <label htmlFor='email'>{'Email '}
            <input
              name='email'
              type='email'
              placeholder='example@site.com'
              value={email}
              required
              onChange={updateEmail}
            />
          </label>
        </div>
        <div>
          <label htmlFor='password'>{'Password '}
            <input
              name='password'
              type='password'
              placeholder='••••••'
              value={password}
              required
              onChange={updatePassword}
            />
          </label>
        </div>
        <div className='form-button-container login-form'>
          <div className='form-button-container'>
            <button className='form-button button-primary' type='submit'>Login</button>
          </div>
          <div className='form-button-container'>
            <button className='form-button' onClick={e => onLogin(e, 'demo@aa.io', 'password')}>Demo Login</button>
          </div>
        </div>
      </form>
      <div className='form-bottom-row'>
        Don't have an account yet? <NavLink className='form-link' to='/sign-up' exact={true} >
          Sign up.
        </NavLink>
      </div>
    </div>
  );
};

export default LoginForm;
