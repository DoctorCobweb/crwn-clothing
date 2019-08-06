import shopReducer from './shop.reducer';
import ShopActionTypes from './shop.types';

const initialState = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
}

describe('shopReducer tests', () => {
  it('should return initial state', () => {
    expect(shopReducer(undefined, {type: null })).toEqual(initialState);
  });

  it('should set isFetching to true when fetch collections starts', () => {
    expect(shopReducer(initialState, { type: ShopActionTypes.FETCH_COLLECTIONS_START }).isFetching).toBe(true)
  });

  it('should set isFetching to false and collections to payload if FETCH_COLLECTIONS_SUCCESS is fired', () => {
    const mockPayload = [{id:0}, {id:1}, {id:2}];
    expect(
      shopReducer(initialState, {
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: mockPayload}
      )).toEqual({
        ...initialState,
        isFetching: false,
        collections: mockPayload,
    });
  });

  it('should set errorMessage on state if FETCH_COLLECTIONS_FAILURE is fired', () => {
    expect(
      shopReducer(initialState, {
        type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: 'error'
      })
    ).toEqual({
      ...initialState,
      isFetching: false,
      errorMessage: 'error',
    });

  });

});