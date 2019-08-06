import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { firestore } from '../../firebase/firebase.utils';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer 
} from './collection.styles.jsx';

export const CollectionPage = ({ collection }) => {

  // HERES HOW YOU HANDLE CLEANUP USING useEffect hook
  // => just a demo of functionality here. not needed for the app.
  useEffect(() => {
    console.log('i am subscribgin')
    const unsubscribeFromCollections = firestore.collection('collections').onSnapshot(snapshot => console.log(snapshot))
    return () => {
      console.log('im unsubbing');
      //cleanup function aka like componentWillUnmount
      unsubscribeFromCollections();
    }
  }, []);

  const { title, items } = collection;

  return (
    <CollectionPageContainer>
      <CollectionTitle>{title.toUpperCase()}</CollectionTitle>
      <CollectionItemsContainer >
      {
        items.map(item => <CollectionItem key={item.id} item={item} />)
      }
      </CollectionItemsContainer>
    </CollectionPageContainer>
  )
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);