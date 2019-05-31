import React from 'react';
import { shallow } from 'enzyme';
import UserList from '../../components/UserList';
import { NextBtn, PrevBtn } from '../../components/UserList/style';

let increaseApiIndex, decreaseApiIndex, wrapper;

beforeEach(() => {
  increaseApiIndex = jest.fn();
  decreaseApiIndex = jest.fn();
  wrapper = shallow(
    <UserList
      increaseApiIndex={increaseApiIndex}
      decreaseApiIndex={decreaseApiIndex}
    />
  );
});

it('should render component properly', () => {
  expect(wrapper).toMatchSnapshot();
});

// it('should increase apiIndex onClick', () => {
//   expect(wrapper.find(NextBtn).length).toEqual(1);
//   wrapper.find(NextBtn).simulate('click');
//   expect(increaseApiIndex).toHaveBeenCalled();
// })

// it('should decrease apiIndex onClick', () => {
//   expect(wrapper.find(PrevBtn).length).toEqual(1);
//   wrapper.find(PrevBtn).simulate('click');
//   expect(decreaseApiIndex).toHaveBeenCalled();
// })
