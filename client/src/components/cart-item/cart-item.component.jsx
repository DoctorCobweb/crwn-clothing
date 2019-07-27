import React from 'react';

import {
  CartItemContainer,
  CartItemImage,
  ItemDetailsContainer,
  NameContainer,
  PriceContainer 
} from './cart-item.styles.jsx';
// import './cart-item.styles.scss';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={imageUrl} alt="item" />
    <ItemDetailsContainer>
      <NameContainer>{name}</NameContainer>
      <PriceContainer>${quantity} x {price}</PriceContainer>
    </ItemDetailsContainer>
  </CartItemContainer>
);

// const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
//   <div className="cart-item">
//     <img src={imageUrl} alt="item" />
//     <div className="item-details">
//       <span className="name">{name}</span>
//       <span className="price">${quantity} x {price}</span>
//     </div>
//   </div>
// );

export default CartItem;