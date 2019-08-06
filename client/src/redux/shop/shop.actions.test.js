import ShopActionTypes from './shop.types';
import {
  fetchCollectionsStart,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
  fetchCollectionsStartAsync,
} from './shop.actions';

describe('Shop actions', () => {
  it('should return correct action when calling fetchCollectionsStart', () => {
    expect(fetchCollectionsStart().type).toEqual(
      ShopActionTypes.FETCH_COLLECTIONS_START,
    )
  });
});

describe('fetchCollectionsSuccess action', () => {
  it('should create the fetchCollectionsSuccess action', () => {
    const mockCollectionsMap = {
      hats: {
        id: 1
      }
    };
    expect(fetchCollectionsSuccess(mockCollectionsMap)).toEqual({
      type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
      payload: mockCollectionsMap,
    });

  });

});

describe('fetchCollectionsFailure action', () => {
  it('should create the fetchCollectionsFailure action', () => {
    const mockError = 'errored out';
    expect(fetchCollectionsFailure(mockError)).toEqual({
      type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
      payload: mockError,
    });
  });
});

describe('fetchCollectionsStartAsync action', () => {
  it('should create the fetchCollectionsStartAsync action', () => {
    const mockActionCreator = fetchCollectionsStartAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(fetchCollectionsStart());
  });
});