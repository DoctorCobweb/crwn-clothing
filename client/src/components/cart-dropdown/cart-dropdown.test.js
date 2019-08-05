import React from 'react';
import { shallow } from 'enzyme';
import { CartDropdown } from './cart-dropdown.component';
import CartItem from '../cart-item/cart-item.component';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

describe('CartDropdown component tests', ()=> {
  let mockCartItems;
  let mockHistory;
  let mockDispatch;
  let wrapper;

  beforeEach(() => {
    mockCartItems = [{id:1}, {id:2}, {id:3}]
    mockHistory = {
      push: jest.fn(),
    }
    mockDispatch = jest.fn();
    const mockProps = {
      cartItems: mockCartItems,
      history: mockHistory,
      dispatch: mockDispatch,
    }
    wrapper = shallow( <CartDropdown {...mockProps} />)
  })

  it('CartDropdown should match snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  })

  it('should call history.push when button is clicked', () => {
    wrapper.find('CartDropdownButton').simulate('click')
    expect(mockHistory.push).toHaveBeenCalled();
    expect(mockHistory.push).toHaveBeenCalledWith('/checkout');
    expect(mockDispatch).toHaveBeenCalledWith(toggleCartHidden());
  })

  it('should render an equal number of CartItem components as the cartItems prop', () => {
    expect(wrapper.find(CartItem).length).toEqual(mockCartItems.length);
  })

  it('should render EmptyMessageContainer is cartItems is empty', () => {
    const mockProps = {
      cartItems: [],
      history: mockHistory,
      dispatch: mockDispatch,
    }
    const newWrapper = shallow( <CartDropdown {...mockProps} />)

    // expect(newWrapper.find('EmptyMessageContainer').length).toEqual(1);
    expect(newWrapper.exists('EmptyMessageContainer')).toBe(true);
  })

})