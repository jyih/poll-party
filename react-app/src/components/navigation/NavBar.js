import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  let sessionLinks =
    user ? (
      <div className='nav-right-container'>
        <div className='nav-button-container'>
          <NavLink className='nav-link' to='/create' exact={true} activeClassName='active'>
            <button className='nav-button button-create' type='button'>
              Create Poll
            </button>
          </NavLink>
        </div>
        <div className='nav-button-container'>
          <LogoutButton />
        </div>
      </div>
    ) : (
      <div className='nav-right-container'>
        <div className='nav-button-container'>
          <NavLink className='nav-link' to='/login' exact={true} activeClassName='active'>
            <button className='nav-button' type='button'>
              Login
            </button>
          </NavLink>
        </div>
        <div>
          <NavLink className='nav-link' to='/sign-up' exact={true} activeClassName='active'>
            <button className='nav-button button-sign-up' type='button'>
              Sign Up
            </button>
          </NavLink>
        </div>
      </div>
    );

  return (
    <nav className='navbar-container'>
      <div className='navbar-content-container'>
        <div className='navbar-left-container'>
          <div className='nav-logo-container'>
            <img className='nav-logo'
              alt='Nimbus Sounds'
              src='https://raw.githubusercontent.com/poll-party/react-app/public/beach-ball-icon.jpg'
            />
          </div>
          <div className='nav-button-container'>
            <NavLink className='nav-link nav-home nav-site-title' to='/' exact={true} activeClassName='active'>
              Poll Party
            </NavLink>
          </div>
          <div className='nav-button-container'>
            <NavLink className='nav-link' to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div>
        </div>
        {sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
