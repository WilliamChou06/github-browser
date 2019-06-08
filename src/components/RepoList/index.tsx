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

const initialState = {
  userRepos: null,
  userRepoCount: 0,
  pageIndex: 1,
};

// Put initializing logic ouside of component for better
// readability
const initializeState = params => ({
  pageIndex: Number(params.page),
});

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case 'USER_REPOS':
      return { ...state, userRepos: action.repoData };
    case 'USER_REPO_COUNT':
      return { ...state, userRepoCount: action.repoCount };
    default:
      return state;
  }
};

const RepoList: React.FC<Props> = ({ match: { params }, history }) => {
  // Reducer hook
  const [{ userRepos, userRepoCount }, dispatch] = useReducer<
    React.Reducer<IState, IAction>
    // @ts-ignore
  >(reducer, initialState, () => initializeState(params));

  // Data fetching hook
  // Refetch repos if pageIndex has changed
  useEffect(() => {
    getUserRepoCount();
    getUserRepos();
  }, [params.page]);

  // Get repo count through the user data model
  const getUserRepoCount = async () => {
    try {
      const res = await axios.get(
        `https://api.github.com/users/${params.username}`
      );
      dispatch({
        type: ActionTypes.USER_REPO_COUNT,
        repoCount: res.data.public_repos,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getUserRepos = async () => {
    try {
      const res = await axios.get(
        `https://api.github.com/users/${params.username}/repos?client_id=${
          process.env.REACT_APP_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&page=${
          params.page
        }&per_page=8`
      );
      dispatch({ type: ActionTypes.USER_REPOS, repoData: res.data });
    } catch (err) {
      console.log(err.response);
    }
  };

  // Render Repos method
  const renderRepos = (): object[] =>
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
  const handleChange = (page: number): void => {
    history.push(`/user/${params.username}/repositories/${page}`);
  };

  return (
    <>
      <RepoListContainer>
        {userRepos && userRepos.length > 0 ? (
          <Suspense fallback={<div>Loading repos...</div>}>
            {renderRepos()}
          </Suspense>
        ) : (
          <Spinner />
        )}
        <StyledPagination
          current={Number(params.page)}
          onChange={handleChange}
          total={userRepoCount}
        />
      </RepoListContainer>
    </>
  );
};

export default RepoList;
