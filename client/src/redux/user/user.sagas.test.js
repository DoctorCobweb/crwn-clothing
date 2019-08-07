import { takeLatest, put, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebase.utils.js';

import {
  getSnapshotFromUserAuth,
  signUp,
  signInAfterSignUp,
  signInWithGoogle,
  signInWithEmail,
  signOut,
  isUserAuthenticated,
  onGoogleSignInStart,
  onEmailSignInStart,
  onCheckUserSession,
  onSignOutStart,
  onSignUpStart,
  onSignUpSuccess,
} from './user.sagas';

describe('on signup success saga', () => {
  it('should trigger on SIGN_UP_SUCCESS', () => {
    const generator = onSignUpSuccess();
    const genOneStep = generator.next().value;
    console.log('genOneStep', genOneStep);
    expect(genOneStep).toEqual(
      takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
    );
  });
});

describe('on signup start saga', () => {
  it('should trigger SIGN_UP_START', () => {
    const generator = onSignUpStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_UP_START, signUp)
    );
  });
});

describe('on signn out start', () => {
  it('should trigger SIGN_OUT_START', () => {
    const generator = onSignOutStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
    );
  });
});

describe('on check user session', () => {
  it('should trigger CHECK_USER_SESSION', () => {
    const generator = onCheckUserSession();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
    );
  });
});

describe('on email sign in start', () => {
  it('should trigger EMAIL_SIGN_IN_START', () => {
    const generator = onEmailSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
    );
  });
});


describe('on google sign in start', () => {
  it('should trigger GOOGLE_SIGN_IN_START', () => {
    const generator = onGoogleSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
    );
  });
});

describe('on sign in after sign up', () => {
  it('should fire getSnapshotFromUserAuth', () => {
    const mockUser = { id: 0 };
    const mockAdditionalData = { extra: 'blah' };
    const mockAction = {
      payload: {
        user: mockUser,
        additionalData: mockAdditionalData,
      },
    };
    const generator = signInAfterSignUp(mockAction);
    // const mockGetSnapshotFromUserAuth = jest.fn();
    expect(generator.next().value).toEqual(
      getSnapshotFromUserAuth(mockUser, mockAdditionalData)
    );
  });
});

describe('on sign up saga', () => {
  const mockEmail = 'blah@blah.com';
  const mockPassword = '1234';
  const mockDisplayName = 'Blah';
  const mockAction = {
    payload: {
      email: mockEmail,
      password: mockPassword,
      displayName: mockDisplayName,
    },
  };
  const generator = signUp(mockAction);

  it('should call auth.createUserWithEmailAndPassword', () => {
    const mockCreateUserWithEmailAndPassword = jest.spyOn(
      auth,
      'createUserWithEmailAndPassword',
    );
    generator.next();
    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalled();
  });
});

describe('on sign out saga', () => {
  const generator = signOut();

  it('should call auth.signOut', () => {
    const mockAuthSignOut = jest.spyOn(auth, 'signOut');
    generator.next();
    expect(mockAuthSignOut).toHaveBeenCalled();
  });

  it('should call signOutSuccess', () => {
    expect(generator.next().value).toEqual(put(signOutSuccess()));
  });

  it('should call signOutFailure on error', () => {
    const newGenerator = signOut();
    newGenerator.next();
    expect(newGenerator.throw('error').value).toEqual(put(signOutFailure('error')));
  });
});

describe('isUserAuthenticated saga', () => {
  const generator = isUserAuthenticated();

  it('should call getCurrentUser func', () => {
    expect(generator.next().value).toEqual(getCurrentUser());
  });

  it('should call getSnapshotFromUserAuth if user exists', () => {
    const mockUserAuth = { uid: '1234' };
    expect(generator.next(mockUserAuth).value).toEqual(
      getSnapshotFromUserAuth(mockUserAuth)
    );
  });

  it('should call signInFailure on error', () => {
    const newGenerator = isUserAuthenticated();
    newGenerator.next();
    expect(newGenerator.throw('error').value).toEqual(put(signInFailure('error')));
  });
});

describe('get snapshot from userAuth', () => {
  it('should call createUserProfileDocument', () => {
    const mockUserAuth = { uid: '1234' };
    const mockAdditionalData = { somethingExtra: 'blah' };
    const generator = getSnapshotFromUserAuth(mockUserAuth, mockAdditionalData);
    expect(generator.next().value).toEqual(
      call(createUserProfileDocument, mockUserAuth, mockAdditionalData)
    );
  });
});