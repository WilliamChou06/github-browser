import React from 'react';
import { UsernameTitle, StyledCard } from './style';

// antd imports
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

interface Props {
  avatarURL: string,
  username: string,
  githubURL: string
}

const UserCard = ({avatarURL, githubURL, username}: Props) => {
  return (
    <StyledCard
    style={{ width: 300 }}
    cover={
      <img
        alt="github-avatar"
        src={avatarURL}
      />
    }
    actions={[<a href={githubURL} title="Github Profile" target="_blank" rel="noopener noreferrer" ><Icon type="github" /></a>, <Icon type="folder-open" />]}
  >
    <UsernameTitle>{username}</UsernameTitle>
  </StyledCard>
  );
};

export default UserCard;