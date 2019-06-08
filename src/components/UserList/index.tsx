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
  NEXT_PAGE = 'NEXT_PAGE',
  PREV_PAGE = 'PREV_PAGE',
}

// TypeScript interfaces
interface IState {
  usersData: any;
  apiIndex: number;
  prevApiIndex: number[];
  isLoading: boolean;
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
  isLoading: false,
};

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USERS_DATA:
      return { ...state, usersData: action.users, isLoading: false };
    case ActionTypes.NEXT_PAGE:
      return {
        ...state,
        apiIndex: action.index,
        prevApiIndex: action.prevArr,
        isLoading: true,
      };
    case ActionTypes.PREV_PAGE:
      return {
        ...state,
        apiIndex: action.index,
        prevApiIndex: action.prevArr,
        isLoading: true,
      };
    default:
      return state;
  }
};

const UserList: React.FC = () => {
  // Reducer hook
  const [
    { usersData, apiIndex, prevApiIndex, isLoading },
    dispatch,
  ] = useReducer<React.Reducer<IState, IAction>>(reducer, initialState);

  // Re render component when apiIndex changes
  useEffect(() => {
    getUsers();
  }, [apiIndex]);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `https://api.github.com/users?client_id=${
          process.env.REACT_APP_CLIENT_ID
        }&client_secret=${
          process.env.REACT_APP_CLIENT_SECRET
        }&since=${apiIndex}&per_page=8`
      );
      dispatch({ type: ActionTypes.SET_USERS_DATA, users: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  // Render users
  const renderUsers = (): object[] =>
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
      <PrevBtn
        disabled={isLoading && apiIndex !== undefined}
        onClick={() =>
          dispatch({
            type: ActionTypes.PREV_PAGE,
            index: prevApiIndex[prevApiIndex.length - 1],
            prevArr: prevApiIndex.slice(0, -1),
          })
        }
      >
        <Icon type="left" />
      </PrevBtn>
      {usersData ? (
        <Suspense fallback={<div>Loading users...</div>}>
          {renderUsers()}
        </Suspense>
      ) : (
        <Spinner />
      )}
      <NextBtn
        disabled={isLoading && apiIndex !== undefined}
        onClick={() =>
          dispatch({
            type: ActionTypes.NEXT_PAGE,
            index: usersData[usersData.length - 1].id,
            prevArr: [...prevApiIndex, apiIndex],
          })
        }
      >
        <Icon type="right" />
      </NextBtn>
    </UserListContainer>
  );
};

export default UserList;
