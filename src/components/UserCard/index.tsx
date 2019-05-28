import React from 'react';
import { StyledUsernameTitle } from './style';

// antd imports
import Card from 'antd/lib/card';
import 'antd/lib/card/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

interface Props {
  avatarURL: string,
  username: string,
  githubURL: string
}

const UserCard = ({avatarURL, githubURL, username}: Props) => {
  return (
    <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="github-avatar"
        src={avatarURL}
      />
    }
    actions={[<a href={githubURL}><Icon type="github" /></a>, <Icon type="folder-open" />]}
  >
    <StyledUsernameTitle>{username}</StyledUsernameTitle>
  </Card>
  );
};

export default UserCard;