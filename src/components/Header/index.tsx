import React from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import { StyledHeader } from './style';

const Header = ({location: {pathname}, match, history}) => {
  const renderHeaderText = () => {
    if(pathname.endsWith('repositories')) {
      const match = matchPath(pathname, {
        path: '/user/:username/repositories'
      });
      return `Viewing ${match.params.username}'s Repositories`
    }
    return 'User List'
    
  }

  return (
    <StyledHeader>
      {renderHeaderText()}
    </StyledHeader>
  );
};

export default withRouter(Header);