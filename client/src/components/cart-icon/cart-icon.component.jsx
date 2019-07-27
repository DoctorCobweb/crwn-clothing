import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { CartContainer, ShoppingIcon, ItemCountContainer } from './cart-icon.styles.jsx';
// import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <CartContainer onClick={toggleCartHidden}>
    <ShoppingIcon/>
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartContainer>
);

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});


export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);






// import React from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';


// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
// import { toggleCartHidden } from '../../redux/cart/cart.actions';
// import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

// import './cart-icon.styles.scss';

// const CartIcon = ({ toggleCartHidden, itemCount }) => (
//   <div className="cart-icon" onClick={toggleCartHidden}>
//     <ShoppingIcon className="shopping-icon" />
//     <span className="item-count">{itemCount}</span>
//   </div>
// );

// const mapStateToProps = createStructuredSelector({
//     itemCount: selectCartItemsCount
// })

// const mapDispatchToProps = dispatch => ({
//   toggleCartHidden: () => dispatch(toggleCartHidden()),
// });


// export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);