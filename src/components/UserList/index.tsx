import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../UserCard';
import { UserListContainer, NextButton, PreviousButton } from './style';
import Spinner from '../Spinner';
import Icon from 'antd/lib/icon'


const UserList: React.FC = () => {
  const [usersData, setUsersData] = useState();
  const [apiIndex, setApiIndex] = useState(0);

  useEffect(() => {
    axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&since=${apiIndex}&per_page=8`)
      .then(res => setUsersData(res.data))
      .catch(err => console.log(err.response))
  }, [apiIndex]);

  const increaseApiIndex = () => setApiIndex(apiIndex + 9)

  const decreaseApiIndex = () => apiIndex >= 9 && setApiIndex(apiIndex - 9)

  const renderUsers = () => usersData.map(({ login, avatar_url, html_url }) => <UserCard username={login} avatarURL={avatar_url} githubURL={html_url} />);


  return (
    <UserListContainer>
      <PreviousButton onClick={decreaseApiIndex}><Icon type="left" /></PreviousButton>
      {usersData ? renderUsers() : <Spinner />}
      <NextButton onClick={increaseApiIndex
      }><Icon type="right" /></NextButton>
    </UserListContainer>
  );
}

export default UserList;
