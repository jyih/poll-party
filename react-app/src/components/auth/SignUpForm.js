import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors({ 'password': 'Passwords do not match.' })
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
      <h1 className='form-title'>Create a Free Account</h1>
      <form onSubmit={onSignUp}>
        {/* <div>
          {errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        <div>
          <label>
            User Name <input
              type='text'
              name='username'
              placeholder='(40 chars. max)'
              onChange={updateUsername}
              value={username}
              required={true}
              minLength={3}
              maxLength={40}
            />
            <div className='error-message' >
              {errors.username}
            </div>
          </label>
        </div>
        <div>
          <label>
            Email <input
              type='email'
              name='email'
              placeholder='example@site.com'
              onChange={updateEmail}
              value={email}
              required={true}
            />
            <div className='error-message' >
              {errors.email}
            </div>
          </label>
        </div>
        <div>
          <label>
            Password <input
              type='password'
              name='password'
              placeholder='••••••'
              onChange={updatePassword}
              value={password}
              required={true}
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password <input
              type='password'
              name='repeat_password'
              placeholder='••••••'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <div className='error-message' >
              {errors.password}
            </div>
          </label>
        </div>
        <div className='form-button-container'>
          <button className='form-button button-primary' type='submit'>Sign Up</button>
        </div>
      </form>
      <div className='form-bottom-row'>
        Already have an account? <NavLink className='form-link' to='/login' exact={true} >
          Log in.
        </NavLink>
      </div>
    </div>
  );
};

export default SignUpForm;
