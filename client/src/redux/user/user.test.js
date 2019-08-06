import userReducer from './user.reducer';
import UserActionTypes from './user.types';

const initialState = {
  currentUser: null,
  error: null,
}

describe('userReducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should set currentUser after sign in success', () => {
    const mockUser = { id:0, name: 'blah' };
    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: mockUser
      })
    ).toEqual({
      ...initialState,
      currentUser: mockUser,
    });
  });

  it('should set currentUser after sign up success', () => {
    const mockUser = { id:0, name: 'blah' };
    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGN_UP_SUCCESS,
        payload: mockUser
      })
    ).toEqual({
      ...initialState,
      currentUser: mockUser,
    });
  });

  it('should set currentUser to null after sign out', () => {
    const mockState  = {
      ...initialState,
      currentUser: {id:0, name: 'blah' }
    };
    expect(
      userReducer(mockState, {
        type: UserActionTypes.SIGN_OUT_SUCCESS,
      })
    ).toEqual({
      ...mockState,
      currentUser: null,
    });
  });

  it('should set error message when *_FAILURE action types are called', () => {
    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGN_IN_FAILURE,
        payload: 'error message',
      })
    ).toEqual({
      ...initialState,
      error: 'error message',
    });

    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGN_UP_FAILURE,
        payload: 'error message',
      })
    ).toEqual({
      ...initialState,
      error: 'error message',
    });

    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGN_OUT_FAILURE,
        payload: 'error message',
      })
    ).toEqual({
      ...initialState,
      error: 'error message',
    });
  });
});