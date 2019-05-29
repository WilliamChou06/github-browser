import React from 'react';
import { shallow } from 'enzyme';
import UserCard from '../../components/UserCard';

it('should render component properly', () => {
  const wrapper = shallow(<UserCard key={123} username={'michael'} avatarURL={''} githubURL={'http://github.com/user/michael'} />);
  expect(wrapper).toMatchSnapshot();
})