import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PollList from '../poll/PollList'

function User() {
  const [user, setUser] = useState({ 'polls': {} });
  const { userId } = useParams();
  let polls = Object.values(user?.polls);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className='list-container'>
        <div className='title'>
          <strong>{user.username}'s Polls:</strong>
        </div>
        <div className='list-container'>
          <PollList polls={polls} />
        </div>
      </div>
    </>
  );
}

export default User;
