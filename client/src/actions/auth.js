import {START_REGISTER, START_AUTHENTICATING} from './types';

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
