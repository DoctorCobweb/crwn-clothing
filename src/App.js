import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import './App.css';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser, collectionsArray } = this.props;

    // sets up a subscriber which will listen to changes to user state.
    // => don't have to manually fetch for a user's authentication.
    // aka and 'open' subscription.
    //
    // we also have to unsubscribe it later when our component unmounts
    //
    // we have to use the 'async' keyword here because createUserProfileDocument is async.
    //
    // auth.onAuthStateChanged is an observable and the function we pass into it is
    // the 'next' function for the Observer Pattern:
    // an observer is of form:
    // { 
    //    next: (nextVal) => { do something with the value},
    //    error: (error) => {handle error},
    //    complete: () => {do something when finished}
    // }
    // 
    // so the async userAuth => {} func is the 'next' func in the above pattern.

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


      // UNCOMMENT TO ADDED ALL COLLECTION DATA TO FIRESTORE
      // const added = await addCollectionAndDocuments(
      //   'collections',
      //   collectionsArray.map(({title, items}) => ({title, items}))
      // );
      // console.log('added:  ', added)
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
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);