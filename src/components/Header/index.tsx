import React from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import Icon from 'antd/lib/icon';
import { StyledHeader, HeaderReturn, } from './style';

const Header = ({ location: { pathname }, history }) => {
  const renderHeaderText = () => {
    // Render text according to pathname
    if (matchRepoURL()) {
      const match = matchPath(pathname, {
        path: '/user/:username/repositories'
      });
      return `Viewing ${match.params.username}'s Repositories`
    }
    return 'User List'

  }

  // Pathname regex matcher
  const matchRepoURL = () => {
    if (pathname.match(/\w*repositories\b/) || pathname.match(/\w*repositories\/[0-9]\b/)) {
      return true;
    }
    return false;
  }

  return (
    <StyledHeader>
      {matchRepoURL() &&
        <HeaderReturn onClick={() => history.push('/')}>
          <Icon type="left" />
        </HeaderReturn>}
      {renderHeaderText()}
    </StyledHeader>
  );
};

export default withRouter(Header);