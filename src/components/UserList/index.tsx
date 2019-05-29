import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../UserCard';
import { UserListContainer } from './style';

const UserList: React.FC = () => {
  const [usersData, setUsersData] = useState();

  useEffect(() => {
    axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
      .then((res) => setUsersData(res.data))
      .catch(err => console.log(err.response))
  })

  const renderUsers = () => {
    return usersData.map(({login, avatar_url, html_url}) => <UserCard username={login} avatarURL={avatar_url} githubURL={html_url} />)
  }

  return (
    <UserListContainer>
      {usersData && renderUsers()}
    </UserListContainer>
  );
}

export default UserList;
