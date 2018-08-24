import {all} from 'redux-saga/effects';
import {rootAuthSaga} from './auth';
/**
 * root saga
 */
export default function* rootSaga() {
  yield all([rootAuthSaga()]);
}
