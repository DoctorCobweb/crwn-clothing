import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import './App.css';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    // sets up a subscriber which will listen to changes to user state.
    // => don't have to manually fetch for a user's authentication.
    // aka and 'open' subscription.
    //
    // we also have to unsubscribe it later when our component unmounts
    //
    // we have to use the 'async' keyword here because createUserProfileDocument is async.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
            //console.log(snapShot.data());
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
      } else {
        // if user signs out the userAuth will be null/undefined.
        // reset the state
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    // close the firebase subscription when app closes.
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);