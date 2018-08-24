import * as types from '../actions/types';

const INITIAL_STATE = {
  registering: false,
  registerError: null,
  loginError: null,
  authenticating: false,
};

export default (state = INITIAL_STATE, action) => {
  const {type} = action;
  switch (type) {
    case types.START_REGISTER:
      return {...state, registering: true};
    case types.REGISTER_SUCCESS:
      return {...state, registering: false, registerError: null};
    case types.GET_ERROR:
      return {
        ...state,
        registerError: state.registering && action.error,
        loginError: state.authenticating && action.error,
        registering: false,
        authenticating: false,
      };
    default:
      return state;
  }
};
