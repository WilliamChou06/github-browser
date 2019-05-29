import React from 'react';
import { Link } from 'react-router-dom';
import { UsernameTitle, StyledCard } from './style';

// antd imports
import Icon from 'antd/lib/icon';

interface Props {
  avatarURL: string,
  username: string,
  githubURL: string,
}

const UserCard = ({avatarURL, githubURL, username}: Props) => {
  return (
    <StyledCard
    cover={
      <img
        alt="github-avatar"
        src={avatarURL}
      />
    }
    actions={[<a href={githubURL} title="Github Profile" target="_blank" rel="noopener noreferrer" ><Icon type="github" /></a>, <Link to={`/user/${username}/repositories`}><Icon type="folder-open" /></Link>]}
  >
    <UsernameTitle>Username: {username}</UsernameTitle>
  </StyledCard>
  );
};

export default UserCard;