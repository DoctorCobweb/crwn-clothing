import React from 'react';
import { shallow } from 'enzyme';

import { CheckoutPage } from './checkout.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

describe('Checkout component', () => {
  let wrapper;
  let mockCartItems;
  let mockTotal;

  beforeEach(() => {
    mockCartItems= [{id:0}, {id:1}, {id:2}, {id:3}, {id:4},];
    mockTotal = 10;
    const mockProps = {
      cartItems: mockCartItems,
      total: mockTotal,
    };
    wrapper = shallow(<CheckoutPage {...mockProps} />);
  });

  it('should render Checkout', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render correct number of CheckoutItem components', () => {
    expect(wrapper.find(CheckoutItem).length).toBe(mockCartItems.length);
  });

  it('should correctly set the total', () => {
    const totalText = wrapper.find('TotalContainer').childAt(0).text();
    expect(totalText).toBe(`$${mockTotal}`);
  });


});