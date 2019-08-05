import React from 'react';
import { shallow } from 'enzyme';
import { CartIcon } from './cart-icon.component';

describe('CartIcon component', () => {
  let wrapper;
  let toggleCartHidden;
  const mockItemCount = 10;

  beforeEach(() => {
    toggleCartHidden = jest.fn();
    const mockProps = {
      toggleCartHidden,
      itemCount: mockItemCount,
    };

    wrapper = shallow(<CartIcon {...mockProps} />);
  });

  it('should render CartIcon component', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should call toggleCartHidden fn', () => {
    wrapper.find('CartContainer').simulate('click');
    expect(toggleCartHidden).toHaveBeenCalled();
  });

  it('ItemCountContainer should have item count = 10 as its text', () => {
    const itemCount = parseInt(wrapper.find('ItemCountContainer').text())
    expect(itemCount).toBe(mockItemCount)
  })
})