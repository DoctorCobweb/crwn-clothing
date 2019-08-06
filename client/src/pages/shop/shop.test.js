import React from 'react';
import { shallow, mount } from 'enzyme';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ShopPage } from './shop.component';

// because ShopPage uses hooks we need to change the way we test it.
// when using enzyme, we need to render the component using 'mount', instead of 'shallow'.
// this requires us to setup all of the infrastructure associated with fully
// rendering and mounting the component in the DOM.
// ShopPage uses the store, so we have to create a mock store, and stuff required for redux
// to function properly ie. a mock reducer, mock state.
// nb. the app also uses a persistor for storing cart data in localStorage, so we have to
// fake a persistor for the mockStore also.
//
// checkout index.js to see how the below mounting mirrows what index.js renders.
//
// i dont understand all this 100%, just following along with course material at this stage.

export const createMockStore = ({ state, reducers }) => {
  const store = createStore(combineReducers(reducers), state);
  return {
    ...store,
    persistor: {
      persist: () => null,
    }
  };
};

describe('ShopPage component', () => {
  let wrapper;
  let store;
  let mockFetchCollectionsStart;

  beforeEach(() => {
    const mockReducer = (state = { isFetching: true }, action) => state;
    const mockState = { shop: { isFetching: true } };
    mockFetchCollectionsStart = jest.fn();

    store = createMockStore({
      state: mockState,
      reducers: { shop: mockReducer },
    });

    const mockMatch = {
      path: '',
    };

    const mockProps = {
      match: mockMatch,
      fetchCollectionsStart: mockFetchCollectionsStart,
    };
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ShopPage {...mockProps} />
        </Provider>
      </BrowserRouter>
    );
  })

  it('should render ShopPage', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should call fetchCollectionsStart on render', () => {
    expect(mockFetchCollectionsStart).toHaveBeenCalled();
  });

});