import React from 'react';
import { Link } from 'react-router-dom';
import { UsernameTitle, StyledCard } from './style';

// antd imports
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

interface Props {
  avatarURL: string,
  username: string,
  githubURL: string,
  userID: number
}

const UserCard = ({avatarURL, githubURL, username, userID}: Props) => {
  return (
    <StyledCard
    style={{ width: 300 }}
    cover={
      <img
        alt="github-avatar"
        src={avatarURL}
      />
    }
    actions={[<a href={githubURL} title="Github Profile" target="_blank" rel="noopener noreferrer" ><Icon type="github" /></a>, <Link to={`/user/${userID}/repositories`}><Icon type="folder-open" /></Link>]}
  >
    <UsernameTitle>Username: {username}</UsernameTitle>
  </StyledCard>
  );
};

export default UserCard;