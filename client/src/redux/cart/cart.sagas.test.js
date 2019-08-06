import { takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';
import { clearCartOnSignOut, onSignOutSuccess } from './cart.sagas';

describe('on signout success saga', () => {
  it('should trigger on SIGN_OUT_SUCCESS', () => {
    const generator = onSignOutSuccess();
    const generatorOneStep = generator.next().value;

    const sagaStep = takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);

   // console.log(generatorOneStep);
    // console.log(sagaStep);

    expect(generatorOneStep).toEqual(sagaStep);
  });
});

describe('clear cart on signout saga', () => {
  it('should fire clearCart', () => {
    const generator = clearCartOnSignOut();
    const generatorOneStep = generator.next().value;

    expect(generatorOneStep).toEqual(put(clearCart()));
  });
});