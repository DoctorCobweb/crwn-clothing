import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
// import CollectionPageContainer from '../collection/collection.container';

import Spinner from '../../components/spinner/spinner.component';

import {
  fetchCollectionsStart,
} from '../../redux/shop/shop.actions';

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));


const ShopPage = ({ match, fetchCollectionsStart }) => {
  
  // IMPORTANT CAVEAT: how to make useEffect act like componentDidMount class life-cycle method
  //
  // usually to mimick onComponentDidMount we pass an [] into useEffect.
  // it means useEffect will only be called once.
  //
  // but doing so will cause react to warn about needing to pass in something
  // to useEffect. also, if we do just use [] then useEffect will be triggered
  // everytime 
  // i) ShopPage rerenders
  // ii) props to ShopPage change
  // iii) if ShopPage had state via useState and state changed
  // iv) if ShopPage's parent rerenders
  //
  // when the app loads and we're on shop page we call fetchCollectionsStart() in useEffect
  // then our app checks for user login. if user is then it sets
  // currentUser in redux to be the user.
  //
  // since app component has currentUser as a prop, the change in currentUser causes app
  // component to re-render, which will cause ShopPage to re-render, which
  // causes the useEffect hook to fire again, which calls fetchCollectionsStart.
  // (try setting useEffect to have [] as second param, reload app and watch
  // the collections in shop page 'flicker' ie. load and then wipe screen to white, then load again)
  //
  // the following is a little hacky but circumvents this flickering behaviour:
  // put the action method in [], as below.
  //
  // so useEffect will fire on ShopPage component load, but only list for changes in
  // fetchCollectionsStart. but fetchCollectionsStart is a method which doesn't
  // change! so if parent App component rerenders due to signing a user in,
  // the useEffect hook wont re-fire..in.because it's only 'listening' to changes in
  // the value of the fetchCollectionsStart action, which by its very nature of just
  // being a 'hard coded' function, won't change.k
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart])

  return (
    <div className='shop-page'>
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>

    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);