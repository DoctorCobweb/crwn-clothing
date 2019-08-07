import { put, takeLatest, call } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsAsync, fetchCollectionsStart, } from './shop.sagas';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import ShopActionTypes from './shop.types';

describe('fetchCollectionsStart start saga', () => {
  it('should trigger on FETCH_COLLECTIONS_START', () => {
    const generator = fetchCollectionsStart();
    const generatorOneStep = generator.next().value;

    expect(takeLatest(
      ShopActionTypes.FETCH_COLLECTIONS_START,
      fetchCollectionsAsync
    )).toEqual(generatorOneStep);
  });
});

describe('fetch collections async saga', () => {
  const generator = fetchCollectionsAsync();

  it('should call firestore collection', () => {
    const getCollection = jest.spyOn(firestore, 'collection');
    generator.next();
    expect(getCollection).toHaveBeenCalled()
  });

  it('should call convertCollectionsSnapshotToMap with snapshot', () => {
    const mockSnapshot = {};
    expect(generator.next(mockSnapshot).value).toEqual(
      call(convertCollectionsSnapshotToMap, mockSnapshot)
    );
  });

  it('should create the fetchCollectionsSuccess action', () => {
    const mockCollectionsMap = {
      'hats': {
        id: 1
      },
    };
    expect(generator.next(mockCollectionsMap).value).toEqual(
      put(fetchCollectionsSuccess(mockCollectionsMap))
    );
  });

  it('should fire fetchCollectionsFailure if get collections fails at any point', () => {
    const newGenerator = fetchCollectionsAsync();
    newGenerator.next();
    expect(newGenerator.throw({ message: 'error' }).value).toEqual(
      put(fetchCollectionsFailure('error'))
    );

  });

});