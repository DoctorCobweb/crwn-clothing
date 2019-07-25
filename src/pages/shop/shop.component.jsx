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
  // needed for the Observer pattern
  // state = {
  //   loading: true,
  // };
  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    console.log('componentWill mount shop.component method');
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();


    // using the Observer pattern
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection('collections');
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

    //   // console.log('asdf');
    //   // console.log(snapshot);
    //   // console.log('collectionsMap');
    //   // console.log(collectionsMap);

    //   updateCollections(collectionsMap);
    //   this.setState({loading: false});
    // });
  }

  componentWillUnmount() {
     // for the Observer pattern
    // this.unsubscribeFromSnapshot();
  }

  render () {
    const { match } = this.props;
    console.log('render shop.component method');

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
  // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);