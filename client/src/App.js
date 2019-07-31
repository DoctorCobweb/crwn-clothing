import React, { useEffect, lazy, Suspense } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';


import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

// got to use with Suspense component
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const CheckoutPage= lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage= lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
        <ErrorBoundary>
      <Switch>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() => 
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          </Suspense>
      </Switch>
        </ErrorBoundary>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);