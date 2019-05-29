import React from 'react';
import { shallow } from 'enzyme';
import UserList from '../../components/UserList';

it('should render component properly', () => {
  const wrapper = shallow(<UserList />);
  expect(wrapper).toMatchSnapshot();
})