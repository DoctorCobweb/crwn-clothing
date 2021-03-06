import { takeLatest, put, all, call } from 'redux-saga/effects';

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
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  // making any API calls can fail so need to put try/catch blocks 
  // here also
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    console.log('getSnapshotFromUserAuth, user id and user data is:');
    console.log(userSnapshot.id);
    console.log(userSnapshot.data());
    yield put(signInSuccess({ id:userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signUp({ payload: { displayName, email, password }}) {
  try {

    // WHY CANT I DO THIS ie use call()???
    // console.log(displayName, email, password)
    // const blah = [email, password]
    // const { user } = yield call(auth.createUserWithEmailAndPassword, ...blah);
    //
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    console.log('signUp saga, user is: ');
    console.log(user);
    yield put(signUpSuccess({ user, additionalData: { displayName} }));
    // const userRef = yield createUserProfileDocument(user, { displayName });

    // DRE: commented this out because it gets called already by the onSignUpSuccess saga
    // which is listening to the SIGN_UP_SUCCESS action type that's sent by the yield statement
    // above.
    // yield getSnapshotFromUserAuth(user);


  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData }}) {
  console.log(' got called signInAfterSignUp');
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* signInWithGoogle() {
  // have to keep try/catch blocks here also becuase auth.sign.. 
  // may fail aswell
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password }}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure, error);
  }
}

export function *signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;

    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ])
}