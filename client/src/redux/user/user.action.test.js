import UserActionTypes from './user.types';

import {
  googleSignInStart,
  signInSuccess,
  signInFailure,
  emailSignInStart,
  checkUserSession,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from './user.actions';

describe('googleSignInStart action', () => {
  it('should create correct action type', () => {
    expect(googleSignInStart().type).toBe(UserActionTypes.GOOGLE_SIGN_IN_START)
  });
});

describe('sign in actions', () => {
  it('should create the signInSuccess action on success', () => {
    const mockUser = {
      id: 1,
      name: 'Blah',
    };
    expect(signInSuccess(mockUser)).toEqual({
      type: UserActionTypes.SIGN_IN_SUCCESS,
      payload: mockUser,
    });
  });

  it('should creat signInFailure action on failure', () => {
    const mockError = 'mockError';
    expect(signInFailure(mockError)).toEqual({
      type: UserActionTypes.SIGN_IN_FAILURE,
      payload: mockError,
    });
  });

  it('email sign in start action should be correctly created', () => {
    const mockEmailAndPassword = {
      email: 'blah@blah.com',
      password: '1234',
    };
    expect(emailSignInStart(mockEmailAndPassword)).toEqual({
      type: UserActionTypes.EMAIL_SIGN_IN_START,
      payload: mockEmailAndPassword,
    });
  });
});

describe('check user session', () => {
  it('should create the checkUserSession action', () => {
    expect(checkUserSession().type).toEqual(UserActionTypes.CHECK_USER_SESSION);
  });
});

describe('sign out actions', () => {
  it('should create signOutStart action', () => {
    expect(signOutStart().type).toEqual(UserActionTypes.SIGN_OUT_START);
  });

  it('should create signOutSuccess action', () => {
    expect(signOutSuccess().type).toEqual(UserActionTypes.SIGN_OUT_SUCCESS);
  });

  it('should create signOutFailure action', () => {
    const mockFailure = 'error';
    expect(signOutFailure(mockFailure)).toEqual({
      type: UserActionTypes.SIGN_OUT_FAILURE,
      payload: mockFailure,
    })
  });
});

describe('sign up actions', () => {
  it('should create signUpStart action', () => {
    const mockUserCredentials = {
      name: 'Blah',
      email: 'blah@blah.com',
      password: '1234blah',
    };
    expect(signUpStart(mockUserCredentials)).toEqual({
      type: UserActionTypes.SIGN_UP_START,
      payload: mockUserCredentials,
    });
  });

  it('should create signUpSuccess action', () => {
    const mockUser = {
      name: 'Blah',
      email: 'blah@blah.com',
      password: '1234blah',
    };
    const mockAdditionalData = {
      additionalBlah : 'blah',
    }
    const mockPayload = {
      user: mockUser,
      additionalData: mockAdditionalData,
    }
    expect(signUpSuccess(mockPayload)).toEqual({
      type:UserActionTypes.SIGN_UP_SUCCESS,
      payload: mockPayload,
    });
  });

  it('should create signUpFailure action', () => {
    const mockFailure = 'error';
    expect(signUpFailure(mockFailure)).toEqual({
      type: UserActionTypes.SIGN_UP_FAILURE,
      payload: mockFailure,
    })
  });
});