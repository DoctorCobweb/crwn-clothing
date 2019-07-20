import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {

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
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            }
          }, () => {
            console.log(this.state);
          });
        });
      } else {
        this.setState({ currentUser: userAuth });

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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
