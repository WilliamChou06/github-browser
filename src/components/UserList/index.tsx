import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { UserListContainer, NextBtn, PrevBtn } from './style';
import Spinner from '../Spinner';
import Icon from 'antd/lib/icon';

// Lazy loading
const UserCard = lazy(() => import('../UserCard'));

const UserList: React.FC = () => {
  const [usersData, setUsersData] = useState();
  const [apiIndex, setApiIndex] = useState(0);
  const [prevApiIndex, setPrevApiIndex] = useState([]);

  // Re render component when apiIndex changes
  useEffect(() => {
    // Remove any duplicates found in prevApiIndex due to repetitive function calls
    // @ts-ignore
    const uniqPrevApiIndex = [...new Set(prevApiIndex)];
    setPrevApiIndex(uniqPrevApiIndex);
    axios
      .get(
        `https://api.github.com/users?client_id=${
          process.env.REACT_APP_CLIENT_ID
        }&client_secret=${
          process.env.REACT_APP_CLIENT_SECRET
        }&since=${apiIndex}&per_page=8`
      )
      .then(res => setUsersData(res.data))
      .catch(err => console.log(err.response));
  }, [apiIndex]);

  // ApiIndex functions
  // GitHub API's user IDs are not completely straightforward so
  // an extra state hook and the following logic has been used

  // Fetch next batch and add previous apiIndex to prevApiIndex array
  const increaseApiIndex = () => {
    const lastUserId = usersData[usersData.length - 1].id;
    setApiIndex(lastUserId);
    return setPrevApiIndex([...prevApiIndex, apiIndex]);
  };

  // Fetch previous batch from prevApiIndex and delete last item in array
  const decreaseApiIndex = () => {
    setApiIndex(prevApiIndex[prevApiIndex.length - 1]);
    setPrevApiIndex(prevApiIndex.slice(0, -1));
  };

  // Render users
  const renderUsers = () =>
    usersData.map(({ login, avatar_url, html_url, id }) => (
      <UserCard
        key={id}
        username={login}
        avatarURL={avatar_url}
        githubURL={html_url}
      />
    ));

  return (
    <UserListContainer>
      <PrevBtn onClick={decreaseApiIndex}>
        <Icon type="left" />
      </PrevBtn>
      {usersData ? (
        <Suspense fallback={<div>Loading users...</div>}>
          {renderUsers()}
        </Suspense>
      ) : (
        <Spinner />
      )}
      <NextBtn onClick={increaseApiIndex}>
        <Icon type="right" />
      </NextBtn>
    </UserListContainer>
  );
};

export default UserList;
