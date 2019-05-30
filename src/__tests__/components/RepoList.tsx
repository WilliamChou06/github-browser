import React from 'react';
import { shallow } from 'enzyme';
import RepoList from '../../components/RepoList';

it('should render component properly', () => {
  const wrapper = shallow(<RepoList match={{params: ''}} />);
  expect(wrapper).toMatchSnapshot();
})