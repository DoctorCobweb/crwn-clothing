import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
  collections: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      const something = {
        ...state,
        collections: action.payload,
      };
      return something;
    default:
      return state;
  }
};

export default shopReducer;