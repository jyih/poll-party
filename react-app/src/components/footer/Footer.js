import React from 'react';
// import { NavLink } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-content-container'>
        <div className='footer-credits'>Developed by Johnathan Yih</div>
        <div className='logo-container'>
          <a href='https://www.linkedin.com/in/johnathan-yih/' target="_blank" rel="noreferrer">
            <img className='footer-logo' alt='LinkedIn' src='https://poll-party.s3.us-west-1.amazonaws.com/linkedin-logo.png' />
          </a>
        </div>
        <div className='logo-container'>
          <a href='https://github.com/jyih' target="_blank" rel="noreferrer">
            <img className='footer-logo' alt='Github' src='https://poll-party.s3.us-west-1.amazonaws.com/GitHub-Mark-Light-32px.png' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;