import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem  from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';


import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer 
} from './checkout.styles.jsx';
// import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total}) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span></span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Remove</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    { 
      cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
    }
    <TotalContainer>
      <span>${total}</span>
    </TotalContainer>
    <WarningContainer>
      *Please the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
    </WarningContainer>
    <StripeCheckoutButton price={total} />

  </CheckoutPageContainer>
);

// const CheckoutPage = ({ cartItems, total}) => (
//   <div className="checkout-page">
//     <div className="checkout-header">
//       <div className="header-block">
//         <span>Product</span>
//       </div>
//       <div className="header-block">
//         <span>Description</span>
//       </div>
//       <div className="header-block">
//         <span>Quantity</span>
//       </div>
//       <div className="header-block">
//         <span></span>
//       </div>
//       <div className="header-block">
//         <span>Remove</span>
//       </div>
//     </div>
//     { 
//       cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
//     }
//     <div className="total">
//       <span>${total}</span>
//     </div>
//     <div className="test-warning">
//       *Please the following test credit card for payments*
//       <br />
//       4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
//     </div>
//     <StripeCheckoutButton price={total} />

//   </div>
// );

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);