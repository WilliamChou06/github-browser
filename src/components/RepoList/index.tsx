import React, { useReducer, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';

import { RepoListContainer, StyledPagination } from './style';
import Spinner from '../Spinner';

// Lazy loading
const RepoCard = lazy(() => import('../RepoCard'));

enum ActionTypes {
  USER_REPOS = 'USER_REPOS',
  USER_REPO_COUNT = 'USER_REPO_COUNT',
  PAGE_INDEX = 'PAGE_INDEX',
}
interface IState {
  userRepos: any;
  userRepoCount: number;
  pageIndex: number;
}

interface IAction {
  type: ActionTypes;
  repoData?: object[];
  repoCount?: number;
  index?: number;
}

interface Props {
  match: { params };
  history: { push };
}

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case 'USER_REPOS':
      return { ...state, userRepos: action.repoData };
    case 'USER_REPO_COUNT':
      return { ...state, userRepoCount: action.repoCount };
    case 'PAGE_INDEX':
      return { ...state, pageIndex: action.index };
    default:
      return state;
  }
};

const RepoList: React.FC<Props> = props => {
  // Reducer hook
  const [{ userRepos, userRepoCount, pageIndex }, dispatch] = useReducer<
    React.Reducer<IState, IAction>
  >(reducer, {
    userRepos: null,
    userRepoCount: 0,
    pageIndex: Number(props.match.params.page) || 1,
  });

  // Data fetching hook
  // Refetch repos if pageIndex has changed
  useEffect(() => {
    getUserRepoCount();
    getUserRepos();
  }, [pageIndex]);

  // Get repo count through the user data model
  const getUserRepoCount = () => {
    axios
      .get(`https://api.github.com/users/${props.match.params.username}`)
      .then(res =>
        dispatch({
          type: ActionTypes.USER_REPO_COUNT,
          repoCount: res.data.public_repos,
        })
      )
      .catch(err => console.log(err.response));
  };

  const getUserRepos = () => {
    axios
      .get(
        `https://api.github.com/users/${
          props.match.params.username
        }/repos?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${
          process.env.REACT_APP_CLIENT_SECRET
        }&page=${pageIndex}&per_page=8`
      )
      .then(res =>
        dispatch({ type: ActionTypes.USER_REPOS, repoData: res.data })
      )
      .catch(err => console.log(err.response));
  };

  // Render Repos method
  const renderRepos = () =>
    userRepos.map(({ html_url, forks, name, open_issues, description, id }) => (
      <RepoCard
        key={id}
        repoName={name}
        repoDescription={description}
        openIssues={open_issues}
        forks={forks}
        repoURL={html_url}
      />
    ));

  // Set pageindex on pagination change so it triggers request for next page
  const handleChange = page => {
    dispatch({ type: ActionTypes.PAGE_INDEX, index: page });
    props.history.push(
      `/user/${props.match.params.username}/repositories/${page}`
    );
  };

  return (
    <>
      <RepoListContainer>
        {userRepos ? (
          <Suspense fallback={<div>Loading repos...</div>}>
            {renderRepos()}{' '}
          </Suspense>
        ) : (
          <Spinner />
        )}
        <StyledPagination
          current={pageIndex}
          onChange={handleChange}
          total={userRepoCount}
        />
      </RepoListContainer>
    </>
  );
};

export default RepoList;
