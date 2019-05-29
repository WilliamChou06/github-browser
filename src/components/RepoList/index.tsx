import React, { useState, useEffect, lazy } from 'react';
import axios from 'axios';
import RepoCard from '../RepoCard';
import { RepoListContainer } from './style';
import Spinner from '../Spinner';

import Pagination from 'antd/lib/pagination';
import 'antd/lib/pagination/style/css'


const RepoList = (props) => {
  const [userRepos, setUserRepos] = useState();

  useEffect(() => {
  axios.get(`https://api.github.com/users/${props.match.params.username}/repos?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&page=1&per_page=8`)
      .then(res => {
        console.log(res)
        return setUserRepos(res.data)})
      .catch(err => console.log(err.response))
  }, [])

  const renderRepos = () => userRepos.map(({ html_url, forks, name, open_issues, description }) => <RepoCard repoName={name} repoDescription={description} openIssues={open_issues} forks={forks} repoURL={html_url} />);


  return (
    <>
      <RepoListContainer>
        {userRepos ? renderRepos() : <Spinner />}
        <Pagination />
      </RepoListContainer>
      
    </>

  );
}

export default RepoList;
