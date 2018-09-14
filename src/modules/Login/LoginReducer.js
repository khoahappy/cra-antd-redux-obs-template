import { handleActions } from 'redux-actions';

export const LOGIN_ACTION_TYPE = {
  LOG_IN: 'AUTH/LOG_IN',
  LOG_IN_SUCCESS: 'AUTH/LOG_IN_SUCCESS',
  LOG_IN_ERROR: 'AUTH/GLOG_IN_ERROR',

  REGISTER: 'AUTH/REGISTER',
  REGISTER_SUCCESS: 'AUTH/REGISTER_SUCCESS',
  REGISTER_ERROR: 'AUTH/REGISTER_ERROR',
};


const defaultState = {
  isFetching: false,
  isAuthenticated: false,
};

const reducer = handleActions(
  {
    [LOGIN_ACTION_TYPE.LOG_IN]: state => ({ ...state, isFetching: true }),
    [LOGIN_ACTION_TYPE.LOG_IN_SUCCESS]: state => (
      { ...state, isFetching: false, isAuthenticated: true }),
    [LOGIN_ACTION_TYPE.LOG_IN_ERROR]: (state, action) => (
      {
        ...state, isFetching: false, isAuthenticated: false, error: action.payload,
      }),
    [LOGIN_ACTION_TYPE.REGISTER]: state => ({ ...state, isFetching: true }),
    [LOGIN_ACTION_TYPE.REGISTER_SUCCESS]: state => (
      { ...state, isFetching: false, isAuthenticated: true }),
    [LOGIN_ACTION_TYPE.REGISTER_ERROR]: (state, action) => (
      {
        ...state, isFetching: false, isAuthenticated: false, error: action.payload,
      }),
  },
  defaultState,
);

export default reducer;
