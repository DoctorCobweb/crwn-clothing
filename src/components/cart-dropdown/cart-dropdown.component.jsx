import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

// see note below about default dispatch argument
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items" >
      {
        cartItems.length ? 
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
        :
        <span className="empty-message">Your cart is empty</span>
      }
    </div>
    <CustomButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});


// this swapped order also seems to work ?!
// export default connect(mapStateToProps, null)(withRouter(CartDropdown))

// DEFAULT dispatch ARGUMENT
// if you DONT add a mapDispatchToProps, redux actually sends in dispatch
// to props anyway. this allows for shorthand 'one-off' calls to
// dispatch if you need it, and not having to code up a separator
// mapDispatchToProps for some simple action.
export default withRouter(connect(mapStateToProps, null)(CartDropdown));