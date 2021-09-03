import React from 'react'

const WelcomeMessage = () => {

  return (
    <>
      <div className='welcome-message-container'>
        <div className='welcome-message title'>
          <h1>
            Welcome to the Party!
          </h1>
        </div>
        <div className='welcome-message text'>
          Poll Party is a polling web app where users can:
          <div className='welcome-message text list'>
            1. Create poll questions
          </div >
          <div className='welcome-message text list'>
            2. Add custom voting options
          </div>
          <div className='welcome-message text list'>
            3. Vote on each other's polls
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomeMessage;