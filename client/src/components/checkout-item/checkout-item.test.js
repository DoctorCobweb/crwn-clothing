import React from 'react';
import { shallow } from 'enzyme';

import { CheckoutItem } from './checkout-item.component';

describe('CheckoutItem component tests', () => {
  let wrapper;
  const mockImageUrl = 'https://example.com/image1';
  const mockName = 'shorts';
  const mockPrice = 11;
  const mockQuantity = 2;
  let mockAddItem;
  let mockClearItem;
  let mockRemoveItem;
  
  beforeEach(()=>{
    const mockCartItem = {
      imageUrl: mockImageUrl,
      name: mockName,
      quantity: mockQuantity,
      price: mockPrice,
    }
    mockAddItem = jest.fn();
    mockClearItem = jest.fn();
    mockRemoveItem = jest.fn();

    wrapper = shallow(
      <CheckoutItem
        cartItem={mockCartItem}
        addItem={mockAddItem}
        clearItem={mockClearItem}
        removeItem={mockRemoveItem}
      />
    )
  });

  it('CheckoutItem should match snapshot',()=>{
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('ImageContainer should have its child <img> src prop correctly set', ()=>{
    const newWrapper = wrapper.find('ImageContainer').childAt(0); 
    expect(newWrapper.prop('src')).toBe(mockImageUrl);
  });

  it('first TextContainer should have its text set', () => {
    expect(wrapper.find('TextContainer').at(0).text()).toBe(mockName);
  });

  it('second TextContainer should have its text set', () => {
    const priceVal = parseInt(wrapper.find('TextContainer').at(1).text())
    expect(priceVal).toBe(mockPrice);
  });

  it('clearItem is called when RemoveButtonContainer is clicked',() => {
    wrapper.find('RemoveButtonContainer').simulate('click');
    expect(mockClearItem).toHaveBeenCalled();
  });

  it('removeItem is called when clicking to remove item', ()=>{
    wrapper.find('QuantityContainer').childAt(0).simulate('click');
    expect(mockRemoveItem).toHaveBeenCalled();
  });

  it('addItem is called when clicking to add item', ()=>{
    wrapper.find('QuantityContainer').childAt(2).simulate('click');
    expect(mockAddItem).toHaveBeenCalled();
  });

  it('addItem is called when clicking to add item', ()=>{
    const renderedQuantity = parseInt(wrapper.find('QuantityContainer').childAt(1).text());
    expect(renderedQuantity).toEqual(mockQuantity);
  });

})