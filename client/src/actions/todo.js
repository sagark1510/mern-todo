import * as types from './types';

export const fetchTodo = () => {
  return {
    type: types.FETCH_TODOS_START,
  };
};

export const saveTodo = todo => {
  return {
    type: types.TODO_SAVING_START,
    todo,
  };
};

export const deleteTodo = id => {
  return {
    type: types.TODO_DELETE_START,
    id,
  };
};
