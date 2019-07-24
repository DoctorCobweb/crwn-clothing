import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';

// special syntax for svg importing to make a **component**
// https://facebook.github.io/create-react-app/docs/adding-images-fonts-and-files 
// the ReactComponent import name is special and tells Create React App (CRA)
// that you want a React component that renders an SVG, rather that its filename.
// nb. this is a CRA special syntax
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';
// import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">
        SHOP
      </OptionLink>
      <OptionLink to="/contact">
        CONTACT 
      </OptionLink>
      {
        currentUser ?
        <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
        :
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      }
      <CartIcon />
    </OptionsContainer>
    {
      hidden ? null : <CartDropdown />
    }
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);