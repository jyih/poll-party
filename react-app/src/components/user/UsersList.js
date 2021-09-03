import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <div key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </div>
    );
  });

  return (
    <div className='list-container'>
      <div className='title'>User List:</div>
      <div className='list'>{userComponents}</div>
    </div>
  );
}

export default UsersList;
