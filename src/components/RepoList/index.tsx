import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';

import { RepoListContainer, StyledPagination } from './style';
import Spinner from '../Spinner';


// Lazy loading
const RepoCard = lazy(() => import('../RepoCard'));

interface Props {
  match: { params }
}

const RepoList = (props: Props) => {
  // State hooks
  const [userRepos, setUserRepos] = useState();
  const [userRepoCount, setUserRepoCount] = useState();
  const [pageIndex, setPageIndex] = useState(props.match.params.page || 1);

  // Data fetching hook
  // Refetch repos if pageIndex has changed
  useEffect(() => {
    getUserRepoCount();
    getUserRepos();
  }, [pageIndex]);

  // Get repo count through the user data model
  const getUserRepoCount = () => {
    axios.get(`https://api.github.com/users/${props.match.params.username}`)
      .then(res => setUserRepoCount(res.data.public_repos))
      .catch(err => console.log(err.response))
  }

  const getUserRepos = () => {
    axios.get(`https://api.github.com/users/${props.match.params.username}/repos?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&page=${pageIndex}&per_page=8`)
      .then(res => setUserRepos(res.data))
      .catch(err => console.log(err.response))
  }

  // Render Repos method
  const renderRepos = () => userRepos.map(({ html_url, forks, name, open_issues, description, id }) => <Suspense key={id} fallback={<div>Loading...</div>}><RepoCard key={id} repoName={name} repoDescription={description} openIssues={open_issues} forks={forks} repoURL={html_url} /></Suspense>);

  // Set pageindex on pagination change so it triggers request for next page
  const handleChange = (page) => {
    setPageIndex(page);
    window.history.pushState(null, '', `/user/${props.match.params.username}/repositories/${page}`);
  }

  return (
    <>
      <RepoListContainer>
        {userRepos ? renderRepos() : <Spinner />}
        <StyledPagination current={pageIndex} onChange={handleChange} total={userRepoCount} />
      </RepoListContainer>
    </>

  );
}

export default RepoList;
