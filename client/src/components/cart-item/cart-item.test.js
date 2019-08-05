import React from 'react';
import { shallow } from 'enzyme';

import { CartItem } from './cart-item.component';

describe('CartItem component tests', () => {
  let wrapper;
  const mockImageUrl = 'https://example.com/image';
  const mockName = 'shorts';
  const mockQuantity = 2;
  const mockPrice = 11;

  beforeEach(()=> {
    const mockItem = {
      imageUrl: mockImageUrl,
      name: mockName,
      quantity: mockQuantity,
      price: mockPrice,
    }

    wrapper = shallow(<CartItem item={mockItem} />)
  })

  it('CartItem component should match snapshot', ()=> {
    expect(wrapper.debug()).toMatchSnapshot();
  })

  it('CartItemImage should have correct imageUrl set as src', ()=> {
    expect(wrapper.find('CartItemImage').prop('src')).toBe(mockImageUrl);
  })

  it('NameContainer should have name set as its text', () => {
    expect(wrapper.find('NameContainer').text()).toBe(mockName);
  })

  it('PriceContainer should correctly display text', ()=>{
    const priceText = `$${mockQuantity} x ${mockPrice}`;
    expect(wrapper.find('PriceContainer').text()).toBe(priceText);
  })

})