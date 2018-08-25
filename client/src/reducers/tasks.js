import * as types from '../actions/types';

const INITIAL_STATE = {
  fetching: true,
  tasks: [],
  saving: false,
};

export default (state = INITIAL_STATE, action) => {
  const {type} = action;
  switch (type) {
    case types.FETCH_TASK_START:
      return {...state, fetching: true};
    case types.FETCH_TASK_SUCCESS:
      return {...state, fetching: false, saving: false, tasks: action.tasks};
    case types.TODO_SAVING_START:
      return {...state, saving: true};
    default:
      return state;
  }
};
