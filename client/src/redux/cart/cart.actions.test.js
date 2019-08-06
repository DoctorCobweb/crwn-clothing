import CartActionTypes from './cart.types';
import {
  toggleCartHidden,
  addItem,
  removeItem,
  clearItemFromCart,
  clearCart,
} from './cart.actions';

describe('cart actions', () => {
  it('should create the toggleCartHidden action', () => {
    expect(toggleCartHidden().type).toEqual(CartActionTypes.TOGGLE_CART_HIDDEN);
  });

  it('should correctly set the payload of addItem action', () => {
    const mockItem = { id:1, name: 'blah' };
    expect(addItem(mockItem)).toEqual({
      type: CartActionTypes.ADD_ITEM,
      payload: mockItem,
    });
  });

  it('should correctly set the payload of removeItem action', () => {
    const mockItem = { id:1, name: 'blah' };
    expect(removeItem(mockItem)).toEqual({
      type: CartActionTypes.REMOVE_ITEM,
      payload: mockItem,
    });
  });

  it('should correctly set payload to itemto be cleared from cart', () => {
    const mockItem = { id:1, name: 'blah' };
    expect(clearItemFromCart(mockItem)).toEqual({
      type: CartActionTypes.CLEAR_ITEM_FROM_CART,
      payload: mockItem,
    });
  });

  it('should create the clearCart action', () => {
    expect(clearCart().type).toEqual(CartActionTypes.CLEAR_CART);
  });

});