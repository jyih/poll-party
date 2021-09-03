import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PollList from '../poll/PollList'

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className='list-container'>
        <div className='title'>
          <strong>User: </strong> {user.username}
        </div>
        <div className='list'>
          <PollList polls={user.polls} />
        </div>
      </div>
    </>
  );
}

export default User;
