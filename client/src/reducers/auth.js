import * as types from '../actions/types';
import isEmpty from '../utils/is-empty';

const INITIAL_STATE = {
  registering: false,
  registerError: null,
  loginError: null,
  authenticating: false,
  isAuthenticated: false,
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
    case types.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
      };
    default:
      return state;
  }
};
