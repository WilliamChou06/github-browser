import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RepoCard from '../RepoCard';
import { RepoListContainer } from './style';

const RepoList = (props) => {
  const [userRepos, setUserRepos] = useState();

  useEffect(() => {
    axios.get(`https://api.github.com/users/${props.match.params.username}/repos?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
      .then(res => setUserRepos(res.data))
      .catch(err => console.log(err.response))
  }, [])

  const renderRepos = () => userRepos.map(({ html_url, forks, name, open_issues, description }) => <RepoCard repoName={name} repoDescription={description} openIssues={open_issues} forks={forks} repoURL={html_url} />);


  return (
    <>
    <h1>Seeing {props.match.params.username}'s REPOS</h1>
    <RepoListContainer>
      {userRepos && renderRepos()}
    </RepoListContainer>
    </>
    
  );
}

export default RepoList;
