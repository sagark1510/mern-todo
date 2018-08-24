import {all, call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import {registerUser} from '../api/auth';

/**
 * Root auth saga
 */
export function* rootAuthSaga() {
  yield all([watchStartRegister()]);
}
/** ========== Watchers =============== */

/**
 * watch regiseter method
 */
export function* watchStartRegister() {
  yield takeLatest(types.START_REGISTER, register);
}

/** =========== workers ============== */

/**
 * register user
 *
 * @param {object} params
 */
export function* register({user}) {
  try {
    console.log(user);
    const result = yield call(registerUser, user);
    if (result.status) {
      yield put({type: types.REGISTER_SUCCESS});
      // params.history.push('/login');
    } else {
      yield put({type: types.GET_ERROR, payload: {error: result.message}});
    }
  } catch (e) {
    yield put({type: types.GET_ERROR, payload: {error: e.toString()}});
  }
}
