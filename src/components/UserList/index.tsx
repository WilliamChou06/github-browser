import React from 'react';
import UserCard from '../UserCard'

const UserList: React.FC = () => {
  return (
    <div className="UserList">
      <UserCard avatarURL="https://avatars0.githubusercontent.com/u/1?v=4" username="hello" githubURL="asdasdasd" />
    </div>
  );
}

export default UserList;
