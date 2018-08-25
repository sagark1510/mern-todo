import {combineReducers} from 'redux';
import auth from './auth';
import todo from './todo';
import task from './tasks';

export default combineReducers({
  auth,
  todo,
  task,
});
