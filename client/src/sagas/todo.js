import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import {fetchTodo, saveTodo, deleteTodo} from '../api/todo';

/**
 * Root todo saga
 */
export function* rootTodoSaga() {
  yield all([watchStartFetch(), watchStartSaving(), watchStartDeleing()]);
}

/** ========== Watchers =============== */

/**
 * watch fetch method
 */
export function* watchStartFetch() {
  yield takeLatest(types.FETCH_TODOS_START, doFetchTodo);
}

/**
 * watch saving method
 */
export function* watchStartSaving() {
  yield takeLatest(types.TODO_SAVING_START, doSaveTodo);
}

/**
 * watch delete method
 */
export function* watchStartDeleing() {
  yield takeLatest(types.TODO_DELETE_START, doDeleteTodo);
}

/** =========== workers ============== */
/**
 * fetchTodos
 */
export function* doFetchTodo() {
  try {
    const todos = yield call(fetchTodo);

    yield put({type: types.FETCH_TODOS_SUCCESS, todos});
  } catch (e) {
    console.log(e);
  }
}

/**
 * fetchTodos
 */
export function* doSaveTodo({todo}) {
  try {
    const newTodo = yield call(saveTodo, todo);
    const todos = yield select(state => state.todo.todos);
    let list = [];
    if (todo.id) {
      list = todos.map(td => (td._id == todo.id ? newTodo : td));
    } else {
      list = [newTodo, ...todos];
    }
    yield put({type: types.FETCH_TODOS_SUCCESS, todos: list});
  } catch (e) {
    console.log(e);
  }
}

/**
 * delete
 */
export function* doDeleteTodo({id}) {
  try {
    const result = yield call(deleteTodo, id);
    const todos = yield select(state => state.todo.todos);
    if (result.success) {
      yield put({
        type: types.FETCH_TODOS_SUCCESS,
        todos: todos.filter(todo => todo._id != id),
      });
    }
  } catch (e) {
    console.log(e);
  }
}
