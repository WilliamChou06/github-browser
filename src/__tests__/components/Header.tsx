import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

it('should render component properly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
