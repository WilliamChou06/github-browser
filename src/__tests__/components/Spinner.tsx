import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../components/Spinner';

it('should render component properly', () => {
  const wrapper = shallow(<Spinner />);
  expect(wrapper).toMatchSnapshot();
})