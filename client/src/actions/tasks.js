import * as types from './types';

export const fetchTask = params => {
  return {
    type: types.FETCH_TASK_START,
    params,
  };
};

export const saveTask = task => {
  return {
    type: types.TASK_SAVING_START,
    task,
  };
};

export const deleteTask = task => {
  return {
    type: types.TASK_DELETE_START,
    task,
  };
};

export const markTask = task => {
  return {
    type: types.TASK_MARK_START,
    task,
  };
};
