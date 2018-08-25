import * as types from '../actions/types';

const INITIAL_STATE = {
  fetching: true,
  todos: [],
  saving: false,
};

export default (state = INITIAL_STATE, action) => {
  const {type} = action;
  switch (type) {
    case types.FETCH_TODOS_START:
      return {...state, fetching: true};
    case types.FETCH_TODOS_SUCCESS:
      return {...state, fetching: false, saving: false, todos: action.todos};
    case types.TODO_SAVING_START:
      return {...state, saving: true};
    default:
      return state;
  }
};
