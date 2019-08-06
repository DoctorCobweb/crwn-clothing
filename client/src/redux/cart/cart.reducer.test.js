import CartActionTypes from './cart.types';
import cartReducer from './cart.reducer';

const initialState = {
  hidden: true,
  cartItems: [],
};

describe('cartReducer', () => {
  it('should return initial state', () => {
    expect(cartReducer(undefined, { type: null })).toEqual(initialState);
  });

  it('should toggle hidden with toggleHidden action', () => {
    expect(
      cartReducer(initialState, { type: CartActionTypes.TOGGLE_CART_HIDDEN })
        .hidden
    ).toBe(false);
  });

  it('should increase quantity of item by 1 when addItem action is fired', () => {
    const newItem = {id:0};
    expect(cartReducer(initialState, { type: CartActionTypes.ADD_ITEM, payload: newItem}).cartItems.length).toBe(1);
  });

  it('correctly set quantity for adding an item to cart, which is already in cart', () => {
    const mockItem = {
      id: 1,
      quantity: 3,
    };

    const mockPrevState = {
      hidden: true,
      cartItems: [mockItem, { id:2, quatity:1 }],
    };

    expect(
      cartReducer(mockPrevState, {
        type: CartActionTypes.ADD_ITEM,
        payload: mockItem
      }).cartItems[0].quantity
    ).toBe(4);

  });

  it('correctly decrease quantity by 1 for removing an item from cart, which is already in cart', () => {
    const mockItem = {
      id: 1,
      quantity: 3,
    };

    const mockPrevState = {
      hidden: true,
      cartItems: [mockItem, { id:2, quatity:1 }],
    };

    expect(
      cartReducer(mockPrevState, {
        type: CartActionTypes.REMOVE_ITEM,
        payload: mockItem
      }).cartItems[0].quantity
    ).toBe(2);
  });

  it('correctly remove item completely from cart', () => {
    const mockItem = {
      id: 1,
      quantity: 3,
    };

    const mockPrevState = {
      hidden: true,
      cartItems: [mockItem, { id:2, quatity:1 }],
    };

    expect(
      cartReducer(mockPrevState, {
        type: CartActionTypes.CLEAR_ITEM_FROM_CART,
        payload: mockItem
      }).cartItems.includes(item => item.id === mockItem.id)
    ).toBe(false);
  });

  it('correctly clear cart', () => {
    const mockPrevState = {
      hidden: true,
      cartItems: [{ id:2, quatity:1 }, {id:3, quantity:5}, {id:4, quantity:2}],
    };

    expect(
      cartReducer(mockPrevState, {
        type: CartActionTypes.CLEAR_CART,
      }).cartItems.length
    ).toBe(0);
  });

});