import { createActions } from 'redux-actions';
import { LOGIN_ACTION_TYPE } from './LoginReducer';

export const {
  login,
  loginSuccess,
  loginError,
  register,
  registerSuccess,
  registerError,
} = createActions(
  LOGIN_ACTION_TYPE.LOG_IN,
  LOGIN_ACTION_TYPE.LOG_IN_SUCCESS,
  LOGIN_ACTION_TYPE.LOG_IN_ERROR,

  LOGIN_ACTION_TYPE.REGISTER,
  LOGIN_ACTION_TYPE.REGISTER_SUCCESS,
  LOGIN_ACTION_TYPE.REGISTER_ERROR,
);
