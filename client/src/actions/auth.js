import {START_REGISTER, START_AUTHENTICATING, SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (user, history) => {
  return {
    type: START_REGISTER,
    user,
    history,
  };
};

export const loginUser = (user, history) => {
  return {
    type: START_AUTHENTICATING,
    user,
    history,
  };
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');

  // Remove auth header for future request
  setAuthToken(false);

  // Set the current user to {} which will set isAuthenticated to false
  return setCurrentUser({});
};
