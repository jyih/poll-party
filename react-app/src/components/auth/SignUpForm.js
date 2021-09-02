import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
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
      <form onSubmit={onSignUp}>
        {/* <div>
          {errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        <div>
          <label>User Name
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required={true}
              minLength={3}
            />
            {errors.username}
          </label>
        </div>
        <div>
          <label>Email
            {errors.email}
          </label>
          <input
            type='email'
            name='email'
            onChange={updateEmail}
            value={email}
            required={true}
          />
        </div>
        <div>
          <label>Password
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required={true}
            />
          </label>
        </div>
        <div>
          <label>Confirm Password
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            {errors.password}
          </label>
        </div>
        <div className='form-button-container'>
          <button className='form-button button-primary' type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
