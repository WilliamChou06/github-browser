import React, { useReducer, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { UserListContainer, NextBtn, PrevBtn } from './style';
import Spinner from '../Spinner';
import Icon from 'antd/lib/icon';

// Lazy loading
const UserCard = lazy(() => import('../UserCard'));

// Actiontypes
enum ActionTypes {
  SET_USERS_DATA = 'SET_USERS_DATA',
  PREV_API_INDEX = 'PREV_API_INDEX',
  API_INDEX = 'API_INDEX',
}

// TypeScript interfaces
interface IState {
  usersData: any;
  apiIndex: number;
  prevApiIndex: number[];
}

interface IAction {
  type: ActionTypes;
  users?: object[];
  prevArr?: number[];
  index?: number;
}

// Initial store state
const initialState: IState = {
  usersData: null,
  apiIndex: 0,
  prevApiIndex: [],
};

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case 'SET_USERS_DATA':
      return { ...state, usersData: action.users };
    case 'PREV_API_INDEX':
      return { ...state, prevApiIndex: action.prevArr };
    case 'API_INDEX':
      return { ...state, apiIndex: action.index };
    default:
      return state;
  }
};

const UserList = () => {
  // Reducer hook
  const [{ usersData, apiIndex, prevApiIndex }, dispatch] = useReducer<
    React.Reducer<IState, IAction>
  >(reducer, initialState);

  // Re render component when apiIndex changes
  useEffect(() => {
    // Remove any duplicates found in prevApiIndex due to repetitive function calls
    // @ts-ignore
    const uniqPrevApiIndex = [...new Set(prevApiIndex)];
    dispatch({ type: ActionTypes.PREV_API_INDEX, prevArr: uniqPrevApiIndex });
    axios
      .get(
        `https://api.github.com/users?client_id=${
          process.env.REACT_APP_CLIENT_ID
        }&client_secret=${
          process.env.REACT_APP_CLIENT_SECRET
        }&since=${apiIndex}&per_page=8`
      )
      .then(res =>
        dispatch({ type: ActionTypes.SET_USERS_DATA, users: res.data })
      )
      .catch(err => console.log(err.response));
  }, [apiIndex]);

  // ApiIndex functions
  // GitHub API's user IDs are not completely straightforward so
  // an extra state hook and the following logic has been used

  // Fetch next batch and add previous apiIndex to prevApiIndex array
  const increaseApiIndex = () => {
    const lastUserId = usersData[usersData.length - 1].id;
    dispatch({ type: ActionTypes.API_INDEX, index: lastUserId });
    return dispatch({
      type: ActionTypes.PREV_API_INDEX,
      prevArr: [...prevApiIndex, apiIndex],
    });
  };

  // Fetch previous batch from prevApiIndex and delete last item in array
  const decreaseApiIndex = () => {
    dispatch({
      type: ActionTypes.API_INDEX,
      index: prevApiIndex[prevApiIndex.length - 1],
    });
    dispatch({
      type: ActionTypes.PREV_API_INDEX,
      prevArr: prevApiIndex.slice(0, -1),
    });
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
