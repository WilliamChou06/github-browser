import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { UserListContainer, NextBtn, PrevBtn } from './style';
import Spinner from '../Spinner';
import Icon from 'antd/lib/icon'

// Lazy loading
const UserCard = lazy(() => import('../UserCard'));


const UserList: React.FC = () => {
  const [usersData, setUsersData] = useState();
  const [apiIndex, setApiIndex] = useState(0);
  const [prevApiIndex, setPrevApiIndex] = useState();

  // Re render component when apiIndex changes
  useEffect(() => {
    axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&since=${apiIndex}&per_page=8`)
      .then(res => setUsersData(res.data))
      .catch(err => console.log(err.response))
  }, [apiIndex]);

  // ApiIndex functions
  // GitHub API's user IDs are not completely straightforward so 
  // an extra state hook and the following logic has been used
  const increaseApiIndex = () => {
    setPrevApiIndex(apiIndex);
    const lastUserId = usersData[usersData.length - 1].id;
    return setApiIndex(lastUserId);
  };

  const decreaseApiIndex = () => {
    setApiIndex(prevApiIndex);
  };

  // Render users
  const renderUsers = () => usersData.map(({ login, avatar_url, html_url, id }) => <Suspense fallback={<div>Loading...</div>}><UserCard key={id} username={login} avatarURL={avatar_url} githubURL={html_url} /></Suspense>);


  return (
    <UserListContainer>
      <PrevBtn onClick={decreaseApiIndex}><Icon type="left" /></PrevBtn>
      {usersData ? renderUsers() : <Spinner />}
      <NextBtn onClick={increaseApiIndex
      }><Icon type="right" /></NextBtn>
      {console.log(usersData)}
    </UserListContainer>
  );
}

export default UserList;
