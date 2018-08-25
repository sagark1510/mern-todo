import {all} from 'redux-saga/effects';
import {rootAuthSaga} from './auth';
import {rootTodoSaga} from './todo';
import {rootTaskSaga} from './tasks';
/**
 * root saga
 */
export default function* rootSaga() {
  yield all([rootAuthSaga(), rootTodoSaga(), rootTaskSaga()]);
}
