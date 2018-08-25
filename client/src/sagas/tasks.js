import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import {fetchTask, saveTask, deleteTask, markTask} from '../api/tasks';

/**
 * Root todo saga
 */
export function* rootTaskSaga() {
  yield all([
    watchStartFetch(),
    watchStartSaving(),
    watchStartDeleing(),
    watchStartMarking(),
  ]);
}

/** ========== Watchers =============== */

/**
 * watch fetch method
 */
export function* watchStartFetch() {
  yield takeLatest(types.FETCH_TASK_START, doFetchTask);
}

/**
 * watch saving method
 */
export function* watchStartSaving() {
  yield takeLatest(types.TASK_SAVING_START, doSaveTask);
}

/**
 * watch delete method
 */
export function* watchStartDeleing() {
  yield takeLatest(types.TASK_DELETE_START, doDeleteTask);
}

/**
 * watch marking method
 */
export function* watchStartMarking() {
  yield takeLatest(types.TASK_MARK_START, doMarkTask);
}

/** =========== workers ============== */
/**
 * doFetchTask
 */
export function* doFetchTask({params}) {
  try {
    const tasks = yield call(fetchTask, params);

    yield put({type: types.FETCH_TASK_SUCCESS, tasks});
  } catch (e) {
    console.log(e);
  }
}

/**
 * doSaveTask
 */
export function* doSaveTask({task}) {
  try {
    const newTask = yield call(saveTask, task);
    const tasks = yield select(state => state.task.tasks);
    let list = [];
    if (task.id) {
      list = tasks.map(td => (td._id == task.id ? newTask : td));
    } else {
      list = [newTask, ...tasks];
    }
    yield put({type: types.FETCH_TASK_SUCCESS, tasks: list});
  } catch (e) {
    console.log(e);
  }
}

/**
 * delete
 */
export function* doDeleteTask({task}) {
  try {
    const result = yield call(deleteTask, task);
    const tasks = yield select(state => state.task.tasks);
    if (result.success) {
      yield put({
        type: types.FETCH_TASK_SUCCESS,
        tasks: tasks.filter(tk => tk._id != task.id),
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * delete
 */
export function* doMarkTask({task}) {
  try {
    const result = yield call(markTask, task);
    const tasks = yield select(state => state.task.tasks);
    yield put({
      type: types.FETCH_TASK_SUCCESS,
      tasks: tasks.map(td => (td._id == task.id ? result : td)),
    });
  } catch (e) {
    console.log(e);
  }
}
