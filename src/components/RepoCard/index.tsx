import React from 'react';
import { StyledCard, RepoIcons } from './style';

// antd imports
import Icon from 'antd/lib/icon';


interface Props {
  repoName: string
  repoDescription: string
  repoURL: string
  openIssues: number
  forks: number
}

const RepoCard = ({ repoName, repoDescription, repoURL, openIssues, forks }: Props) => {
  return (
    <StyledCard
      actions={[<a href={repoURL} title="Github Link" target="_blank" rel="noopener noreferrer" ><Icon type="github" /></a>, <RepoIcons>
        <span title="fork"><Icon type="fork" /> {forks}</span>
        <span title="issues"><Icon type="issues-close" /> {openIssues}</span>
      </RepoIcons>]}>
      <StyledCard.Meta
        title={repoName}
        description={repoDescription}
      />
    </StyledCard>
  );
};

export default RepoCard;