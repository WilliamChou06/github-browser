import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../UserCard'

const UserList: React.FC = () => {
  const [usersData, setUsersData] = useState();

  useEffect(() => {
    axios.get('https://api.github.com/users')
      .then((res) => setUsersData(res.data))
  })

  const renderUsers = () => {
    return usersData.map(({login, avatar_url, html_url}) => <UserCard username={login} avatarURL={avatar_url} githubURL={html_url} />)
  }

  return (
    <div className="UserList">
      {usersData && renderUsers()}
    </div>
  );
}

export default UserList;
