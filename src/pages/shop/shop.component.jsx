import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import {
  updateCollections,
  fetchCollectionsStartAsync,
} from '../../redux/shop/shop.actions';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';


class ShopPage extends React.Component {

  componentDidMount() {
    // console.log('componentWill mount shop.component method');
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  componentWillUnmount() {
  }

  render () {
    const { match } = this.props;
    // console.log('render shop.component method');

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />

        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);