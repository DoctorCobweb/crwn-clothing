import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';


import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});


// thunk: action creator that returns a function that gets the dispatch
//
// NOTE: i don't think this is used anymore since we've switched over to sagas
// to handle async actions
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection('collections');

    // synchronous code
    dispatch(fetchCollectionsStart());

    // asynchronous code
    // using promises to get data
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(error => {
      dispatch(fetchCollectionsFailure(error.message))
    });
  };
};

