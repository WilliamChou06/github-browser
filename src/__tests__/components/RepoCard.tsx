import React from 'react';
import { shallow } from 'enzyme';
import RepoCard from '../../components/RepoCard';

it('should render component properly', () => {
  const wrapper = shallow(
    <RepoCard
      key={3}
      repoName={'abcd'}
      repoDescription={'this is a repo'}
      openIssues={2}
      forks={4}
      repoURL={'https://github.com/vanpelt/amqp'}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
