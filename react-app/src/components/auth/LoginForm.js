import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
    if (data) {
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
      <div className='form-title'>Login to Join the Party!</div>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div className='error-message' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='example@site.com'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='••••••'
            value={password}
            onChange={updatePassword}
          />
        </div>
        {/* <div className='form-button-container'> */}
        {/* <div className='form-button-container left'> */}
        <div className='form-button-container'>
          <button className='form-button button-primary' type='submit'>Login</button>
        </div>
        {/* </div>
          <div className='form-button-container right'> */}
        <div className='form-button-container'>
          <button className='form-button' onClick={e => onLogin(e, 'demo@aa.io', 'password')}>Demo Login</button>
        </div>
        {/* </div> */}
        {/* </div> */}
      </form>
    </div>
  );
};

export default LoginForm;
