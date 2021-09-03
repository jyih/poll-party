import React from 'react'
import { NavLink } from 'react-router-dom';

const LoginMessage = () => {

  return (
    <>
      <div className='login-message-container'>
        <div className='login-message title'>
          <h1>
            Welcome Back!
          </h1>
        </div>
        <div className='login-message text'>
          Feel free to use the links at the top to:
        </div>
        <div className='login-message list-container'>
          <div className='login-message list'>
            1. Explore other users' polls
          </div >
          <div className='login-message list'>
            2. View a list of all polls
          </div>
          <div className='login-message list'>
            3. View your own polls
          </div>

          <p className='login-message text'>
            And most importantly, <NavLink
              className='form-link'
              to='/create'
              exact={true} >create
            </NavLink> your own!
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginMessage;