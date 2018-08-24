import {all, call, put, takeLatest} from 'redux-saga/effects';
import jwt_decode from 'jwt-decode';
import * as types from '../actions/types';
import {registerUser, loginUser} from '../api/auth';
import {setCurrentUser} from '../actions';
import setAuthToken from '../utils/setAuthToken';

/**
 * Root auth saga
 */
export function* rootAuthSaga() {
  yield all([watchStartRegister(), watchStartLogin()]);
}
/** ========== Watchers =============== */

/**
 * watch regiseter method
 */
export function* watchStartRegister() {
  yield takeLatest(types.START_REGISTER, register);
}

/**
 * watch regiseter method
 */
export function* watchStartLogin() {
  yield takeLatest(types.START_AUTHENTICATING, login);
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

/**
 * login user
 *
 * @param {object} params
 */
export function* login({user, history}) {
  try {
    const result = yield call(loginUser, user);
    if (!result.error) {
      const {token} = result;
      localStorage.setItem('jwtToken', token);

      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      yield put(setCurrentUser(decoded));
      yield put({type: types.AUTHENTICATION_SUCCESS});
      history.push('/dashboard');
    } else {
      yield put({type: types.GET_ERROR, payload: {error: result.error}});
    }
  } catch (e) {
    yield put({type: types.GET_ERROR, payload: {error: e.toString()}});
  }
}
