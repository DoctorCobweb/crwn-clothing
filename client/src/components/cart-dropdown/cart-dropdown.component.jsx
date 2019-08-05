import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessageContainer,
  CartDropdownButton
} from './cart-dropdown.styles.jsx';

// see note below about default dispatch argument
export const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {
        cartItems.length ? 
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
        :
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      }
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

// NOTE:
// this swapped order does NOT work. you don't get the history, match and path properties
// inside of mapStateToProps 
// export default connect(mapStateToProps, null)(withRouter(CartDropdown))

// DEFAULT dispatch ARGUMENT
// if you DONT add a mapDispatchToProps, redux actually sends in dispatch
// to props anyway. this allows for shorthand 'one-off' calls to
// dispatch if you need it, and not having to code up a separator
// mapDispatchToProps for some simple action.
export default withRouter(connect(mapStateToProps, null)(CartDropdown));