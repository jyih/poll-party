import React from 'react';
import { NavLink } from 'react-router-dom';
import WelcomeMessage from './WelcomeMessage';

const Splash = () => {

  return (
    <>
      {/* <iframe
        title='splash-banner'
        src="https://ntmaker.gfto.ru/newneontexten/?image_height=200&image_width=600&image_font_shadow_width=30&image_font_size=111&image_background_color=03045E&image_text_color=FDFD96&image_font_shadow_color=5E89FF&image_url=https://cdn.mos.cms.futurecdn.net/rumru4mYc6NnKVY9rLeUs8-970-80.jpg.webp&image_text=Poll Party&image_font_family=Nickainley&"
        frameBorder='no'
        scrolling='no'
        width="600"
        height="200">
      </iframe> */}
      <div>
        <WelcomeMessage />
        <p>
          <NavLink className='form-link' to='/login' exact={true} >
            Login
          </NavLink>  to get started!
        </p>
      </div>
    </>
  )
}

export default Splash